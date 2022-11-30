import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import styles from './index.module.css'
import Loading from '../../../../components/loading/loading'
import EmptyList from '../../../../components/empty/empty'
import useStorage from '../../../../hooks/useStorage'

export default function index() {
    const router = useRouter()
    const { id } = router.query
    const [consumerGroups, setConsumerGroups] = useStorage('consumerGroups-v1', []);
    
    const deleteConsumerGroup = (e, consumer) => {
        if (e.stopPropagation) e.stopPropagation();

        if (confirm(`Do you want to delete '${consumer.name}'`)) {
            setConsumerGroups(consumerGroups.filter(x => x.name !== consumer.name));
        }
    }

    if(consumerGroups === null) {
        return <Loading />
    }
    
    if (consumerGroups.length === 0) {
        return <EmptyList />
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
