import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { GetEnvironmentById, GetKafkaBusByEnvironment } from '../../../../../main/helpers/helpers'
import Topic from '../../../../components/topic/topic.jsx';

import styles from './topic.module.css'

export default function index() {
    const router = useRouter();
    const { id } = router.query;
    const [filter, setFilter] = useState('');

    const [topics, setTopics] = useState(null)
    
    useEffect(() => {
        const getTopics = async () => {
            const environment = GetEnvironmentById(id);

            if (!environment) {
                return;
            }

            const kafka = GetKafkaBusByEnvironment(environment);
            const admin = kafka.admin();

            const topicList = await admin.listTopics();
            const topicsMetadata = await admin.fetchTopicMetadata(topicList);
            
            setTopics(topicsMetadata.topics);

            return () => {
                admin.disconnect()
                kafka.disconnect()
            }
      }

      getTopics();
    }, [id])
    
    if (topics === null) {
        return <h2>Loading...</h2>
    }

    return (
        <div>
            <h2 className={styles.title}>Topics</h2>

            <div className={styles.filterBox}>
                <input type="text"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    placeholder='Filter'
                    className={styles.filter}
                />

            </div>
            {
                topics.filter(x => x.name.includes(filter)).map(topic => {
                    return <Topic
                        name={topic.name}
                        partitionList={topic.partitions}
                        key={topic.name}
                        environmentId={id}
                    />
                })
            }
        </div>
    )
}
