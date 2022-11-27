import React, { useEffect, useState } from 'react'
import styles from './consumer.module.css'
import { GetEnvironmentById, GetKafkaBusByEnvironment } from '../../../main/helpers/helpers';
export default function consumer({
    topic,
    environmentId,
    fromBeginning,
    groupId}) {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        let consumer = null;
        const getMessages = async (setMessage) => {
            const environment = GetEnvironmentById(environmentId);

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
                            id: index++
                        }
                    ];
                    messages = newArray
                    setMessage(newArray)
                },
            })
        }
        
        getMessages(setMessages);
        
        return () => {
            return consumer.disconnect();
        }
    }, [])
        
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
                                <p className={styles.topic}>{x.headers['Message-Type']?.toString()}</p>
                                <p className={styles.body} >{x.message}</p>
                            </div>
                            )
                    })
            }
        </div>
    </div>
  )
}
