import Image from "next/image";
import Link from "next/link";
import { designs } from "@/designs/registry";
import styles from "./_hub/hub.module.css";

/** Page de présentation au client : les trois directions, côte à côte. */
export default function Home() {
  return (
    <main className={styles.hub}>
      <h1>The Encounter — trois directions</h1>
      <p className={styles.lead}>
        Même contenu, mêmes photos du dossier client, trois univers différents : un magazine éditorial, un film en clair-obscur, une campagne d&apos;affiches. Chaque proposition est une
        page d&apos;accueil complète, mobile compris.
      </p>
      <ol className={styles.list}>
        {designs.map((d) => (
          <li key={d.id}>
            <Link href={d.href} className={styles.card}>
              <span className={styles.img}>
                <Image src={d.preview.src} alt={d.preview.alt} fill sizes="(max-width: 760px) 100vw, 33vw" style={{ objectFit: "cover" }} />
              </span>
              <p className={styles.genre}>{d.genre}</p>
              <h2>{d.name}</h2>
              <p>{d.idea}</p>
              <p className={styles.meta}>{d.mood}</p>
              <p className={styles.meta}>{d.typography}</p>
              <p className={styles.meta}>Références : {d.references}</p>
            </Link>
          </li>
        ))}
      </ol>
    </main>
  );
}
