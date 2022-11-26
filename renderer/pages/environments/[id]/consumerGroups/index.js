import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { DeleteConsumerGroupById, GetConsumersGroup } from '../../../../../main/db'
import styles from './index.module.css'

export default function index() {
    const router = useRouter()
    const { id } = router.query
    const [consumerGroups, setConsumerGroups] = useState(null)

    useEffect(() => {
      setConsumerGroups(GetConsumersGroup());
    }, [id])
    
    const deleteConsumerGroup = (e, consumer) => {
        if (e.stopPropagation) e.stopPropagation();

        if (confirm(`Do you want to delete '${consumer.name}'`)) {
            DeleteConsumerGroupById(consumer.id);
            window.location.reload(false);
        }
    }

    if(consumerGroups === null) {
        return <div>Loading...</div>
    }
    
    if (consumerGroups.length === 0) {
        return <div>Nothing to show</div>
    }

    return (
        <div className={styles.main}>
            {
                consumerGroups.map(x => {
                    return <Link key={x.id} href={`/environments/${id}/consumer?consumerGroup=${x.id}`}>
                        <div  className={styles.consumer}>
                            {x.name}
                            <button
                                onClick={(e) => deleteConsumerGroup(e, x)}
                            >Delete</button>
                        </div>
                    </Link>
                })
            }
        </div>
    )
}
