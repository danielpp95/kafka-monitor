import React, { useEffect, useState } from 'react'
import styles from './consumer.module.css'
import { GetKafkaBusByEnvironment } from '../../../main/helpers/helpers';
import useStorage from '../../hooks/useStorage';

export default function consumer({
    topic,
    environmentId,
    fromBeginning,
    groupId}) {
    const [messages, setMessages] = useState([]);
    const [environments, setEnvironments] = useStorage('environments-v1', []);

    useEffect(() => {
        let consumer = null;
        const getMessages = async (setMessage) => {
            const environment = environments?.filter(x => x.id === environmentId)[0];

            if (!environment) {
                return;
            }

            const kafka = GetKafkaBusByEnvironment(environment);

            consumer = kafka.consumer({ groupId });
            await consumer.connect();
            await consumer.subscribe({ topic, fromBeginning });

            await consumer.run({                
                eachMessage: ({ topic, partition, message }) => {
                    let m = message.value.toString();
                    let index = 0;
                    const newArray = [
                        ...messages,
                        {
                            message: m,
                            headers: message.headers,
                            id: index++,
                            key: message.key.toString()
                        }
                    ];
                    messages = newArray
                    setMessage(newArray)
                },
            })
        }

        getMessages(setMessages);

        return () => {
            return consumer?.disconnect();
        }
    }, [environments])
        
  return (
    <div className={styles.main}>
        <h2 className={styles.h2}>{topic}</h2>
        <div className={styles.messages}>
            {
                messages
                    .sort(x => x.id)
                    .reverse()
                    .map((x, index) => {
                        return (                            
                            <div key={index} className={styles.message}>
                                <div className={styles.partitionKey}>
                                    <span className={styles.title}>Key: </span>
                                    <span>{x.key}</span>
                                </div>
                                {
                                    Object.entries(x.headers).map((header, index) => {
                                        return <div key={index}>
                                            <span className={styles.topic}>{header[0]}: </span>
                                            <span className={styles.body}>{header[1].toString()}</span>
                                        </div>
                                    })
                                }
                            </div>
                            )
                    })
            }
        </div>
    </div>
  )
}
