import React, { useState } from 'react';
import styles from './newEnvironment.module.css'
import { NewGuid } from '../../../main/helpers/helpers'
import ValidationInput from '../../components/input/validationText'
import Select from '../../components/input/select'

export default function NewEnvironment({insertEnvironment}) {
  const [clusterName, setClusterName] = useState('');
  const [servers, setServers] = useState('');
  const [hasAuthentication, setHasAuthentication] = useState(false);
  const [mechanism, setMechanism] = useState('plain');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userNameError, setUserNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [serversError, setserversError] = useState(false);

  const isClusterValid = () => {
    let withError = false;
    
    if (hasAuthentication && userNameError.trim() === '') {
      setUserNameError(true);
      withError = true;
    }

    if (hasAuthentication && password.trim() === '') {
      setPasswordError(true);
      withError = true;
    }

    if (clusterName.trim() === '') {
      setNameError(true);
      withError = true;
    }

    if (servers.trim() === '') {
      setserversError(true);
      withError = true;
    }

    return !withError;
  };

  const resetErrors = () => {
    setUserNameError(false);
    setPasswordError(false);
    setNameError(false);
    setserversError(false);
  }

  const save = () => {
    resetErrors();

    if (!isClusterValid()) {
      return;
    }

    const newEnvironment = {
      id: NewGuid(),
      name: clusterName,
      servers: servers,
    };

    if (hasAuthentication) {
      newEnvironment.mechanism = mechanism;
      newEnvironment.username = username;
      newEnvironment.password = password;
      newEnvironment.useAuthentication = true;
    }

    insertEnvironment(newEnvironment);

    setClusterName('');
    setServers('');
  }

  return (
    <div className={styles.newEnvironment}>

      <h3>New Environment</h3>

      <ValidationInput
        field='Name'
        placeholder='Cluster name'
        value={clusterName}
        onChange={setClusterName}
        hasError={nameError}
      />

      <ValidationInput
        field='Servers'
        placeholder='localhost:9092'
        value={servers}
        onChange={setServers}
        hasError={serversError}
      />

      <div className="row">
        <label >
          <input
            type="checkbox"
            value={hasAuthentication}
            onChange={(e) => {setHasAuthentication(!hasAuthentication)}}
          />
          
          Use Authentication
        </label>
      </div>

      { 
        hasAuthentication &&
        <>
          <Select
            options={['plain', 'scram-sha-256', 'scram-sha-512']}
            onChange={setMechanism}
            value={mechanism}
            useBlankLine={false}
            name='Mechanism'
          />

          <ValidationInput
            field='Username'
            placeholder='Username'
            value={username}
            onChange={setUsername}
            hasError={userNameError}
          />

          <ValidationInput
            field='Password'
            placeholder='Password'
            value={password}
            onChange={setPassword}
            hasError={passwordError}
          />
        </>
      }

      <button onClick={() => save()} className={styles.button}>
        Save
      </button>

    </div>
  )
}
