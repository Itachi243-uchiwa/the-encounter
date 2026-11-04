"use client";

import Link from "next/link";
import { useActionState, useEffect, useRef, useState } from "react";
import { contactPage, contactTopics, donorForm, isContactTopic } from "@/content/contact";
import { site } from "@/content/site";
import { sendContact, type ContactState } from "@/lib/contact";
import { useLang } from "@/lib/i18n";
import { href } from "@/lib/routes";
import styles from "./site.module.css";

type Variant = "contact" | "donor";

/** Le formulaire repart à zéro après un envoi : « Écrire un autre message » le remonte avec une nouvelle clé. */
export function ContactForm({ variant = "contact" }: { variant?: Variant }) {
  const [round, setRound] = useState(0);
  return <Form key={round} variant={variant} onReset={() => setRound((r) => r + 1)} />;
}

const initial: ContactState = { status: "idle" };

function Form({ variant, onReset }: { variant: Variant; onReset: () => void }) {
  const { lang } = useLang();
  const t = contactPage[lang];
  const d = donorForm[lang];
  const donor = variant === "donor";
  const [state, action, pending] = useActionState(sendContact, initial);
  const topicRef = useRef<HTMLSelectElement>(null);

  // ?sujet=testimony (lien depuis Collaborer, FAQ…) : le sujet est déjà choisi.
  useEffect(() => {
    const topic = new URLSearchParams(window.location.search).get("sujet");
    if (topicRef.current && isContactTopic(topic)) topicRef.current.value = topic;
  }, []);

  if (state.status === "sent") {
    return (
      <div className={styles.formDone} role="status">
        <p>{donor ? d.sent : t.sent}</p>
        <button type="button" className={styles.followPill} onClick={onReset}>
          {t.sendAnother}
        </button>
      </div>
    );
  }

  const invalid = state.fields ?? {};
  const v = state.values ?? {};
  const error = (field: keyof typeof invalid, id: string) =>
    invalid[field] ? (
      <span id={id} className={styles.fieldError}>
        {t.errors[field]}
      </span>
    ) : null;

  return (
    <form className={styles.form} action={action}>
      <input type="hidden" name="lang" value={lang} />
      <input type="hidden" name="kind" value={variant} />
      {/* Piège à robots : invisible et hors du parcours clavier. */}
      <div className={styles.trap} aria-hidden>
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {donor ? null : (
        <label className={styles.field}>
          <span>{t.topicLabel}</span>
          <select key={v.topic} ref={topicRef} name="topic" defaultValue={v.topic || "question"}>
            {contactTopics.map((topic) => (
              <option key={topic} value={topic}>
                {t.topics[topic]}
              </option>
            ))}
          </select>
        </label>
      )}

      <div className={styles.fieldRow}>
        <label className={styles.field}>
          <span>{t.name}</span>
          <input name="name" defaultValue={v.name} autoComplete="name" required maxLength={120} aria-invalid={invalid.name} aria-describedby={invalid.name ? "err-name" : undefined} />
          {error("name", "err-name")}
        </label>
        <label className={styles.field}>
          <span>{t.email}</span>
          <input
            name="email"
            type="email"
            defaultValue={v.email}
            autoComplete="email"
            required
            maxLength={200}
            aria-invalid={invalid.email}
            aria-describedby={invalid.email ? "err-email" : undefined}
          />
          {error("email", "err-email")}
        </label>
      </div>

      {donor ? (
        <label className={styles.field}>
          <span>{d.amount}</span>
          <input name="amount" defaultValue={v.amount} inputMode="decimal" maxLength={40} />
        </label>
      ) : null}

      <label className={styles.field}>
        <span>{donor ? d.message : t.message}</span>
        <textarea
          name="message"
          defaultValue={v.message}
          rows={donor ? 4 : 7}
          required={!donor}
          maxLength={5000}
          aria-invalid={invalid.message}
          aria-describedby={invalid.message ? "err-message" : donor ? undefined : "hint-message"}
        />
        {donor ? null : (
          <small id="hint-message" className={styles.fieldHint}>
            {t.messageHint}
          </small>
        )}
        {error("message", "err-message")}
      </label>

      <label className={styles.check}>
        <input type="checkbox" name="consent" required aria-invalid={invalid.consent} aria-describedby={invalid.consent ? "err-consent" : undefined} />
        <span>
          {t.consent} <Link href={href("privacy", lang)}>{t.privacyLink}</Link>
        </span>
      </label>
      {error("consent", "err-consent")}

      {state.status === "rate" || state.status === "error" ? (
        <p className={styles.formError} role="alert">
          {state.status === "rate" ? t.errors.rate : t.errors.send}{" "}
          {state.status === "error" ? <a href={`mailto:${site.email}`}>{site.email}</a> : null}
        </p>
      ) : null}

      <button type="submit" className={styles.pill} disabled={pending}>
        {pending ? t.sending : donor ? d.send : t.send}
      </button>
    </form>
  );
}
