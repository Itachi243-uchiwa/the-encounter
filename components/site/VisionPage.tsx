"use client";

import Image from "next/image";
import Link from "next/link";
import { BrandMark } from "@/components/brand/BrandMark";
import { MotionRoot } from "@/components/motion/MotionRoot";
import { photos } from "@/content/media";
import { visionPage } from "@/content/pages";
import { site } from "@/content/site";
import { useLang } from "@/lib/i18n";
import { href } from "@/lib/routes";
import { copy } from "./copy";
import styles from "./site.module.css";

const expressionPhotos = [photos.eventWorship, photos.studioDuo2, photos.notes];

/** Notre vision : le texte de la fondatrice, du buisson ardent jusqu'à « Notre cœur ». */
export function VisionPage() {
  const { lang } = useLang();
  const t = copy[lang];
  const v = visionPage[lang];

  return (
    <MotionRoot>
      <main id="contenu" tabIndex={-1} className={styles.inner}>
        {/* Ouverture : la fondatrice d'abord, la vision à côté d'elle. */}
        <header className={styles.vHero}>
          <figure className={styles.vHeroImg} data-clip>
            <Image src={photos.founderBlack.src} alt={photos.founderBlack.alt} fill priority sizes="(max-width: 900px) 100vw, 46vw" style={{ objectFit: "cover", objectPosition: "50% 22%" }} />
          </figure>
          <div className={styles.vHeroText}>
            <p className={styles.vKicker} data-reveal>
              {v.kicker}
            </p>
            <h1 key={lang} data-split="lines" data-split-load>
              {t.pages.vision.title}
            </h1>
            <p className={styles.vHeroLead} data-reveal>
              {t.pages.vision.lead}
            </p>
            <p className={styles.vSignature} data-reveal>
              <BrandMark size={34} color="var(--accent)" />
              <span>
                <strong>{site.founder}</strong>
                {v.founderRole}
              </span>
            </p>
          </div>
        </header>

        {/* Le buisson ardent : le verset posé sur la louange, puis le sens. */}
        <section className={styles.vBush} aria-labelledby="bush-title">
          <figure className={styles.vBushImg} data-clip>
            <Image src={photos.eventWorship.src} alt={photos.eventWorship.alt} fill sizes="(max-width: 1240px) 100vw, 1240px" style={{ objectFit: "cover", objectPosition: "50% 30%" }} />
            <blockquote className={styles.vBushVerse}>
              <p>{t.quote(v.bushVerse)}</p>
              <cite>{v.bushRef}</cite>
            </blockquote>
          </figure>
          <div className={styles.vBushText}>
            <h2 id="bush-title" data-split="lines" key={`b-${lang}`}>
              {v.bushTitle}
            </h2>
            <p data-reveal>{v.bushText}</p>
          </div>
        </section>

        {/* Pagash et metamorphōsis, comme deux entrées de dictionnaire, avec le mot dans sa langue. */}
        <section className={styles.vWords} aria-labelledby="words-title">
          <h2 id="words-title" data-split="lines" key={`w-${lang}`}>
            {v.wordsTitle}
          </h2>
          <div className={styles.vWordsGrid}>
            {v.words.map((w) => (
              <article key={w.word} className={styles.vWord} data-reveal>
                <p className={styles.vWordScript} lang={w.scriptLang} aria-hidden>
                  {w.script}
                </p>
                <p className={styles.vWordTerm} lang={w.lang}>
                  {w.word}
                </p>
                <p className={styles.vWordOrigin}>{w.origin}</p>
                <p className={styles.vWordMeaning}>{w.meaning}</p>
                <p>{w.text}</p>
              </article>
            ))}
          </div>
        </section>

        {/* La mission, et le verset qui la porte. */}
        <section className={styles.vMission} aria-labelledby="mission-title">
          <div>
            <h2 id="mission-title" data-split="lines" key={`m-${lang}`}>
              {v.missionTitle}
            </h2>
            <p data-reveal>{v.missionLead}</p>
            <ol className={styles.vMissionList} data-stagger>
              {v.mission.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </div>
          <blockquote className={styles.vMissionVerse} data-reveal>
            <p>{t.quote(v.missionVerse)}</p>
            <cite>{v.missionRef}</cite>
          </blockquote>
        </section>

        {/* Les trois piliers : un chemin, de la présence à la destinée. */}
        <section className={styles.vPillars} aria-labelledby="pillars-title">
          <h2 id="pillars-title" data-split="lines" key={`p-${lang}`}>
            {v.pillarsTitle}
          </h2>
          <ol className={styles.vPillarsGrid} data-stagger>
            {v.pillars.map((p, i) => (
              <li key={p.name} className={styles.vPillar}>
                <span className={styles.vPillarNum} aria-hidden>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3>{p.name}</h3>
                <p className={styles.vPillarLine}>{p.line}</p>
                <p>{p.body}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Les trois expressions, chacune avec son image. */}
        <section className={styles.vExpressions} aria-labelledby="expr-title">
          <h2 id="expr-title" data-split="lines" key={`e-${lang}`}>
            {v.expressionsTitle}
          </h2>
          <div className={styles.vExpressionsGrid}>
            {v.expressions.map((x, i) => (
              <article key={x.name} className={styles.vExpression} data-reveal>
                <div className={styles.vExpressionImg}>
                  <Image src={expressionPhotos[i].src} alt={expressionPhotos[i].alt} fill sizes="(max-width: 900px) 100vw, 33vw" style={{ objectFit: "cover" }} />
                </div>
                <p className={styles.vExpressionKind}>{x.kind}</p>
                <h3>{x.name}</h3>
                <p>{x.body}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Notre cœur : la conclusion de la fondatrice, dans la lueur du buisson. */}
        <section className={styles.vHeart} aria-labelledby="heart-title">
          <BrandMark size={64} color="var(--accent)" className={styles.vHeartMark} />
          <h2 id="heart-title" data-split="lines" key={`h-${lang}`}>
            {v.heartTitle}
          </h2>
          <p data-reveal>{v.heart}</p>
          <blockquote data-reveal>
            <p>{t.quote(v.heartQuote)}</p>
            <cite>
              {site.founder}, {v.founderRole}
            </cite>
          </blockquote>
          <div className={styles.heroLinks} data-reveal>
            <Link className={styles.pill} href={href("podcast", lang)} data-magnetic>
              {v.listen}
            </Link>
            <Link className={styles.chevron} href={href("support", lang)}>
              {v.support} <span aria-hidden>›</span>
            </Link>
          </div>
        </section>
      </main>
    </MotionRoot>
  );
}
