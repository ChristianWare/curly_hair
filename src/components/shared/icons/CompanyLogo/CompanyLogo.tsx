import LogoRotate from '../LogoRotate/LogoRotate'
import styles from './CompanyLogo.module.css' 
 
 export default function CompanyLogo() {
   return (
     <div className={styles.logoContainer}>
        <LogoRotate className={styles.logo} />
     </div>
   )
 }