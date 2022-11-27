import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { GetConsumersGroup, InsertConsumersGroup } from '../../../../../main/db'
import { GetEnvironmentById, GetKafkaBusByEnvironment, NewGuid } from '../../../../../main/helpers/helpers'
import AddConsumer from '../../../../components/addConsumer/addConsumer'
import Consumer from '../../../../components/consumer/consumer'
import styles from './index.module.css'

export default function index() {
    const router = useRouter();
    const { id, topic, consumerGroup } = router.query;
    const [consumers, setConsumers] = useState([]);
    const [topics, setTopics] = useState([]);
    const [servers, setServers] = useState([]);
    const [showModal, setShowModal] = useState(false)
    const [groupName, setGroupName] = useState('')

    const addToConsumers = (x) => {
        setConsumers([...consumers, x]);
    }

    useEffect(() => {
        const environment = GetEnvironmentById(id);

        if (!environment) {
            return;
        }

        setServers(environment.servers.split(','));

        const getTopics = async() => {
            const kafka = GetKafkaBusByEnvironment(environment);
            const admin = kafka.admin();
            setTopics(await admin.listTopics());
        }

        getTopics();
    
    }, [id])

    useEffect(() => {
      const cg = GetConsumersGroup().filter(x => x.id == consumerGroup)[0];

      if (cg === undefined) {
        return;
      }

      setConsumers(cg.consumers);

      console.log(cg)
    }, [consumerGroup])

    const saveConsumersGroup = () => {
        if (groupName === null || groupName === '') {
            alert('Group name is mandatory');
            return;
        }

        if (consumers.length === 0) {
            return
        }

        console.log(GetConsumersGroup());
        
        InsertConsumersGroup({
            name: groupName,
            consumers: consumers,
            id: NewGuid(),
        })

        setGroupName('');
        setShowModal(false);
    }

    return <div className={styles.main}>
        <div className={styles.addConsumer}>
            <AddConsumer
                addConsumer={addToConsumers}
                topics={topics}
                preSelectedTopic={topic}
            />
        </div>

        <div className={styles.consumersContainer}>
            {consumers.map(x =>
                <Consumer
                fromBeginning={x.fromBeginning}
                environmentId={id}
                topic={x.topic}
                groupId={x.id}
                key={x.id}
                />)}
        </div>

        {
            consumers.length &&
            <button
                className={styles.buttonSaveModal}
                onClick={() => { setShowModal(!showModal) }}
            >
                Save
            </button>
        }

        {
            showModal &&
            <div className={styles.modal}>
                
                <span>
                    <button
                        onClick={() => { setShowModal(!showModal) }}
                    >X</button>
                    Group name
                </span>

                <input
                    type="text"
                    placeholder='Group Name'
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                />

                <button
                    className={styles.buttonSave}
                    onClick={() => {saveConsumersGroup()}}
                >save</button>
            </div>
        }
    </div>
}
