"use server";

import { headers } from "next/headers";
import nodemailer, { type SendMailOptions, type Transporter } from "nodemailer";
import { isContactTopic } from "@/content/contact";
import { site } from "@/content/site";
import { receiptEmail, teamEmail, type FormKind } from "./email/templates";
import { isLang, type Lang } from "./lang";

/** Le résultat rendu au formulaire : les champs en erreur, ou l'état de l'envoi. */
export interface ContactState {
  status: "idle" | "invalid" | "sent" | "rate" | "error";
  fields?: Partial<Record<"name" | "email" | "message" | "consent", true>>;
  /** Ce qui a été saisi, pour remplir à nouveau le formulaire (React le vide après chaque envoi). */
  values?: Partial<Record<"topic" | "name" | "email" | "message" | "amount", string>>;
}

const MAX_MESSAGE = 5000;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 3;

/**
 * Limite par adresse IP, en mémoire : 3 messages par 10 minutes. Sur Vercel la
 * mémoire n'est pas partagée entre instances : c'est un frein contre les rafales,
 * pas un compteur exact (le champ piège arrête déjà les robots simples).
 */
const recent = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const hits = (recent.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (hits.length >= MAX_PER_WINDOW) return true;
  hits.push(now);
  recent.set(ip, hits);
  if (recent.size > 5000) recent.clear();
  return false;
}

function text(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

/**
 * Envoi par le SMTP de Google Workspace (la boîte du domaine, gérée via Squarespace).
 * SMTP_USER : l'adresse de la boîte ; SMTP_PASS : un mot de passe d'application Google.
 */
let transport: Transporter | undefined;

async function sendEmail(mail: SendMailOptions): Promise<boolean> {
  transport ??= nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
  try {
    await transport.sendMail(mail);
    return true;
  } catch (err) {
    console.error("[contact] SMTP", err);
    return false;
  }
}

/**
 * Formulaire de contact et formulaire des donateurs. Variables d'environnement :
 * SMTP_USER, SMTP_PASS (mot de passe d'application Google Workspace),
 * CONTACT_TO (boîte de l'équipe, sinon l'adresse du site).
 */
export async function sendContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  // Champ piège invisible : un humain le laisse vide. On répond « envoyé » pour ne rien apprendre au robot.
  if (text(formData, "website")) return { status: "sent" };

  const rawLang = text(formData, "lang");
  const lang: Lang = isLang(rawLang) ? rawLang : "fr";
  const kind = text(formData, "kind") === "donor" ? "donor" : "contact";
  const topic = text(formData, "topic");
  const name = text(formData, "name").slice(0, 120);
  const email = text(formData, "email").slice(0, 200);
  const message = text(formData, "message");
  const amount = text(formData, "amount").slice(0, 40);

  const values = { topic, name, email, message, amount };
  const fields: ContactState["fields"] = {};
  if (!name) fields.name = true;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) fields.email = true;
  if ((kind === "contact" && !message) || message.length > MAX_MESSAGE) fields.message = true;
  if (formData.get("consent") !== "on") fields.consent = true;
  if (Object.keys(fields).length) return { status: "invalid", fields, values };

  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (rateLimited(ip)) return { status: "rate", values };

  const formKind: FormKind = kind === "donor" ? "donor" : isContactTopic(topic) ? topic : "other";
  const team = teamEmail({ kind: formKind, lang, name, email, message, amount });

  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    // En local, sans identifiants : le message s'affiche dans le terminal au lieu de partir.
    if (process.env.NODE_ENV !== "production") {
      console.info(`[contact] ${team.subject}\n${team.text}`);
      return { status: "sent" };
    }
    console.error("[contact] SMTP_USER ou SMTP_PASS manquant");
    return { status: "error", values };
  }

  // Google n'accepte comme expéditeur que la boîte connectée (ou ses alias).
  const from = { name: site.name, address: process.env.SMTP_USER };
  const sent = await sendEmail({ from, to: process.env.CONTACT_TO ?? site.email, replyTo: { name, address: email }, ...team });
  if (!sent) return { status: "error", values };

  // Accusé de réception : texte fixe adapté au formulaire, jamais le message reçu (le formulaire ne peut pas servir de relais).
  await sendEmail({ from, to: { name, address: email }, ...receiptEmail({ kind: formKind, lang, name }) });

  return { status: "sent" };
}
