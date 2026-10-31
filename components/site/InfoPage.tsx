"use client";

import Link from "next/link";
import { Fragment, type ReactNode } from "react";
import { MotionRoot } from "@/components/motion/MotionRoot";
import { contactPage, faqPage, infoAside } from "@/content/contact";
import { legalPages, type LegalRoute } from "@/content/legal";
import { site } from "@/content/site";
import { useLang } from "@/lib/i18n";
import { href } from "@/lib/routes";
import { ContactForm } from "./ContactForm";
import { ManageCookies } from "./CookieBanner";
import { copy } from "./copy";
import styles from "./site.module.css";

/** L'en-tête des pages intérieures : le titre en grand, centré dans la lueur du buisson, une phrase, éventuellement un bouton. */
export function PageHead({ title, lead, action }: { title: string; lead: string; action?: ReactNode }) {
  const { lang } = useLang();
  return (
    <header className={styles.pageHead}>
      <h1 key={lang} data-split="lines" data-split-load>
        {title}
      </h1>
      <p data-reveal>{lead}</p>
      {action ? <div data-reveal>{action}</div> : null}
    </header>
  );
}

type InfoRoute = "contact" | "faq" | LegalRoute;

/** Gabarit des pages Contact, FAQ et légales : un titre, une phrase, puis le contenu. */
export function InfoPage({ route }: { route: InfoRoute }) {
  const { lang } = useLang();
  const page = copy[lang].pages[route];

  return (
    <MotionRoot>
      <main id="contenu" tabIndex={-1} className={styles.inner}>
        <PageHead title={page.title} lead={page.lead} />
        {route === "contact" ? <Contact /> : route === "faq" ? <Faq /> : <Legal route={route} />}
      </main>
    </MotionRoot>
  );
}

function Contact() {
  const { lang } = useLang();
  const t = contactPage[lang];
  return (
    <div className={styles.contactGrid}>
      <div className={styles.formCard} data-reveal>
        <ContactForm />
      </div>
      <aside className={styles.contactAside} data-stagger>
        <div className={styles.asideCard}>
          <h2>{t.directTitle}</h2>
          <a className={styles.asideMail} href={`mailto:${site.email}`}>
            {site.email}
          </a>
        </div>
        <div className={styles.asideCard}>
          <h2>{t.faqTitle}</h2>
          <Link className={styles.chevron} href={href("faq", lang)}>
            {t.faqLink} <span aria-hidden>›</span>
          </Link>
        </div>
      </aside>
    </div>
  );
}

function Faq() {
  const { lang } = useLang();
  const a = infoAside[lang];
  return (
    <div className={styles.faqLayout}>
      <div className={styles.faq} data-stagger>
        {faqPage[lang].map((item) => (
          <details key={item.q} name="faq">
            <summary>{item.q}</summary>
            <p>{item.a}</p>
          </details>
        ))}
      </div>
      <aside className={styles.faqAside} data-reveal>
        <h2>{a.faqTitle}</h2>
        <p>{a.faqText}</p>
        <Link className={styles.pill} href={`${href("contact", lang)}?sujet=question`}>
          {copy[lang].ask}
        </Link>
      </aside>
    </div>
  );
}

/** Les informations encore attendues de la cliente, « [à compléter …] », ressortent en surligné. */
function withPending(text: string, label: string): ReactNode {
  return text.split(/(\[[^\]]+\])/).map((part, i) =>
    part.startsWith("[") ? (
      <mark key={i} className={styles.pending} title={label}>
        {part.slice(1, -1)}
      </mark>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}

function Legal({ route }: { route: LegalRoute }) {
  const { lang } = useLang();
  const doc = legalPages[route][lang];
  const a = infoAside[lang];
  const id = (i: number) => `section-${i + 1}`;

  return (
    <div className={styles.legalLayout}>
      <nav className={styles.legalToc} aria-label={a.toc}>
        <p>{a.toc}</p>
        <ol>
          {doc.sections.map((section, i) => (
            <li key={section.title}>
              <a href={`#${id(i)}`}>{section.title}</a>
            </li>
          ))}
        </ol>
      </nav>
      <div className={styles.legal}>
        <p className={styles.legalUpdated}>{doc.updated}</p>
        {doc.sections.map((section, i) => (
          <section key={section.title} id={id(i)} data-reveal>
            <h2>
              <span aria-hidden>{String(i + 1).padStart(2, "0")}</span>
              {section.title}
            </h2>
            {section.paragraphs.map((p) => (
              <p key={p}>{withPending(p, a.pending)}</p>
            ))}
            {section.list ? (
              <ul>
                {section.list.map((li) => (
                  <li key={li}>{withPending(li, a.pending)}</li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}
        {route === "cookies" ? <ManageCookies className={styles.pill} /> : null}
      </div>
    </div>
  );
}
