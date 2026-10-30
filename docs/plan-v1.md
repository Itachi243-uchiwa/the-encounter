# The Encounter — plan de développement de la V1

Établi le 30 octobre 2026. Référence : contrat AC-2026-TE-01 (25/10), cadrage V1.0 (15/10), maquette 2 « Clair-obscur » retenue par la cliente.

**Mise en ligne : lundi 9 novembre 2026.** Il reste 10 jours, deux tours de corrections compris.

---

## 1. Périmètre

### Inclus (contrat, §02)

| Page / fonction | Route FR | Route EN | Notes |
| --- | --- | --- | --- |
| Accueil | `/` | `/en` | Maquette 2 retravaillée (hero animé, Portraits, Chemin, Fondatrice, Ce que tu vis, Soutenir) |
| Podcast : index | `/podcast` | `/en/podcast` | Tous les portraits, lecture YouTube, épisode « bientôt » |
| Podcast : fiche épisode | `/podcast/[slug]` | `/en/podcast/[slug]` | Vidéo YouTube intégrée, résumé, citation, portraits liés, partage |
| Notre vision | `/vision` | `/en/vision` | Buisson ardent, pagash / metamorphōsis, 3 piliers, fondatrice |
| Soutenir | `/soutenir` | `/en/support` | Explication + redirection Revolut (aucun paiement sur le site) |
| Collaborer | `/collaborer` | `/en/collaborate` | Invités, partenaires, presse → formulaire de contact pré-rempli |
| Contact + FAQ | `/contact`, `/faq` | `/en/contact`, `/en/faq` | Formulaire de contact (contrat) |
| Pages légales | `/mentions-legales`, `/confidentialite`, `/cookies` | idem `/en/...` | |
| SEO de base, bandeau cookies, mise en ligne sur le domaine de la cliente | | | Vercel |

### Exclu de la V1 (contrat, §03)

Shop, back-office d'administration, section Événements, espace membre, abonnements, transcriptions, automatisations email, newsletter. Ces modules existent déjà comme flags désactivés dans `lib/features.ts` : ils s'activeront sans toucher aux pages existantes.

### Ajouté depuis la signature, à acter avec la cliente

- **Site bilingue FR / EN avec changement instantané.** Le contrat ne mentionne pas de langue (le cadrage posait la question, §06 q.19). C'est une extension du périmètre : à couvrir par un avenant ou à offrir explicitement, avant de lancer la traduction des pages.
- Animations plus poussées (références studionextdoor.be, wearebrand.io) : couvert par « design décliné de l'identité », pas d'impact contractuel.

---

## 2. Ce qui est déjà fait (30/10)

- Maquette 2 conservée telle que la cliente l'a aimée (style Spotify : playlist, étagère, tuiles, récit épinglé, barre de lecture), améliorée :
  - hero remplacé par celui de la maquette 1 (photos du plateau qui entrent en rideau et dérivent lentement, logo qui se dévoile, recul dans un cadre au défilement), sans la lumière qui suivait la souris ;
  - ouverture : le monogramme se trace et se remplit (1,4 s, une seule fois) ;
  - « Ils ont rencontré Dieu » : les témoignages en stories (format Instagram/TikTok) : bulles des invités, carte verticale qui lit l'extrait vidéo de l'épisode (sans le son par défaut, bouton son, sous-titres) ou sa photo tant que l'extrait manque, phrase de l'invité, barres de progression qui suivent l'extrait, « Écouter son histoire » ;
  - playlist : pochette en mosaïque de portraits, fond qui prend la couleur du portrait en cours, crédits avec la fondatrice, bouton « S'abonner sur YouTube »;
  - redondance retirée : l'étagère « Portraits » (doublon de la playlist) est supprimée ; stories = donner envie, playlist = écouter ;
  - animations : égaliseur sur l'épisode en cours, onde sur le grand bouton lecture, pistes et cartes qui arrivent en cascade, survols (zoom des photos, cartes qui se soulèvent), boutons aimantés, barre de navigation qui se cache en descendant.
- Textes de la cliente : hero, « The Encounter Podcast », « Portrait » à la place des thèmes, 8 épisodes avec leur phrase de résumé (l'épisode 8 en « Bientôt »), phrase « J'ai rencontré Dieu… », aucun nombre d'épisodes affiché, photo de la fondatrice choisie.
- Logos vectorisés depuis la charte : `public/brand/mark.svg` (E étoilé), `public/brand/wordmark.svg` (The ENCNTR).
- Médias : photos réexportées depuis les originaux (jusqu'à 3200 px, JPEG 92, couleurs non sous-échantillonnées), qualité Next/Image à 90 en AVIF/WebP, affiches vidéo refaites depuis les vidéos 4K, vidéos laissées en 4K d'origine.
- FR / EN instantané sur la maquette (≈ 50 ms, sans rechargement), choix mémorisé.

---

## 3. Architecture technique

**Pile** : Next.js 16 (App Router, Cache Components), React 19, CSS Modules, GSAP + ScrollTrigger + SplitText + MotionPath, Lenis. Hébergement Vercel.

### 3.1 Structure

```
app/
  [lang]/                      fr | en, generateStaticParams → toutes les pages statiques
    layout.tsx                 <html lang>, polices, LangProvider, MotionRoot, nav, footer, lecteur
    page.tsx                   accueil
    podcast/page.tsx
    podcast/[slug]/page.tsx    + opengraph-image.tsx
    vision/ soutenir/ collaborer/ contact/ faq/ (légal)/
  sitemap.ts  robots.ts
proxy.ts                       / → /fr en interne (URL française sans préfixe), détection de langue à la 1re visite
components/site/               les composants de la maquette 2, sortis de designs/clair-obscur
content/                       épisodes, vision, parcours, textes FR + EN (source unique, typée)
lib/i18n.tsx                   LangProvider (déjà en place)
lib/repositories/              accès au contenu (le CMS de la phase 2 remplacera l'implémentation, pas les pages)
```

- Les maquettes 1 et 3 et la page de présentation sont retirées (fait le 30/10) ; elles restent dans l'historique git (commit `d6ea778`). La maquette 2 est servie sur `/`.
- `proxy.ts` (le `middleware` est renommé `proxy` en Next 16) : les URL françaises restent sans préfixe (`/podcast`), l'anglais vit sous `/en`. À la première visite seulement, un navigateur en anglais est redirigé vers `/en` ; ensuite c'est le cookie qui décide.

### 3.2 Changement de langue instantané

Chaque page embarque ses textes dans les deux langues (quelques Ko : 8 épisodes, une vingtaine de blocs). Le bouton FR/EN change l'état React, met à jour l'URL avec `history.replaceState` (`/podcast` ↔ `/en/podcast`) et pose un cookie : aucun rechargement, aucun aller-retour serveur, l'animation et la lecture en cours continuent. Les moteurs de recherche, eux, reçoivent deux pages statiques distinctes reliées par `hreflang`.

### 3.3 Contenu sans back-office

Le back-office est exclu de la V1 : le contenu vit dans `content/*.ts`, typé et relu en revue de code. Ajouter un épisode = une entrée (titre, résumé, citation, durée, date, `youtubeId`, photo, version anglaise). Le contrat d'accès `EpisodeRepository` est déjà en place : le CMS de la phase 2 le remplacera sans toucher aux pages.

### 3.4 Formulaire de contact

Server Action (guide Forms de Next 16) avec validation côté serveur, champ piège anti-robots, limite d'envoi par IP, envoi par Resend (offre gratuite, domaine à vérifier dans le DNS), accusé de réception à l'expéditeur. Le sujet est pré-rempli selon la provenance (Collaborer, Poser une question). Repli `mailto:` si l'envoi échoue.

### 3.5 Vidéo et cookies

- Épisodes : façade YouTube (image + bouton) chargée en `youtube-nocookie.com` au clic seulement. Aucun traceur avant consentement.
- Mesure d'audience : Vercel Web Analytics (sans cookie).
- Bandeau cookies : sobre, deux boutons de même poids (Accepter / Refuser), lié à la lecture YouTube. Choix modifiable depuis le pied de page.

### 3.6 SEO de base

`generateMetadata` par page et par langue, `alternates.languages` (hreflang FR/EN), `sitemap.ts`, `robots.ts`, image Open Graph par épisode (photo du portrait + titre), données structurées JSON-LD `PodcastSeries` / `PodcastEpisode` / `Organization`, titres et descriptions relus par la cliente.

### 3.7 Performance et qualité d'image

- Photos : AVIF/WebP qualité 90, tailles adaptées par `sizes`, première image du hero en priorité haute. Objectifs mobiles : LCP < 2,5 s, CLS < 0,1, INP < 200 ms.
- Vidéos : les fichiers 4K d'origine (7 et 11 Mo) restent la source. **Décision à prendre** : servir une version 1440p sur téléphone (visuellement identique sur un écran de téléphone, 3× plus légère) et la 4K sur grand écran.
- L'ouverture animée ne se joue qu'une fois par session.

### 3.8 Accessibilité et mouvement

Contrastes WCAG AA, navigation clavier complète (lecteur, fenêtre, sélecteurs), textes alternatifs, `lang` correct par bloc. Toutes les animations ont une version « moins d'animations » : contenu identique, sans déplacement.

---

## 4. Planning

| Jour | Date | Travail | Livrable |
| --- | --- | --- | --- |
| J0 | ven 30/10 | Maquette 2 retravaillée, FR/EN, médias HD | Lien de preview → **tour de corrections 1** |
| J1–J2 | sam 31/10 – dim 1/11 | Architecture `[lang]`, `proxy.ts`, layout commun, nav, footer, lecteur ; extraction des composants ; archivage des maquettes 1 et 3 | Squelette navigable FR/EN |
| J3 | lun 2/11 | Accueil finalisée avec les retours du tour 1 ; index Podcast | |
| J4 | mar 3/11 | Fiches épisodes (YouTube, partage, portraits liés), images OG | |
| J5 | mer 4/11 | Notre vision, Soutenir, Collaborer | |
| J6 | jeu 5/11 | Contact (Server Action + Resend), FAQ, pages légales, bandeau cookies | Toutes les pages existent |
| J7 | ven 6/11 | SEO, performance, accessibilité, relecture EN ; preview Vercel complète | **Tour de corrections 2** |
| J8 | sam 7/11 | Corrections du tour 2, contenus définitifs (IDs YouTube, durées, dates) | |
| J9 | dim 8/11 | Recette sur appareils, gel du contenu | Feu vert cliente |
| J10 | lun 9/11 | Domaine, DNS, HTTPS, mise en ligne, contrôles après mise en ligne | **Site en ligne** |

---

## 5. Ce qu'il faut recevoir de la cliente, et quand

| Élément | Nécessaire pour | Au plus tard |
| --- | --- | --- |
| Accord sur le bilingue (avenant ou offert) | Lancer les traductions | 31/10 |
| Lien YouTube de chaque épisode, durée réelle, date de diffusion | Lecteur, fiches, SEO | 2/11 |
| Validation des résumés et citations des 8 épisodes (proposés par nous) | Index, fiches | 2/11 |
| Photo et date de l'épisode 8 « L'homme derrière l'artiste » | Fiche « bientôt » | 3/11 |
| Validation des 7 extraits des stories (passage choisi, sous-titres relus) — extraits faits le 30/10 depuis les vidéos des épisodes | Stories « Ils ont rencontré Dieu » | 3/11 |
| Relecture de l'anglais par une personne anglophone | Pages EN | 6/11 |
| Adresse email de contact définitive (actuellement « à confirmer ») | Formulaire, pied de page | 4/11 |
| Questions et réponses de la FAQ | Page FAQ | 4/11 |
| Mentions légales : nom légal, n° BCE ou personne physique, adresse ; bénéficiaire des dons | Pages légales, Soutenir | 4/11 |
| Lien Spotify / Apple Podcasts s'il existe | Plateformes d'écoute | 4/11 |
| Accès DNS du nom de domaine | Mise en ligne, Resend | 6/11 |

---

## 6. Recette avant mise en ligne

- Appareils : iPhone (Safari), Android (Chrome), iPad, Mac (Safari, Chrome), Windows (Chrome, Edge, Firefox).
- Chaque page en FR et en EN, changement de langue sur chaque page, liens profonds `/en/podcast/[slug]`.
- Formulaire : envoi, accusé de réception, erreurs, anti-robots.
- Lecture de chaque épisode, fermeture de la fenêtre (la vidéo s'arrête), barre de lecture.
- Lighthouse mobile ≥ 90 en performance, accessibilité, SEO ; contrôle « moins d'animations » ; navigation au clavier.
- Liens cassés, 404 personnalisée, redirections, sitemap déclaré dans Google Search Console.
- Mention contractuelle « Site réalisé par AppliCraft Studio » en pied de page (contrat §06).

---

## 7. Après la mise en ligne

- 1 mois pour signaler les anomalies (contrat), 90 jours de garantie sur les bugs.
- Contreparties de visibilité (contrat §06) : message dans un épisode, 2 semaines de publications, dans le mois suivant la mise en ligne.
- Phase 2, sur devis : Événements, Shop, back-office (CMS) branché sur `EpisodeRepository`, newsletter, transcriptions, espace membre. Les flags et les routes sont déjà prévus.

## 8. Risques

| Risque | Parade |
| --- | --- |
| Contenus reçus en retard (IDs YouTube, légal) | Dates butoirs ci-dessus ; à défaut, lien vers la chaîne YouTube (déjà géré par le lecteur) |
| Bilingue hors contrat | Décision écrite avant le 31/10 ; sans accord, la V1 sort en FR avec l'EN prêt à activer |
| Délai serré (10 jours) | Pages construites à partir des composants existants de la maquette ; aucune nouvelle dépendance lourde |
| Poids des vidéos 4K sur mobile | Version 1440p pour téléphone (décision §3.7) |
