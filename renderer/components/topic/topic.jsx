import React from 'react'
import styles from './topic.module.css'
import Link from 'next/link'

export default function topic({name, partitionList = [], environmentId}) {
  return (
    <Link href={`/environments/${environmentId}/consumer?topic=${name}`}>
        <div className={styles.main}>
            <p className={styles.topic}>{name}</p>
            <p>Partitions: {partitionList.length}</p>
        </div>
    </Link>
  )
}
