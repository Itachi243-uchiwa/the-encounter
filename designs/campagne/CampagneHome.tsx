import { BrandMark } from "@/components/brand/BrandMark";
import { LoopVideo } from "@/components/media/LoopVideo";
import { MotionRoot } from "@/components/motion/MotionRoot";
import { stagger } from "@/components/motion/stagger";
import { journeys } from "@/content/journeys";
import { clips, photos } from "@/content/media";
import { askQuestionHref, platforms, site, themes } from "@/content/site";
import { pillars } from "@/content/vision";
import type { Episode } from "@/content/types";
import { formatDuration, primaryNavigation } from "@/lib/navigation";
import { Duotone, type Tone } from "./Duotone";
import { JourneyStickers } from "./JourneyStickers";
import styles from "./campagne.module.css";

interface CampagneHomeProps {
  episodes: Episode[];
  latest: Episode;
}

const posterTones: Tone[] = ["bordeaux", "noir", "jaune"];
/** Les visages restent en noir/champagne ou bordeaux/champagne : des tons doux et flatteurs. */
const portraitTones: Tone[] = ["bordeaux", "noir", "noir"];
const pillarPhotos = [photos.eventWorship, photos.guestEp6b, photos.founderBlack];

/** Direction 3 — « Campagne » : The Encounter comme une campagne d'affiches, fière et partageable. */
export function CampagneHome({ episodes, latest }: CampagneHomeProps) {
  const nav = primaryNavigation();

  return (
    <MotionRoot className={styles.page} loadDelay={0.15}>

      <header className={styles.bar}>
        <a href="#top" className={styles.logo}>
          <BrandMark size={30} color="currentColor" />
          <span>The ENCNTR</span>
        </a>
        <nav aria-label="Navigation principale">
          <ul>
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.anchor}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <a className={styles.barCta} href={site.links.youtube} target="_blank" rel="noopener">
          Regarder
        </a>
      </header>

      <section className={styles.bento} id="top" aria-labelledby="hero-title" data-stagger>
        <div className={`${styles.tile} ${styles.tileName}`}>
          <BrandMark size={170} color="var(--bordeaux)" className={styles.nameMark} />
          <h1 id="hero-title">
            <span className={styles.nameSmall}>The </span>
            <span className={styles.nameBig}>Encounter</span>
          </h1>
          <p className={styles.tagline}>La rencontre qui transforme</p>
          <div className={styles.tileLead}>
            <p>Le podcast où des vies racontent, face caméra, leur rencontre avec Dieu.</p>
            <a href="#vis" className={styles.buttonDark}>
              Ce que je vis →
            </a>
          </div>
        </div>
        <Duotone photo={photos.jenniferLaugh} tone="bordeaux" sizes="(max-width: 760px) 100vw, 42vw" priority className={`${styles.tile} ${styles.tilePhotoA}`} />
        <a href={site.links.youtube} target="_blank" rel="noopener" className={`${styles.tile} ${styles.tileEpisode}`}>
          <span className={styles.tileLabel}>Nouvel épisode · {formatDuration(latest.durationMinutes)}</span>
          <span className={styles.tileTitle}>{latest.title}</span>
          <span className={styles.tilePlay} aria-hidden>
            ▶
          </span>
        </a>
      </section>

      <main>
        <section id="podcast" className={styles.posters} aria-labelledby="posters-title">
          <div className={styles.postersTrack}>
            <div className={styles.postersIntro}>
              <h2 id="posters-title" data-split="lines">
                Histoires de Rencontres
              </h2>
              <p data-reveal>Sept épisodes. Sept vies. En vidéo intégrale sur YouTube, en extraits sur TikTok.</p>
            </div>
            {episodes.map((episode, i) => (
              <a
                key={episode.slug}
                href={site.links.youtube}
                target="_blank"
                rel="noopener"
                className={`${styles.poster} ${styles[`poster_${posterTones[i % 3]}`]}`}
              >
                <Duotone photo={episode.cover} tone={portraitTones[i % 3]} sizes="(max-width: 760px) 80vw, 30vw" className={styles.posterImg} />
                <span className={styles.posterNum}>N°{episode.number}</span>
                <span className={styles.posterTheme}>{themes.find((t) => t.id === episode.theme)?.label}</span>
                <span className={styles.posterTitle}>{episode.title}</span>
                <span className={styles.posterQuote}>« {episode.quote} »</span>
              </a>
            ))}
          </div>
        </section>

        <section id="vis" className={styles.vis} aria-labelledby="vis-title">
          <h2 id="vis-title" data-split="lines">
            Ce que tu vis
          </h2>
          <p className={styles.visLead} data-reveal>
            Choisis un sticker. On te répond par une parole, et par l&apos;histoire de quelqu&apos;un qui l&apos;a vécu.
          </p>
          <JourneyStickers journeys={journeys} episodes={episodes} />
        </section>

        <section id="vision" className={styles.gathering} aria-labelledby="gathering-title">
          <Duotone tone="bordeaux" className={styles.gatheringMedia}>
            <LoopVideo clip={clips.louange} />
          </Duotone>
          <h2 id="gathering-title" className={styles.gatheringTitle} data-split="lines">
            La Rencontre
          </h2>
          <div className={styles.gatheringSticker}>
            27.09
            <br />
            2025
          </div>
          <p className={styles.gatheringText} data-reveal>
            Louange, adoration, prédication : la première Rencontre en salle. La suivante se prépare.
          </p>
        </section>

        <section className={styles.pillars} aria-labelledby="pillars-title">
          <h2 id="pillars-title" className="visually-hidden">
            Les trois piliers
          </h2>
          {pillars.map((pillar, i) => (
            <article key={pillar.name} className={`${styles.pillar} ${styles[`pillar_${posterTones[i]}`]}`}>
              <h3>{pillar.name}</h3>
              <p data-reveal>{pillar.line}</p>
              <Duotone photo={pillarPhotos[i]} tone={portraitTones[(i + 1) % 3]} sizes="22vw" className={styles.pillarImg} />
            </article>
          ))}
        </section>

        <section id="soutenir" className={styles.support} aria-labelledby="support-title">
          <div className={styles.supportMain}>
            <h2 id="support-title" data-split="lines">
              Soutiens la vision
            </h2>
            <p data-reveal>Studio, tournages, Rencontres : chaque don via Revolut garde la parole libre.</p>
            <a className={styles.buttonDark} href={site.links.support} target="_blank" rel="noopener">
              Faire un don
            </a>
          </div>
          <a className={styles.supportSide} href={askQuestionHref} data-reveal>
            <span className={styles.supportSideTitle}>Pose ta question</span>
            <span>Elle pourra nourrir un épisode questions-réponses.</span>
          </a>
          <a id="collaborer" className={styles.supportSide} href={`mailto:${site.email}?subject=Collaborer%20avec%20The%20Encounter`} data-reveal style={stagger(1)}>
            <span className={styles.supportSideTitle}>Collabore</span>
            <span>Invité, partenaire, presse : écris-nous.</span>
          </a>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerRow}>
          <p className={styles.footerSign}>
            <BrandMark size={28} color="currentColor" /> {site.tagline}
          </p>
          <ul>
            {platforms.map((p) => (
              <li key={p.name}>
                <a href={p.href} target="_blank" rel="noopener">
                  {p.name}
                </a>
              </li>
            ))}
            <li>
              <a href="/mentions-legales">Mentions légales</a>
            </li>
          </ul>
        </div>
      </footer>
    </MotionRoot>
  );
}
