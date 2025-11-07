import Hero from "@/components/HomePage/Hero/Hero";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main>
      <div className={styles.content}>
        <div className={styles.left}></div>
        <div className={styles.right}>
          <Hero />
          
        </div>
      </div>
    </main>
  );
}
