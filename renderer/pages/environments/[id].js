import React from 'react'
import { useRouter } from 'next/router'
import styles from './index.module.css'

export default function id() {
  const router = useRouter()
  const { id } = router.query

  return (
    <div className={styles.main}>{id}</div>
  )
}
