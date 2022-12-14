import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import styles from './index.module.css'
import Loading from '../../../../components/loading/loading'
import EmptyList from '../../../../components/empty/empty'
import { GetKafkaBusByEnvironment } from '../../../../../main/helpers/helpers';
import useStorage from '../../../../hooks/useStorage'

export default function index() {
  const router = useRouter()
  const { id } = router.query
  const [groups, setGroups] = useState(null);
  const [servers, setServers] = useState('');
  const [kafkaAdmin, setKafkaAdmin] = useState(null);
  const [environments, setEnvironments] = useStorage('environments-v1', []);

  useEffect(() => {
    const environment = environments?.filter(x => x.id === id)[0];

    if (!environment) {
      return;
    }

    setServers(environment.servers);
  
    const getTopics = async() => {
      const kafka = GetKafkaBusByEnvironment(environment);
      const admin = kafka.admin();
      setKafkaAdmin(admin);
      var groups = await admin.listGroups();
      setGroups(groups.groups);
    }

    getTopics()
  }, [environments])
  
  const deleteConsumer = async (consumer) => {
    try {
      if (confirm(`Do you want to delete '${consumer.groupId}'`)) {
        await kafkaAdmin.deleteGroups([consumer.groupId]);

        var groups = await kafkaAdmin.listGroups();
        setGroups(groups.groups);
      }
    } catch (error) {
      console.error(error)
    }
  }

  if (groups === null) {
    return <Loading />
  }

  if (groups.length === 0) {
    return <EmptyList />
  }

  return (
    <div className={styles.main}>
      <h3>Consumers {servers}</h3>
      {
        groups.map(x => <div key={x.groupId} className={styles.consumer}>
          <p>{x.groupId}</p>
          <button onClick={() => deleteConsumer(x)}>Delete</button>
        </div>)
      }
    </div>
  )
}
