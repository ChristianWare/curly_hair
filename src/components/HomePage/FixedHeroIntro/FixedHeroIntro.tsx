import styles from "./FixedHeroIntro.module.css";
import Nav from "@/components/shared/Nav/Nav";

export default function FixedHeroIntro() {
  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.navContainer}>
            <Nav />
          </div>
          <h1 className={styles.heading}>Marketing that never gives up</h1>
          <div className={styles.btnContainer}></div>
        </div>
        <div className={styles.bottom}></div>
      </div>
    </section>
  );
}
