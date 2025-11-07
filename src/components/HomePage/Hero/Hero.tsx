import LayoutWrapper from "@/components/shared/LayoutWrapper";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.container}>
      <LayoutWrapper>
        <div className={styles.content}>
            <h1 className={styles.title}>Welcome to Our Website</h1>
        </div>
      </LayoutWrapper>
    </section>
  );
}
