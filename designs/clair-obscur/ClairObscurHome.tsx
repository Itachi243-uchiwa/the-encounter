import Image from "next/image";
import { BrandMark } from "@/components/brand/BrandMark";
import { MotionRoot } from "@/components/motion/MotionRoot";
import { journeys } from "@/content/journeys";
import { clips, photos } from "@/content/media";
import { askQuestionHref, platforms, site } from "@/content/site";
import { vision } from "@/content/vision";
import type { Episode } from "@/content/types";
import { primaryNavigation } from "@/lib/navigation";
import { JourneyTile } from "./JourneyTile";
import { Lantern } from "./Lantern";
import { PlayerProvider } from "./Player";
import { Playlist, Shelf } from "./Playlist";
import { SpotlightHero } from "./SpotlightHero";
import { StoryPin } from "./StoryPin";
import styles from "./clair-obscur.module.css";

interface ClairObscurHomeProps {
  episodes: Episode[];
}

/**
 * Direction 2 — « Clair-obscur » : le noir et la lumière du buisson, mis en scène
 * comme une page produit (récit épinglé, grille de tuiles) et écoutés comme sur
 * une application de streaming (playlist, étagères, barre de lecture).
 */
export function ClairObscurHome({ episodes }: ClairObscurHomeProps) {
  const nav = primaryNavigation().map(({ label, anchor }) => ({ label, anchor }));

  return (
    <PlayerProvider episodes={episodes}>
      <MotionRoot className={styles.page} loadDelay={0}>
        <SpotlightHero clip={clips.studio} name={site.name} nav={nav} />

        <main>
          <section className={styles.statement} aria-labelledby="statement-title">
            <h2 id="statement-title" className="visually-hidden">
              Notre conviction
            </h2>
            <p className={styles.statementText} data-scrub-words>
              {vision.burningBush}
            </p>
          </section>

          <Playlist episodes={episodes} />
          <Shelf episodes={episodes} />

          <StoryPin
            clip={clips.louange}
            beats={[
              { title: "La louange d'abord.", text: "La Rencontre commence par l'adoration, pour créer un espace où Dieu se manifeste." },
              { title: "Une parole qui transforme.", text: "Puis la prédication : de gloire en gloire, une vie renouvelée par la Parole." },
              { title: "Une rencontre personnelle.", text: "Le but n'est pas un événement. C'est un face-à-face, vrai et profond." },
            ]}
          />

          <section id="vision" className={styles.bento} aria-labelledby="bento-title">
            <h2 id="bento-title" className="visually-hidden">
              The Encounter
            </h2>

            <Lantern className={styles.bentoGrid}>
              <article className={`${styles.tile} ${styles.tileHero}`} data-lit data-reveal>
                <Image src={photos.studioDuo.src} alt={photos.studioDuo.alt} fill sizes="(max-width: 760px) 100vw, 66vw" className={styles.tileBg} />
                <div className={styles.tileContent}>
                  <p className={styles.tileBig}>
                    {episodes.length} épisodes.
                    <br />
                    {episodes.length} vies.
                  </p>
                  <p>Filmés en entier sur un plateau qui ressemble à un salon.</p>
                </div>
              </article>

              <article className={`${styles.tile} ${styles.tileFounder}`} data-lit data-reveal>
                <div className={styles.founderImg}>
                  <Image src={photos.founderPortrait.src} alt={photos.founderPortrait.alt} fill sizes="(max-width: 760px) 100vw, 33vw" style={{ objectFit: "cover" }} />
                </div>
                <div className={styles.tileContent}>
                  <p className={styles.tileQuote}>« {vision.closing} »</p>
                  <p>{site.founder}, fondatrice</p>
                </div>
              </article>

              <article className={`${styles.tile} ${styles.tileJourney}`} data-reveal>
                <JourneyTile journeys={journeys} episodes={episodes} />
              </article>

              <article className={`${styles.tile} ${styles.tileEvent}`} data-lit data-reveal>
                <Image src={photos.eventCrowd.src} alt={photos.eventCrowd.alt} fill sizes="(max-width: 760px) 100vw, 33vw" className={styles.tileBg} />
                <div className={styles.tileContent}>
                  <p className={styles.tileBig}>27.09.25</p>
                  <p>La Rencontre : la première soirée de louange en salle.</p>
                </div>
              </article>
            </Lantern>
          </section>

          <section id="soutenir" className={styles.support} aria-labelledby="support-title">
            <BrandMark size={72} color="var(--warm)" />
            <h2 id="support-title" data-split="lines">
              Soutenir la vision.
            </h2>
            <p data-reveal>Un don ponctuel via Revolut finance le studio, les tournages et les Rencontres.</p>
            <div className={styles.heroLinks} data-reveal>
              <a className={styles.pill} href={site.links.support} target="_blank" rel="noopener">
                Faire un don
              </a>
              <a className={styles.chevron} href={askQuestionHref}>
                Poser une question <span aria-hidden>›</span>
              </a>
              <a id="collaborer" className={styles.chevron} href={`mailto:${site.email}?subject=Collaborer%20avec%20The%20Encounter`}>
                Collaborer <span aria-hidden>›</span>
              </a>
            </div>
          </section>
        </main>

        <footer className={styles.footer}>
          <p className={styles.footerNote}>
            Les épisodes sont publiés en intégralité sur YouTube et en extraits sur TikTok et Instagram.
          </p>
          <div className={styles.footerCols}>
            <div>
              <h2>Écouter</h2>
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
                <li><a href="#vision">Notre vision</a></li>
                <li><a href="#soutenir">Soutenir</a></li>
                <li><a href="#collaborer">Collaborer</a></li>
              </ul>
            </div>
            <div>
              <h2>Infos</h2>
              <ul>
                <li><a href="/faq">FAQ</a></li>
                <li><a href="/mentions-legales">Mentions légales</a></li>
                <li><a href="/confidentialite">Confidentialité</a></li>
              </ul>
            </div>
          </div>
          <p className={styles.footerLegal}>Copyright © 2026 {site.name}. {site.tagline}.</p>
        </footer>
      </MotionRoot>
    </PlayerProvider>
  );
}
