import Button from "@/components/shared/Button/Button";
import styles from "./FixedHeroIntro.module.css";
import Nav from "@/components/shared/Nav/Nav";
import LogoRotate from "@/components/shared/icons/LogoRotate/LogoRotate";

export default function FixedHeroIntro() {
  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.navContainer}>
            <Nav />
          </div>
          <h1 className={styles.heading}>
            Curls that thrive <br /> in the desert
          </h1>
          <div className={styles.btnContainer}>
            <Button btnType='black' text='Book your curl session' />
            <Button btnType='whiteOutline' text='About us' />
          </div>
        </div>
        <div className={styles.bottom}>
          <div className={styles.bottomTop}>
            <h2 className={styles.subheading}>Recent Story</h2>
            <Button btnType='noOutlineBlack' text='Explore' chevron />
          </div>

          <div className={styles.logoContainer}>
            <LogoRotate className={styles.logo} />
          </div>
          {/* <p className={styles.copy}>
            At Copper & Coil Curl Studio, we specialize exclusively in wavy,
            curly, and coily hair. From Type 2 waves to Type 4 coils, we cut,
            cleanse, and style with techniques and products designed for our
            Sonoran climate—so your curls look defined on day one and healthy on
            day ninety-one.
          </p> */}
        </div>
      </div>
    </section>
  );
}
