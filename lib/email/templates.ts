import { contactPage, contactReceipt, type ContactTopic } from "@/content/contact";
import { site } from "@/content/site";
import type { Lang } from "@/lib/lang";
import { href } from "@/lib/routes";
import { siteUrl } from "@/lib/seo";
import { wordmark_bordeaux, wordmark_white } from "./wordmark";

/**
 * Les e-mails du formulaire, aux couleurs de la charte. Mise en page en tableaux
 * et styles en ligne : c'est ce que Gmail, Outlook et Apple Mail lisent tous.
 * Le wordmark voyage en pièce jointe intégrée (cid), car Gmail n'affiche pas le SVG.
 */

const C = {
  bordeaux: "#59101c",
  ivoire: "#f8f4ef",
  beige: "#ccbba6",
  jaune: "#ffe432",
  noir: "#141414",
  gris: "#6b625a",
  ligne: "#e6ddd2",
};
const TITLE = "Impact, 'Anton', 'Arial Narrow Bold', 'Arial Narrow', sans-serif-condensed, sans-serif";
const SERIF = "Amiri, Georgia, 'Times New Roman', serif";
const TEXT = "'Helvetica Neue', Helvetica, Arial, sans-serif";

/** Hauteur affichée du wordmark : 280 × 54 (image servie en 840 px pour les écrans haute densité). */
const WORDMARK = { width: 280, height: 54 };

export type FormKind = ContactTopic | "donor";

export interface MailContent {
  subject: string;
  html: string;
  text: string;
  attachments: { filename: string; content: Buffer; cid: string; contentType: string }[];
}

function esc(value: string): string {
  return value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

/** Le texte saisi, échappé, avec ses retours à la ligne. */
function paragraphs(value: string): string {
  return esc(value).replace(/\r?\n/g, "<br>");
}

function firstName(name: string): string {
  return name.split(/\s+/)[0] || name;
}

function logo(color: "white" | "bordeaux") {
  return {
    filename: `the-encounter-${color}.png`,
    content: Buffer.from(color === "white" ? wordmark_white : wordmark_bordeaux, "base64"),
    cid: `wordmark-${color}@thencntr`,
    contentType: "image/png",
  };
}

/** Le squelette commun : fond ivoire, carte de 600 px, texte d'aperçu caché. */
function shell({ lang, preheader, body }: { lang: Lang; preheader: string; body: string }): string {
  return `<!doctype html>
<html lang="${lang}" xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="x-apple-disable-message-reformatting">
<meta name="color-scheme" content="light only">
<meta name="supported-color-schemes" content="light only">
<title>${esc(site.name)}</title>
<style>
  body { margin:0; padding:0; background:${C.ivoire}; }
  a { color:${C.bordeaux}; }
  @media (max-width: 620px) {
    .card { width:100% !important; }
    .pad { padding-left:24px !important; padding-right:24px !important; }
    .title { font-size:40px !important; line-height:42px !important; }
    .btn { display:block !important; width:100% !important; box-sizing:border-box; margin:0 0 10px 0 !important; text-align:center !important; }
    .col { display:block !important; width:100% !important; }
  }
</style>
</head>
<body style="margin:0;padding:0;background:${C.ivoire};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${esc(preheader)}&#8199;&#847;&#8199;&#847;&#8199;&#847;&#8199;&#847;&#8199;&#847;&#8199;&#847;</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${C.ivoire};">
<tr><td align="center" style="padding:32px 12px;">
<table role="presentation" class="card" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;background:#ffffff;border:1px solid ${C.ligne};">
${body}
</table>
</td></tr>
</table>
</body>
</html>`;
}

function button(label: string, url: string, tone: "jaune" | "bordeaux" | "clair"): string {
  const styles = {
    jaune: `background:${C.jaune};color:${C.noir};border:2px solid ${C.jaune};`,
    bordeaux: `background:${C.bordeaux};color:#ffffff;border:2px solid ${C.bordeaux};`,
    clair: `background:transparent;color:#ffffff;border:2px solid #ffffff;`,
  }[tone];
  return `<a class="btn" href="${esc(url)}" style="${styles}display:inline-block;margin:0 8px 10px 0;padding:13px 22px;border-radius:999px;font-family:${TEXT};font-size:14px;font-weight:700;letter-spacing:0.02em;text-decoration:none;">${esc(label)}</a>`;
}

/* ------------------------------------------------------------------ */
/* Ce que l'équipe reçoit                                               */
/* ------------------------------------------------------------------ */

interface Submission {
  kind: FormKind;
  lang: Lang;
  name: string;
  email: string;
  message: string;
  amount: string;
}

const teamTitle: Record<FormKind, string> = {
  question: "Nouvelle question",
  testimony: "Nouveau témoignage",
  partnership: "Proposition de partenariat",
  invitation: "Nouvelle invitation",
  press: "Demande presse",
  other: "Nouveau message",
  donor: "Nouveau don",
};

export function teamEmail(s: Submission): MailContent {
  const donor = s.kind === "donor";
  const topicLabel = s.kind === "donor" ? "Formulaire des donateurs" : contactPage.fr.topics[s.kind];
  const subject = donor ? `Don · ${s.name}` : `${topicLabel} · ${s.name}`;
  const date = new Intl.DateTimeFormat("fr-BE", { dateStyle: "full", timeStyle: "short", timeZone: "Europe/Brussels" }).format(new Date());
  const replySubject = `Re: ${contactReceipt[s.lang].subject[s.kind]}`;
  const reply = `mailto:${s.email}?subject=${encodeURIComponent(replySubject)}`;

  const rows: [string, string][] = [
    [donor ? "Donateur" : "Nom", esc(s.name)],
    ["E-mail", `<a href="mailto:${esc(s.email)}" style="color:${C.bordeaux};text-decoration:underline;">${esc(s.email)}</a>`],
    ...(donor ? [] : ([["Sujet", esc(topicLabel)]] as [string, string][])),
    ...(s.amount ? ([["Montant indiqué", esc(s.amount)]] as [string, string][]) : []),
    ["Langue du site", s.lang === "en" ? "Anglais : réponds en anglais" : "Français"],
    ["Reçu le", esc(date)],
  ];
  const table = rows
    .map(
      ([k, v], i) => `<tr>
<td class="col" width="150" valign="top" style="padding:12px 0;${i ? `border-top:1px solid ${C.ligne};` : ""}font-family:${TEXT};font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:${C.gris};">${k}</td>
<td class="col" valign="top" style="padding:12px 0;${i ? `border-top:1px solid ${C.ligne};` : ""}font-family:${TEXT};font-size:15px;line-height:22px;color:${C.noir};">${v}</td>
</tr>`,
    )
    .join("");

  const message = s.message
    ? `<p style="margin:0;font-family:${SERIF};font-size:19px;line-height:30px;color:${C.noir};">${paragraphs(s.message)}</p>`
    : `<p style="margin:0;font-family:${TEXT};font-size:15px;line-height:22px;color:${C.gris};font-style:italic;">Pas de message.</p>`;

  const body = `
<tr><td style="background:${C.bordeaux};padding:28px 40px 26px;" class="pad">
  <img src="cid:wordmark-white@thencntr" width="${WORDMARK.width}" height="${WORDMARK.height}" alt="The Encounter" style="display:block;width:${WORDMARK.width}px;height:auto;border:0;">
</td></tr>
<tr><td style="background:${C.bordeaux};padding:0 40px 36px;" class="pad">
  <span style="display:inline-block;background:${C.jaune};color:${C.noir};font-family:${TEXT};font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;padding:6px 12px;border-radius:999px;">${esc(topicLabel)}</span>
  <h1 class="title" style="margin:16px 0 0;font-family:${TITLE};font-weight:400;font-size:48px;line-height:50px;letter-spacing:0.01em;text-transform:uppercase;color:#ffffff;">${esc(teamTitle[s.kind])}</h1>
  <p style="margin:10px 0 0;font-family:${TEXT};font-size:15px;line-height:22px;color:${C.beige};">de ${esc(s.name)}, depuis le site.</p>
</td></tr>
<tr><td class="pad" style="padding:32px 40px 8px;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${table}</table>
</td></tr>
<tr><td class="pad" style="padding:24px 40px 8px;">
  <p style="margin:0 0 12px;font-family:${TEXT};font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:${C.gris};">${donor ? "Son mot pour l'équipe" : "Son message"}</p>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
    <td width="4" style="background:${C.bordeaux};font-size:0;line-height:0;">&nbsp;</td>
    <td style="background:${C.ivoire};padding:22px 24px;">${message}</td>
  </tr></table>
</td></tr>
<tr><td class="pad" style="padding:28px 40px 36px;">
  ${button(`Répondre à ${firstName(s.name)}`, reply, "bordeaux")}
  <p style="margin:8px 0 0;font-family:${TEXT};font-size:13px;line-height:20px;color:${C.gris};">« Répondre » dans ta messagerie écrit aussi directement à ${esc(s.email)}. Un accusé de réception lui a déjà été envoyé${s.lang === "en" ? " en anglais" : ""}.</p>
</td></tr>
<tr><td class="pad" style="padding:18px 40px;border-top:1px solid ${C.ligne};font-family:${TEXT};font-size:12px;line-height:18px;color:${C.gris};">
  Formulaire ${donor ? "Soutenir" : "Contact"} · <a href="${siteUrl}" style="color:${C.gris};">${esc(siteUrl.replace(/^https?:\/\//, ""))}</a>
</td></tr>`;

  const text = [
    `${teamTitle[s.kind]} · ${topicLabel}`,
    "",
    ...rows.map(([k, v]) => `${k} : ${v.replace(/<[^>]+>/g, "")}`),
    "",
    s.message || "(pas de message)",
  ].join("\n");

  return { subject, html: shell({ lang: "fr", preheader: `${s.name} : ${s.message.slice(0, 90) || topicLabel}`, body }), text, attachments: [logo("white")] };
}

/* ------------------------------------------------------------------ */
/* Le remerciement automatique                                          */
/* ------------------------------------------------------------------ */

export function receiptEmail({ kind, lang, name }: { kind: FormKind; lang: Lang; name: string }): MailContent {
  const t = contactReceipt[lang];
  const first = firstName(name);
  const subject = t.subject[kind];
  const lead = t.lead[kind];
  const secondary = kind === "question" ? button(t.faq, `${siteUrl}${href("faq", lang)}`, "clair") : "";

  const body = `
<tr><td align="center" style="padding:44px 40px 0;" class="pad">
  <img src="cid:wordmark-bordeaux@thencntr" width="${WORDMARK.width}" height="${WORDMARK.height}" alt="The Encounter" style="display:block;width:${WORDMARK.width}px;height:auto;border:0;margin:0 auto;">
</td></tr>
<tr><td align="center" style="padding:28px 40px 0;" class="pad">
  <table role="presentation" width="64" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-top:2px solid ${C.jaune};font-size:0;line-height:0;">&nbsp;</td></tr></table>
</td></tr>
<tr><td class="pad" style="padding:32px 48px 0;">
  <p style="margin:0;font-family:${TEXT};font-size:12px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:${C.bordeaux};">${esc(t.eyebrow[kind])}</p>
  <h1 class="title" style="margin:12px 0 0;font-family:${TITLE};font-weight:400;font-size:52px;line-height:54px;letter-spacing:0.01em;text-transform:uppercase;color:${C.noir};">${esc(t.title(first))}</h1>
  <p style="margin:22px 0 0;font-family:${SERIF};font-size:21px;line-height:32px;color:${C.noir};">${esc(lead)}</p>
  <p style="margin:18px 0 0;font-family:${TEXT};font-size:15px;line-height:24px;color:${C.gris};">${esc(t.next)}</p>
  <p style="margin:28px 0 0;font-family:${TEXT};font-size:15px;line-height:24px;color:${C.noir};">${esc(t.signature)}<br><strong style="color:${C.bordeaux};">${esc(t.team)}</strong></p>
</td></tr>
<tr><td class="pad" style="padding:40px 40px 0;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
    <td style="background:${C.bordeaux};padding:32px 32px 24px;">
      <p style="margin:0;font-family:${TEXT};font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:${C.jaune};">${esc(t.meanwhile)}</p>
      <p style="margin:10px 0 0;font-family:${TITLE};font-size:30px;line-height:34px;text-transform:uppercase;color:#ffffff;">${esc(site.podcast)}</p>
      <p style="margin:10px 0 20px;font-family:${SERIF};font-size:17px;line-height:26px;color:${C.beige};">${esc(t.meanwhileText)}</p>
      ${button(t.watch, site.links.youtube, "jaune")}${button(t.listen, site.links.spotify, "jaune")}${secondary}
    </td>
  </tr></table>
</td></tr>
<tr><td align="center" class="pad" style="padding:32px 40px 12px;font-family:${TEXT};font-size:13px;line-height:20px;">
  <a href="${site.links.instagram}" style="color:${C.bordeaux};font-weight:700;text-decoration:none;">Instagram</a>
  <span style="color:${C.beige};">&nbsp;·&nbsp;</span>
  <a href="${site.links.tiktok}" style="color:${C.bordeaux};font-weight:700;text-decoration:none;">TikTok</a>
  <span style="color:${C.beige};">&nbsp;·&nbsp;</span>
  <a href="${site.links.youtube}" style="color:${C.bordeaux};font-weight:700;text-decoration:none;">YouTube</a>
  <span style="color:${C.beige};">&nbsp;·&nbsp;</span>
  <a href="${site.links.spotify}" style="color:${C.bordeaux};font-weight:700;text-decoration:none;">Spotify</a>
</td></tr>
<tr><td align="center" class="pad" style="padding:0 40px 36px;font-family:${TEXT};font-size:12px;line-height:18px;color:${C.gris};">
  ${esc(t.footer)}<br><a href="${siteUrl}${href("home", lang)}" style="color:${C.gris};">${esc(siteUrl.replace(/^https?:\/\//, ""))}</a> · <a href="mailto:${site.email}" style="color:${C.gris};">${site.email}</a>
</td></tr>`;

  const text = [
    t.title(first),
    "",
    lead,
    "",
    t.next,
    "",
    t.signature,
    t.team,
    "",
    `${t.meanwhile} : ${site.podcast}`,
    `YouTube : ${site.links.youtube}`,
    `Spotify : ${site.links.spotify}`,
    "",
    `${siteUrl}${href("home", lang)}`,
  ].join("\n");

  return { subject, html: shell({ lang, preheader: lead, body }), text, attachments: [logo("bordeaux")] };
}
