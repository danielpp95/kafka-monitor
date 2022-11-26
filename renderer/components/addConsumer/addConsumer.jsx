import React, { useEffect, useState } from 'react'
import styles from './addConsumer.module.css'
import { NewGuid } from '../../../main/helpers/helpers'

export default function addConsumer({topics, addConsumer, preSelectedTopic}) {
    const [selectedTopic, setSelectedTopic] = useState(preSelectedTopic ?? '');
    const [consumeFromBeginning, setConsumeFromBeginning] = useState(false)

    const handleAddConsumer = () => {
        addConsumer({
            topic: selectedTopic,
            fromBeginning: consumeFromBeginning,
            id: `Kafka-monitor-consumer-${NewGuid()}`
        })
    }

    useEffect(() => {
        setSelectedTopic(preSelectedTopic)
    }, [preSelectedTopic])

    return (
        <div className={styles.main}>
            <h2 className={styles.h2}>Add consumer</h2>          
            <div className={styles.row}>
                <span>Topic</span>
                <select onChange={(x) => setSelectedTopic(x.target.value)} value={selectedTopic}>
                    <option value={''}>{''}</option>
                    {
                        topics.map(x => <option value={x} key={x}>{x}</option>)
                    }
                </select>
            </div>

            <div className={styles.row}>
                <label >
                <input
                    type="checkbox"
                    value={consumeFromBeginning}
                    onChange={(e) => {setConsumeFromBeginning(!consumeFromBeginning)}}
                />
                
                    Consume from beginning
                </label>
            </div>

            <div className={styles.buttonContainer}>
                <button
                    className={styles.button}
                    onClick={() => handleAddConsumer()}
                >Add Consumer</button>
            </div>
        </div>
    )
}
