import React from 'react'
import styles from './home.module.css'
import NewEnvironment from "./newEnvironment";
import Layout from '../../common/layout'

export default function index() {
  return (
    <Layout>
    <div className={styles.home}>
        <div className={styles.homeTitle} >Kafka Monitor</div>
        
        <div className={styles.homeSelectEnvironment}>
            Select Environment
        </div>

        <div className={styles.homeNewEnvironment}>    
            <NewEnvironment/>
        </div>

    </div>

    </Layout>
  )
}
