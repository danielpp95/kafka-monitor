import React, { useEffect, useState } from 'react'
import { NewGuid } from '../../../../../main/helpers/helpers'
import { Kafka } from 'kafkajs';
import styles from './consumer.module.css'
export default function consumer({
    topic,
    servers,
    fromBeginning,
    groupId}) {
    const [messages, setMessages] = useState([])

    useEffect(() => {
        const getMessages = async (setMessage) => {
            const kafka = new Kafka({
                clientId: 'kafka-monitor',
                brokers: servers,
            })
    
            const consumer = kafka.consumer({ groupId /*`test-group-${NewGuid()}`*/ });
            await consumer.connect();
            await consumer.subscribe({ topic, fromBeginning })

            await consumer.run({                
                eachMessage: ({ topic, partition, message }) => {
                    let m = message.value.toString();
                    let index = 0;
                    const newArray = [...messages, {
                        message: m,
                        headers: message.headers,
                        id: index++
                    }]
                    messages = newArray
                    setMessage(newArray)
                },
            })
        }

        getMessages(setMessages);
    
    }, [])
        
  return (
    <div className={styles.main}>
        <h2 className={styles.h2}>{topic}</h2>
        <div className={styles.messages}>
            {
                messages
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
