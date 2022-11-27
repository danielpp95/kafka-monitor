import React, { useState, useEffect } from 'react';
import styles from './environments.module.css'
import { GetEnvironments } from '../../../main/db'
import Environment from '../../components/environment.jsx'

export default function NewEnvironment() {
    const [environments, setEnvironments] = useState([]);

    useEffect(() => {
        const storedEnvironments = GetEnvironments();
        setEnvironments(storedEnvironments);
    }, [])

  return (
    <div className={styles.environments}>
        <h4>Environments</h4>
        {
            environments.map(x => {
                return <Environment
                    key={x.id}
                    id={x.id}
                    name={x.name}
                    servers={x.servers} />
            })
        }

    </div>
  )
}
