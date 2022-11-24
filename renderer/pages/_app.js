import './layout.css'
import styles from "./_app.module.css";
import Link from 'next/link'
import { useRouter } from 'next/router'

const MyApp = ({ Component, pageProps }) => {
  
  const router = useRouter()
  const { id } = router.query

    return <>
      
      <div className={styles.homeTitle} >
        <Link href={'/home'}>
          <div className={styles.link}>Kafka Monitor</div>
        </Link>

        <Link href={`/environments/${id}/topics`}>
          <div className={styles.link}>Topics</div>
        </Link>

        <Link href={`/environments/${id}/consumerGroups`}>
          <div className={styles.link}>Consumer Groups</div>
        </Link>
      </div>
      
      <Component {...pageProps} />
    </>
  }

export default MyApp