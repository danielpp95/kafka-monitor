import React from 'react'
import styles from './home.module.css'
import NewEnvironment from "./newEnvironment";
import Environments from "./environments";
import Layout from '../../common/layout'
import useStorage from '../../hooks/useStorage';

export default function index() {
  const [environments, setEnvironments] = useStorage('environments-v1', []);

  const saveEnvironment = (newEnvironment) => {
    setEnvironments([...environments, newEnvironment]);
  }

  const RemoveEnvironmentById = (id) => {
    setEnvironments(environments.filter(x => x.id !== id));
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
