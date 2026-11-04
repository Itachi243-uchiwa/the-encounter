import type { Journey } from "./journeys";
import type { Episode } from "./types";
import type { Lang } from "@/lib/i18n";

/**
 * Version anglaise du contenu. Le français reste la source (content/*.ts) ;
 * ici, uniquement ce qui change en anglais. Versets : King James Version (domaine public).
 */
const en = {
  site: {
    tagline: "The encounter that transforms",
    promise: "One encounter with God can change everything.",
    pitch: "Conversations about faith, the journey and transformation.",
    description: "The Encounter is a platform of conversations that inspires faith, identity and a life transformed in Christ.",
  },
  vision: {
    burningBush:
      "Like Moses at the burning bush, we believe a single encounter with God can turn a life around, change a story and awaken a calling.",
    closing: "I met God… And my life has never been the same.",
    statement:
      "To see every person live an authentic encounter with God, one that transforms, restores and sets them back on the path of their true destiny.",
    intention: "God never meets anyone without a purpose.",
  },
  episodes: {
    "comment-j-ai-rencontre-dieu-en-boite-de-nuit": {
      title: "How I met God in a nightclub",
      hook: "A night like any other, the music too loud, and a presence no one saw coming.",
      quote: "I was scared, really scared. And in that moment, I prayed the prayer of salvation.",
    },
    "il-m-a-beaucoup-pardonne": {
      title: "He forgave me much, so I loved Him much",
      hook: "The weight of the past, shame that clings to the skin, and the grace that changes everything.",
      quote: "I had found my home again. I had found love, the real one.",
    },
    "ils-ont-brise-mon-enfance": {
      title: "They broke my childhood",
      hook: "Wounds received too early, years of silence, and the slow road to healing.",
      quote: "God really knows what He's doing.",
    },
    "il-m-a-restaure": {
      title: "He restored me",
      hook: "When everything fell apart: rebuilding stone by stone, with Him.",
      quote: "Twelve minutes of humiliation, of cruelty, of horror.",
    },
    "deux-valent-mieux-qu-un": {
      title: "Two are better than one",
      hook: "Friendship, covenant, and the strength of not walking alone.",
      quote: "For someone who has no father, God is the best of fathers.",
    },
    "jeunes-et-maries": {
      title: "Young & married",
      hook: "Marrying young, building together and keeping God at the centre of the home.",
      quote: "It could have been very fragile, but it made us stronger than anything else.",
    },
    "etre-avant-de-faire": {
      title: "Being before doing",
      hook: "Slowing down, letting God shape character before chasing the mission.",
      quote: "God told me: go and water the four seeds you have already planted.",
    },
    "l-homme-derriere-l-artiste": {
      title: "The man behind the artist",
      hook: "The stages, the lights, and what remains when the curtain falls.",
      quote: "People applauded what I did. God loved me for who I was.",
    },
  } satisfies Record<string, Pick<Episode, "title" | "hook" | "quote">>,
  journeys: {
    chercher: { label: "I'm looking for God", verse: "And ye shall seek me, and find me, when ye shall search for me with all your heart.", reference: "Jeremiah 29:13" },
    pardon: { label: "My past", verse: "Wherefore I say unto thee, Her sins, which are many, are forgiven; for she loved much.", reference: "Luke 7:47" },
    blessures: { label: "My wounds", verse: "He healeth the broken in heart, and bindeth up their wounds.", reference: "Psalm 147:3" },
    restauration: { label: "Everything fell apart", verse: "He restoreth my soul: he leadeth me in the paths of righteousness for his name's sake.", reference: "Psalm 23:3" },
    seul: { label: "I feel alone", verse: "Two are better than one; because they have a good reward for their labour. For if they fall, the one will lift up his fellow.", reference: "Ecclesiastes 4:9-10" },
    couple: { label: "My marriage", verse: "And if one prevail against him, two shall withstand him; and a threefold cord is not quickly broken.", reference: "Ecclesiastes 4:12" },
    identite: { label: "Who I am", verse: "Therefore if any man be in Christ, he is a new creature: old things are passed away; behold, all things are become new.", reference: "2 Corinthians 5:17" },
  } satisfies Record<string, Pick<Journey, "label" | "verse" | "reference">>,
} as const;

export function episodeIn(episode: Episode, lang: Lang): Episode {
  if (lang === "fr") return episode;
  const t = en.episodes[episode.slug as keyof typeof en.episodes];
  return t ? { ...episode, ...t } : episode;
}

export function journeyIn(journey: Journey, lang: Lang): Journey {
  if (lang === "fr") return journey;
  const t = en.journeys[journey.id as keyof typeof en.journeys];
  return t ? { ...journey, ...t } : journey;
}

export const english = en;
