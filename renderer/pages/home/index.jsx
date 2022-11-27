import React, { useEffect, useState } from 'react'
import styles from './home.module.css'
import NewEnvironment from "./newEnvironment";
import Environments from "./environments";
import Layout from '../../common/layout'
import {
  InsertEnvironment,
  GetEnvironments,
  DeleteEnvironmentById } from '../../../main/db'

export default function index() {
  const [environments, setEnvironments] = useState(null);

  useEffect(() => {
    setEnvironments(GetEnvironments());
  }, [])

  const saveEnvironment = (newEnvironment) => {
    InsertEnvironment(newEnvironment);
    setEnvironments(GetEnvironments());
  }

  const RemoveEnvironmentById = (id) => {
    DeleteEnvironmentById(id)
    setEnvironments(GetEnvironments());
  }

  return (
    <Layout>
    <div className={styles.home}>
        <div className={styles.homeTitle} >Kafka Monitor</div>
        
        <div className={styles.homeSelectEnvironment}>
            <Environments
              environments={environments}
              RemoveEnvironmentById={RemoveEnvironmentById}
            />
        </div>

        <div className={styles.homeNewEnvironment}>    
            <NewEnvironment insertEnvironment={saveEnvironment}/>
        </div>

    </div>

    </Layout>
  )
}
