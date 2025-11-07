import Hero from "@/components/HomePage/Hero/Hero";
import styles from "./page.module.css";
import FixedHeroIntro from "@/components/HomePage/FixedHeroIntro/FixedHeroIntro";

export default function Home() {
  return (
    <main>
      <div className={styles.content}>
        <div className={styles.left}>
          <FixedHeroIntro />
        </div>
        <div className={styles.right}>
          <Hero />
          lorem3000
        </div>
      </div>
    </main>
  );
}
