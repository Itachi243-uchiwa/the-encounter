"use server";

import { headers } from "next/headers";
import { contactPage, contactReceipt, isContactTopic } from "@/content/contact";
import { site } from "@/content/site";
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

async function sendEmail(payload: Record<string, unknown>): Promise<boolean> {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) console.error("Resend", res.status, await res.text());
  return res.ok;
}

/**
 * Formulaire de contact et formulaire des donateurs. Variables d'environnement :
 * RESEND_API_KEY, CONTACT_FROM (adresse d'un domaine vérifié chez Resend),
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

  const subject =
    kind === "donor"
      ? `Don · ${name}`
      : `${contactPage.fr.topics[isContactTopic(topic) ? topic : "other"]} · ${name}`;
  const body = [
    `${kind === "donor" ? "Donateur" : "Nom"} : ${name}`,
    `E-mail : ${email}`,
    amount ? `Montant indiqué : ${amount}` : null,
    `Langue du site : ${lang.toUpperCase()}`,
    "",
    message || "(pas de message)",
  ]
    .filter((line) => line !== null)
    .join("\n");

  if (!process.env.RESEND_API_KEY) {
    // En local, sans clé : le message s'affiche dans le terminal au lieu de partir.
    if (process.env.NODE_ENV !== "production") {
      console.info(`[contact] ${subject}\n${body}`);
      return { status: "sent" };
    }
    console.error("[contact] RESEND_API_KEY manquante");
    return { status: "error", values };
  }

  const from = process.env.CONTACT_FROM ?? `The Encounter <${site.email}>`;
  const sent = await sendEmail({ from, to: process.env.CONTACT_TO ?? site.email, reply_to: email, subject, text: body });
  if (!sent) return { status: "error", values };

  // Accusé de réception : texte fixe, jamais le message reçu (le formulaire ne peut pas servir de relais).
  const receipt = contactReceipt[lang];
  await sendEmail({ from, to: email, subject: receipt.subject, text: receipt.body(name) });

  return { status: "sent" };
}
