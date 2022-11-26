import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { Kafka } from 'kafkajs';
import { GetEnvironments } from '../../../../../main/db'
import { NewGuid } from '../../../../../main/helpers/helpers'
import AddConsumer from './addConsumer'
import Consumer from './consumer'
import styles from './index.module.css'

export default function index() {
    const router = useRouter();
    const { id, topic } = router.query;
    const [consumers, setConsumers] = useState([]);
    const [topics, setTopics] = useState([]);
    const [servers, setServers] = useState([]);
    const [groupId, setGroupId] = useState('');

    const addToConsumers = (x) => {
        setConsumers([...consumers, x]);
    }

    useEffect(() => {
        const environment = GetEnvironments()
            .filter(x => x.id === id)[0];

        if (!environment) {
            return;
        }

        setGroupId(`kafka-monitor-${NewGuid()}`);

        setServers(environment.servers.split(','))

        const getTopics = async() => {
            const kafka = new Kafka({
                clientId: 'kafka-monitor',
                brokers: environment.servers.split(',')
            });
    
            const admin = kafka.admin()
            setTopics(await admin.listTopics());
        }

        getTopics()
    
    }, [id])

    return <div className="main">
        <AddConsumer
            addConsumer={addToConsumers}
            topics={topics}
        />
        {consumers.map(x =>
            <Consumer
                fromBeginning={x.fromBeginning}
                groupId={groupId}
                servers={servers}
                topic={x.topic}
                key={x.id}
            />)}
    </div>
}
