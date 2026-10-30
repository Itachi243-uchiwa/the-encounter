"use client";

import Image from "next/image";
import { BrandMark } from "@/components/brand/BrandMark";
import { MotionRoot } from "@/components/motion/MotionRoot";
import { journeys } from "@/content/journeys";
import { clips, photos } from "@/content/media";
import { askQuestionHref, platforms, site } from "@/content/site";
import { episodeIn, journeyIn } from "@/content/translations";
import type { Episode, NavItem } from "@/content/types";
import { LangProvider, useLang } from "@/lib/i18n";
import { copy } from "./copy";
import { EncounterHero } from "./EncounterHero";
import { Intro, INTRO_SECONDS } from "./Intro";
import { JourneyTile } from "./JourneyTile";
import { Tilt } from "./Tilt";
import { PlayerProvider } from "./Player";
import { Playlist } from "./Playlist";
import { Stories } from "./Stories";
import { StoryPin } from "./StoryPin";
import styles from "./clair-obscur.module.css";

interface ClairObscurHomeProps {
  episodes: Episode[];
  nav: NavItem[];
}

/** Le plateau du Studio (hero de la maquette 1) : un plan large pour l'écran, un plan en hauteur pour le téléphone. */
const heroPhotos = [
  { wide: photos.studioDuo, tall: photos.jenniferLaugh },
  { wide: photos.studioDuo2, tall: photos.studioEp7 },
  { wide: photos.studioEp7, tall: photos.jenniferEp2Lamp },
];

/**
 * Direction 2 — « Clair-obscur » : le noir et la lumière du buisson, mis en scène
 * comme une page produit (récit épinglé, grille de tuiles) et écoutés comme sur
 * une application de streaming (playlist, étagères, barre de lecture).
 * Bilingue : le changement de langue est instantané.
 */
export function ClairObscurHome(props: ClairObscurHomeProps) {
  return (
    <LangProvider>
      <Home {...props} />
    </LangProvider>
  );
}

function Home({ episodes: source, nav: navItems }: ClairObscurHomeProps) {
  const { lang } = useLang();
  const t = copy[lang];
  const episodes = source.map((e) => episodeIn(e, lang));
  const localJourneys = journeys.map((j) => journeyIn(j, lang));
  const nav = navItems.map(({ anchor }) => ({ anchor, label: t.nav[anchor] ?? anchor }));

  return (
    <PlayerProvider episodes={episodes}>
      <Intro />
      <MotionRoot className={styles.page} loadDelay={INTRO_SECONDS}>
        <EncounterHero photos={heroPhotos} t={t} nav={nav} />

        <main>
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
              <a className={styles.chevron} href={askQuestionHref}>
                {t.ask} <span aria-hidden>›</span>
              </a>
              <a id="collaborer" className={styles.chevron} href={`mailto:${site.email}?subject=${encodeURIComponent(`${t.collaborate} — The Encounter`)}`}>
                {t.collaborate} <span aria-hidden>›</span>
              </a>
            </div>
          </section>
        </main>

        <footer className={styles.footer}>
          <p className={styles.footerNote}>{t.footerNote}</p>
          <div className={styles.footerCols}>
            <div>
              <h2>{t.footerListen}</h2>
              <ul>
                {platforms.map((p) => (
                  <li key={p.name}>
                    <a href={p.href} target="_blank" rel="noopener">
                      {p.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2>The Encounter</h2>
              <ul>
                <li><a href="#vision">{t.footerVision}</a></li>
                <li><a href="#soutenir">{t.footerSupport}</a></li>
                <li><a href="#collaborer">{t.collaborate}</a></li>
              </ul>
            </div>
            <div>
              <h2>{t.footerInfo}</h2>
              <ul>
                <li><a href="/faq">FAQ</a></li>
                <li><a href="/mentions-legales">{t.legal}</a></li>
                <li><a href="/confidentialite">{t.privacy}</a></li>
              </ul>
            </div>
          </div>
          <p className={styles.footerLegal}>
            {t.rights} {t.madeBy}{" "}
            <a href="https://applicraftstudio.com" target="_blank" rel="noopener">
              AppliCraft Studio
            </a>
            .
          </p>
        </footer>
      </MotionRoot>
    </PlayerProvider>
  );
}
