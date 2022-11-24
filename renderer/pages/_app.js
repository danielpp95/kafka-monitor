import './layout.css'
import styles from "./_app.module.css";

const MyApp = ({ Component, pageProps }) => {
    return <>
      
      <div className={styles.homeTitle} >Kafka Monitor</div>
      <Component {...pageProps} />
    </>
  }

export default MyApp