import Image from "next/image";
import { BrandMark } from "@/components/brand/BrandMark";
import { LoopVideo } from "@/components/media/LoopVideo";
import { YouTubePlayer } from "@/components/media/YouTubePlayer";
import { MotionRoot } from "@/components/motion/MotionRoot";
import { stagger } from "@/components/motion/stagger";
import { clips, photos } from "@/content/media";
import { platforms, site } from "@/content/site";
import { expressions, vision } from "@/content/vision";
import type { Episode } from "@/content/types";
import { formatDuration, primaryNavigation } from "@/lib/navigation";
import { EpisodeSheet } from "./EpisodeSheet";
import { HeroMedia } from "./HeroMedia";
import styles from "./studio.module.css";

interface StudioHomeProps {
  episodes: Episode[];
  latest: Episode;
}

const expressionMedia = [
  { kind: "video" as const, clip: clips.studio },
  { kind: "photo" as const, photo: photos.eventStage },
  { kind: "photo" as const, photo: photos.notes },
];

const plateau = [
  { photo: photos.jenniferLaugh, caption: "Épisode 7, entre deux questions", className: "plA" },
  { photo: photos.studioDuo2, caption: "Le plateau, vu de la régie", className: "plB" },
  { photo: photos.mug, caption: "La tasse The ENCNTR", className: "plC" },
  { photo: photos.guestEp6b, caption: "Épisode 6", className: "plD" },
] as const;

const issueDate = new Intl.DateTimeFormat("fr-BE", { month: "long", year: "numeric" });

/** Direction 1 — « Le Studio » : un magazine culturel. On entre dans la pièce, on s'assoit, on écoute. */
export function StudioHome({ episodes, latest }: StudioHomeProps) {
  const nav = primaryNavigation();
  const journal = episodes.slice(0, 6);
  const { encounter, transformation } = vision.words;

  return (
    <MotionRoot className={styles.page}>

      <header className={styles.hero}>
        <HeroMedia className={styles.heroMedia} photos={[photos.studioDuo, photos.studioDuo2, photos.studioEp7]} />
        <div className={styles.heroScrim} aria-hidden />
        <nav className={styles.heroNav} aria-label="Navigation principale">
          <a href="#top" className={styles.wordmark}>
            <BrandMark size={34} color="var(--brand-blanc)" />
            <span>{site.name}</span>
          </a>
          <ul>
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.anchor}>{item.label}</a>
              </li>
            ))}
          </ul>
          <a className={styles.action} href="#episode">
            Écouter
          </a>
        </nav>
        <div className={styles.heroCopy} id="top">
          <h1 data-split="lines" data-split-load>
            La rencontre
            <br />
            qui transforme
          </h1>
          <p data-split="lines" data-split-load>
            The Encounter est un podcast et un mouvement : des vies racontent, face caméra, leur rencontre avec Dieu.
          </p>
        </div>
        <p className={styles.coverLine}>
          <span>N°{latest.number}</span>
          <span>{issueDate.format(new Date(latest.publishedAt))}</span>
          <a href="#episode">
            À la une : <em>{latest.title}</em>
          </a>
        </p>
      </header>

      <main>
        <section id="episode" className={styles.featured} aria-labelledby="featured-title">
          <div className={styles.playerWrap} data-clip>
            <YouTubePlayer
              className={styles.player}
              videoId={latest.youtubeId}
              title={latest.title}
              poster={photos.studioEp7}
              fallbackUrl={site.links.youtube}
              sizes="(max-width: 760px) 100vw, 66vw"
            />
          </div>
          <div className={styles.featuredText}>
            <p className={styles.featuredMeta} data-reveal>
              Épisode {latest.number} · {formatDuration(latest.durationMinutes)}
            </p>
            <h2 id="featured-title" data-split="lines">
              {latest.title}
            </h2>
            <p data-reveal style={stagger(2)}>
              {latest.hook}
            </p>
            <ul className={styles.platforms} data-reveal style={stagger(3)}>
              {platforms.map((p) => (
                <li key={p.name}>
                  <a href={p.href} target="_blank" rel="noopener">
                    {p.name}
                  </a>
                </li>
              ))}
            </ul>
            <a className={styles.textLink} href="#podcast" data-reveal style={stagger(4)}>
              Tous les épisodes
            </a>
          </div>
        </section>

        <section className={styles.journal} aria-labelledby="journal-title">
          <div className={styles.journalBg} data-parallax="8">
            <Image src={photos.studioWide.src} alt="" fill sizes="100vw" className={styles.cover} />
          </div>
          <div className={styles.journalScrim} aria-hidden />
          <div className={styles.journalCopy}>
            <h2 id="journal-title" data-split="lines">
              Ce qu&apos;ils ont dit
            </h2>
            <p data-reveal style={stagger(1)}>
              Chaque invité laisse une phrase qui reste. Chacune mène à l&apos;épisode complet.
            </p>
          </div>
          <ol className={styles.slips}>
            {journal.map((episode) => (
              <li key={episode.slug} className={styles.slip}>
                <a href={`/podcast/${episode.slug}`}>
                  <strong>{episode.title}</strong>
                  <BrandMark size={26} color="var(--brand-bordeaux)" className={styles.slipRule} />
                  <span>« {episode.quote} »</span>
                  <span className={styles.slipMeta}>Épisode {episode.number}</span>
                </a>
              </li>
            ))}
          </ol>
        </section>

        <section id="podcast" className={styles.catalogue} aria-label="Le podcast">
          <EpisodeSheet episodes={episodes} />
        </section>

        <section id="vision" className={styles.vision} aria-labelledby="vision-title">
          <h2 id="vision-title" className="visually-hidden">
            Notre vision
          </h2>
          <p className={styles.visionStatement}>
            {vision.burningBush}
          </p>
          <div className={styles.lexicon}>
            {[encounter, transformation].map((w, i) => (
              <article key={w.word} className={styles.entry} data-reveal style={stagger(i)}>
                <p className={styles.entryWord}>{w.word}</p>
                <p className={styles.entryMeta}>
                  {w.language} · /{w.pronunciation}/
                </p>
                <p className={styles.entryMeaning}>{w.meaning}</p>
              </article>
            ))}
          </div>
          <div className={styles.visionImages}>
            <figure className={styles.visionLarge} data-clip>
              <Image src={photos.founderBlack.src} alt={photos.founderBlack.alt} fill sizes="(max-width: 760px) 80vw, 42vw" className={styles.cover} />
            </figure>
            <figure className={styles.visionSmall} data-clip>
              <LoopVideo clip={clips.louange} />
            </figure>
            <p className={styles.visionCaption} data-reveal>
              {site.founder}, fondatrice. À côté, la louange pendant La Rencontre du 27 septembre 2025.
            </p>
          </div>
        </section>

        <section className={styles.expressions} aria-labelledby="expressions-title">
          <div className={styles.expressionsTrack}>
            <div className={styles.expressionsIntro}>
              <h2 id="expressions-title" data-split="lines">
                Trois façons de rencontrer
              </h2>
              <p data-reveal style={stagger(1)}>
                {vision.statement}
              </p>
            </div>
            {expressions.map((ex, i) => {
              const media = expressionMedia[i];
              return (
                <article key={ex.name} className={styles.expression}>
                  <div className={styles.expressionMedia}>
                    {media.kind === "video" ? (
                      <LoopVideo clip={media.clip} />
                    ) : (
                      <Image src={media.photo.src} alt={media.photo.alt} fill sizes="(max-width: 760px) 90vw, 40vw" className={styles.cover} />
                    )}
                  </div>
                  <p className={styles.expressionSub}>{ex.subtitle}</p>
                  <h3>{ex.name}</h3>
                  <p>{ex.body}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className={styles.plateau} aria-labelledby="plateau-title">
          <h2 id="plateau-title" className={styles.plateauTitle} data-split="lines">
            Sur le plateau
          </h2>
          <p className={styles.plateauLead} data-reveal>
            Un salon chaleureux plutôt qu&apos;un studio froid : des fauteuils, des livres, une lampe. C&apos;est là que les
            histoires se racontent.
          </p>
          {plateau.map((item) => (
            <figure key={item.photo.src} className={`${styles.plateauItem} ${styles[item.className]}`}>
              <div className={styles.plateauImg} data-clip>
                <Image src={item.photo.src} alt={item.photo.alt} fill sizes="(max-width: 760px) 100vw, 50vw" className={styles.cover} />
              </div>
              <figcaption>{item.caption}</figcaption>
            </figure>
          ))}
        </section>

        <section id="soutenir" className={styles.cta} aria-labelledby="cta-title">
          <p className={styles.ctaAside} data-split="lines">
            Studio, tournages, louange : The Encounter vit grâce à celles et ceux qui croient à la vision.
          </p>
          <div className={styles.card} data-reveal>
            <h2 id="cta-title">Soutenir la vision</h2>
            <p>Un don ponctuel, en toute sécurité, via Revolut. Le bénéficiaire est {site.founder}.</p>
            <a className={styles.cardAction} href={site.links.support} rel="noopener" target="_blank">
              Faire un don
            </a>
            <p id="collaborer" className={styles.cardAlt}>
              Invité, partenaire, presse ?{" "}
              <a href={`mailto:${site.email}?subject=Collaborer%20avec%20The%20Encounter`}>Écris-nous</a>
            </p>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <p className={styles.colophon}>
          <span className={styles.colophonName}>{site.name}</span>, {site.tagline.toLowerCase()}. Un podcast et un mouvement, en Belgique.
        </p>
        <div className={styles.footerTop}>
          <ul>
            <li><a href={site.links.youtube}>YouTube</a></li>
            <li><a href={site.links.instagram}>Instagram</a></li>
            <li><a href={site.links.tiktok}>TikTok</a></li>
          </ul>
          <p>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
        </div>
        <p className={styles.footerLegal}>
          © 2026 {site.name} · <a href="/mentions-legales">Mentions légales</a> ·{" "}
          <a href="/confidentialite">Confidentialité</a>
        </p>
      </footer>
    </MotionRoot>
  );
}
