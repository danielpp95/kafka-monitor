import React from 'react'
import styles from './home.module.css'
import NewEnvironment from "./newEnvironment";
import Environments from "./environments";
import Layout from '../../common/layout'

export default function index() {
  return (
    <Layout>
    <div className={styles.home}>
        <div className={styles.homeTitle} >Kafka Monitor</div>
        
        <div className={styles.homeSelectEnvironment}>
            <Environments/>
        </div>

        <div className={styles.homeNewEnvironment}>    
            <NewEnvironment/>
        </div>

    </div>

    </Layout>
  )
}
