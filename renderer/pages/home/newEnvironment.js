import React, { useState } from 'react';
import styles from './newEnvironment.module.css'
import { InsertEnvironment } from '../../../main/db'
import { NewGuid } from '../../../main/helpers/helpers'

export default function NewEnvironment() {
  // const [hasAuthentication, setHasAuthentication] = useState(false);
  const [clusterName, setClusterName] = useState('');
  const [servers, setServers] = useState('');

  const save = () => {
    if (clusterName.trim() === '' || servers.trim() === '') {
      alert('Cluster name and servers cannot be empty');
      return;
    }

    InsertEnvironment({
      id: NewGuid(),
      name: clusterName,
      servers: servers,
    });

    setClusterName('');
    setServers('');
    
    window.location.reload(false);
  }

  return (
    <div className={styles.newEnvironment}>

      <h3>New Environment</h3>

      <div className="row">
        <span className={styles.span}>Name</span>
        <input
          type="text"
          placeholder='Cluster name'
          value={clusterName}
          onChange={e => { setClusterName(e.target.value) }}/>
      </div>

      <div className="row">
        <span className={styles.span}>Servers</span>
        <input
          type="text"
          placeholder="localhost:9092"
          value={servers}
          onChange={e => { setServers(e.target.value) }} />
      </div>

      {/* <div className="row">
        <label >
          <input
            type="checkbox"
            value={hasAuthentication}
            onChange={(e) => {setHasAuthentication(!hasAuthentication)}}
          />
          
          Use Authentication
        </label>
      </div>

      { hasAuthentication && <>
        <div className="row">
          <span className={styles.span} >Password</span>
          <input type="text" name="" id="" placeholder="Password" />
        </div>
        </>
      } */}

      <button onClick={() => save()}>
        Save
      </button>

    </div>
  )
}
