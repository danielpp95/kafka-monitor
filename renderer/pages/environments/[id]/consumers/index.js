import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { GetEnvironments } from '../../../../../main/db'
import { Kafka } from 'kafkajs';
import styles from './index.module.css'
import Loading from '../../../../components/loading/loading'
import EmptyList from '../../../../components/empty/empty'

export default function index() {
  const router = useRouter()
  const { id } = router.query
  const [groups, setGroups] = useState(null);
  const [servers, setServers] = useState('');
  const [kafkaAdmin, setKafkaAdmin] = useState(null);

  useEffect(() => {
    const environment = GetEnvironments()
        .filter(x => x.id === id)[0];

    if (!environment) {
        return;
    }

    const getTopics = async() => {
        const kafka = new Kafka({
            clientId: 'kafka-monitor',
            brokers: environment.servers.split(',')
        });

        setServers(environment.servers)

        const admin = kafka.admin()
        setKafkaAdmin(admin);

        var groups = await admin.listGroups();
        setGroups(groups.groups);
    }

    
    getTopics()
  }, [id])
  
  const deleteConsumerById = async (id) => {
    try {
      await kafkaAdmin.deleteGroups([id]);
    } catch (error) {
      console.error(error)
    }
    window.location.reload(false);
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
          <button onClick={() => deleteConsumerById(x.groupId)}>Delete</button>
        </div>)
      }
    </div>
  )
}
