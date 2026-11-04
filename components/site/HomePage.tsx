"use client";

import Image from "next/image";
import Link from "next/link";
import { BrandMark } from "@/components/brand/BrandMark";
import { MotionRoot } from "@/components/motion/MotionRoot";
import { journeys } from "@/content/journeys";
import { clips, photos } from "@/content/media";
import { site } from "@/content/site";
import { episodeIn, journeyIn } from "@/content/translations";
import type { Episode } from "@/content/types";
import { useLang } from "@/lib/i18n";
import { href } from "@/lib/routes";
import { copy } from "./copy";
import { EncounterHero } from "./EncounterHero";
import { Intro, INTRO_SECONDS } from "./Intro";
import { JourneyTile } from "./JourneyTile";
import { Tilt } from "./Tilt";
import { Playlist } from "./Playlist";
import { Stories } from "./Stories";
import { StoryPin } from "./StoryPin";
import styles from "./site.module.css";

interface HomePageProps {
  episodes: Episode[];
}

/** Le plateau du Studio (hero de la maquette 1) : un plan large pour l'écran, un plan en hauteur pour le téléphone. */
const heroPhotos = [
  { wide: photos.studioDuo, tall: photos.jenniferLaugh },
  { wide: photos.studioDuo2, tall: photos.studioEp7 },
  { wide: photos.studioEp7, tall: photos.jenniferEp2Lamp },
];

/**
 * L'accueil — direction « Clair-obscur » : le noir et la lumière du buisson, mis en
 * scène comme une page produit (récit épinglé, cartes) et écoutés comme sur une
 * application de streaming (stories, playlist, barre de lecture).
 */
export function HomePage({ episodes: source }: HomePageProps) {
  const { lang } = useLang();
  const t = copy[lang];
  const episodes = source.map((e) => episodeIn(e, lang));
  const localJourneys = journeys.map((j) => journeyIn(j, lang));

  return (
    <>
      <Intro />
      <MotionRoot loadDelay={INTRO_SECONDS}>
        <EncounterHero photos={heroPhotos} t={t} />

        <main id="contenu" tabIndex={-1}>
          <section className={styles.statement} aria-labelledby="statement-title">
            <h2 id="statement-title" className="visually-hidden">
              {t.statementTitle}
            </h2>
            <p key={lang} className={styles.statementText} data-scrub-words>
              {t.statement}
            </p>
          </section>

          <Stories episodes={episodes} t={t} />

          <Playlist episodes={episodes} t={t} />

          <StoryPin clip={clips.louange} title={t.storyTitle} beats={t.beats} />

          <section id="vision" className={styles.bento} aria-labelledby="bento-title">
            <h2 id="bento-title" className="visually-hidden">
              The Encounter
            </h2>

            {/* L'article porte l'apparition au défilement ; la carte à l'intérieur porte l'inclinaison. */}
            <Tilt className={styles.bentoGrid}>
              <article className={`${styles.tile} ${styles.tileFounder}`} data-reveal>
                <div className={styles.tileCard} data-tilt>
                  <div className={styles.tileZoom}>
                    <Image src={photos.founderBlack.src} alt={photos.founderBlack.alt} fill sizes="(max-width: 760px) 100vw, 42vw" style={{ objectFit: "cover", objectPosition: "50% 20%" }} />
                  </div>
                  <div className={styles.tileContent}>
                    <BrandMark size={40} color="var(--brand-jaune)" />
                    <p className={styles.tileQuote}>{t.quote(t.founderQuote)}</p>
                    <p className={styles.tileName}>
                      <strong>{site.founder}</strong> {t.founderRole}
                    </p>
                  </div>
                </div>
              </article>

              <article className={`${styles.tile} ${styles.tileHero}`} data-reveal>
                <div className={styles.tileCard} data-tilt>
                  <div className={styles.tileZoom}>
                    <Image src={photos.studioWide.src} alt={photos.studioWide.alt} fill sizes="(max-width: 760px) 100vw, 58vw" style={{ objectFit: "cover", objectPosition: "50% 45%" }} />
                  </div>
                  <div className={styles.tileContent}>
                    <p className={styles.tileBig}>
                      {t.bentoBig[0]}
                      <br />
                      <span>{t.bentoBig[1]}</span>
                    </p>
                    <p>{t.bentoText}</p>
                  </div>
                </div>
              </article>

              <article className={`${styles.tile} ${styles.tileJourney}`} data-reveal>
                <div className={styles.tileCard} data-tilt>
                  <JourneyTile journeys={localJourneys} episodes={episodes} t={t} />
                </div>
              </article>

              <article className={`${styles.tile} ${styles.tileEvent}`} data-reveal>
                <div className={styles.tileCard} data-tilt>
                  <div className={styles.tileZoom}>
                    <Image src={photos.eventCrowd.src} alt={photos.eventCrowd.alt} fill sizes="(max-width: 760px) 100vw, 25vw" style={{ objectFit: "cover" }} />
                  </div>
                  <div className={styles.tileContent}>
                    <p className={styles.tileDate}>
                      27.09
                      <span>2025</span>
                    </p>
                    <p>{t.eventText}</p>
                  </div>
                </div>
              </article>
            </Tilt>
          </section>

          <section id="soutenir" className={styles.support} aria-labelledby="support-title">
            <BrandMark size={72} color="var(--warm)" className={styles.supportMark} />
            <h2 id="support-title" data-split="lines" key={`s-${lang}`}>
              {t.supportTitle}
            </h2>
            <p data-reveal>{t.supportText}</p>
            <div className={styles.heroLinks} data-reveal>
              <a className={styles.pill} href={site.links.support} target="_blank" rel="noopener" data-magnetic>
                {t.give}
              </a>
              <Link className={styles.chevron} href={href("contact", lang)}>
                {t.ask} <span aria-hidden>›</span>
              </Link>
              <Link className={styles.chevron} href={href("collaborate", lang)}>
                {t.collaborate} <span aria-hidden>›</span>
              </Link>
            </div>
          </section>
        </main>

      </MotionRoot>
    </>
  );
}
