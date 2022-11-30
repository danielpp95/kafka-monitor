import React from 'react';
import styles from './environments.module.css'
import Environment from '../../components/environment.jsx'
import Loading from '../../components/loading/loading.jsx'
import Empty from '../../components/empty/empty'

export default function NewEnvironment({
    environments = [],
    RemoveEnvironmentById}) {
    if (environments === null) {
        return <div className={styles.environments}>
        <h4>Environments</h4>
            <Loading />
        </div>
    }
    
    if (environments.length === 0) {
        return  <div className={styles.environments}>
            <h4>Environments</h4>
            <Empty />
        </div>
    }

    if (environments === {}) {
        return  <div className={styles.environments}>
            <h4>Environments</h4>
            <Empty />
        </div>
    }

    return (
        <div className={styles.environments}>
            <h4>Environments</h4>
            {
                environments.map(x => {
                    return <Environment
                        key={x.id}
                        id={x.id}
                        name={x.name}
                        servers={x.servers}
                        RemoveEnvironmentById={RemoveEnvironmentById}/>
                })
            }

        </div>
    )
}
