"use client";

import Image from "next/image";
import Link from "next/link";
import { BrandMark } from "@/components/brand/BrandMark";
import { MotionRoot } from "@/components/motion/MotionRoot";
import { photos } from "@/content/media";
import { donorForm } from "@/content/contact";
import { supportPage } from "@/content/pages";
import { site } from "@/content/site";
import { useLang } from "@/lib/i18n";
import { href } from "@/lib/routes";
import { ContactForm } from "./ContactForm";
import { copy } from "./copy";
import { PageHead } from "./InfoPage";
import styles from "./site.module.css";

const whatPhotos = [photos.studioBts, photos.eventStage, photos.notes];

/** Soutenir : ce que le don rend possible, comment donner, le formulaire des donateurs, et d'autres façons d'aider. */
export function SupportPage() {
  const { lang } = useLang();
  const t = copy[lang];
  const s = supportPage[lang];
  const d = donorForm[lang];

  return (
    <MotionRoot>
      <main id="contenu" tabIndex={-1} className={styles.inner}>
        <PageHead title={t.pages.support.title} lead={t.pages.support.lead} />

        <section className={styles.sWhat} aria-labelledby="what-title">
          <h2 id="what-title" data-split="lines" key={`w-${lang}`}>
            {s.whatTitle}
          </h2>
          <div className={styles.vExpressionsGrid}>
            {s.what.map((w, i) => (
              <article key={w.name} className={styles.vExpression} data-reveal>
                <div className={styles.vExpressionImg}>
                  <Image src={whatPhotos[i].src} alt={whatPhotos[i].alt} fill sizes="(max-width: 900px) 100vw, 33vw" style={{ objectFit: "cover" }} />
                </div>
                <h3>{w.name}</h3>
                <p>{w.body}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Le don, sur l'aplat jaune de la charte. */}
        <section className={styles.sGive} aria-labelledby="give-title">
          <BrandMark size={64} color="#000" className={styles.supportMark} />
          <h2 id="give-title" data-split="lines" key={`g-${lang}`}>
            {s.howTitle}
          </h2>
          <p data-reveal>{s.how}</p>
          <p className={styles.sBeneficiary} data-reveal>
            {s.beneficiary}
          </p>
          <a className={styles.sGiveButton} href={site.links.support} target="_blank" rel="noopener" data-magnetic>
            {s.give}
          </a>
        </section>

        {/* Après le don : se faire connaître (Revolut ne transmet que le nom). */}
        <section className={styles.sDonor} aria-labelledby="donor-title">
          <div>
            <h2 id="donor-title" data-split="lines" key={`d-${lang}`}>
              {d.title}
            </h2>
            <p data-reveal>{d.lead}</p>
          </div>
          <div className={styles.formCard} data-reveal>
            <ContactForm variant="donor" />
          </div>
        </section>

        <section className={styles.sOther} aria-labelledby="other-title">
          <h2 id="other-title" data-split="lines" key={`o-${lang}`}>
            {s.otherTitle}
          </h2>
          <ul className={styles.sOtherList} data-stagger>
            {s.other.map((o) => (
              <li key={o.name}>
                <strong>{o.name}</strong>
                <span>{o.body}</span>
              </li>
            ))}
          </ul>
          <Link className={styles.chevron} href={href("collaborate", lang)}>
            {s.tellStory} <span aria-hidden>›</span>
          </Link>
        </section>
      </main>
    </MotionRoot>
  );
}
