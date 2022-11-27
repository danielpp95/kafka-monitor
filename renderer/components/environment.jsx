import React from 'react'
import styles from './environment.module.css'
import Link from 'next/link'

export default function environment({
  name,
  servers,
  id,
  RemoveEnvironmentById}) {

  const deleteById = (e) => {
    if (e.stopPropagation) e.stopPropagation();
    RemoveEnvironmentById(id);
  }

  return (
    <Link href={`environments/${id}/topics`} >
        <div className={styles.environment}>
            <div>
              <p className={styles.p}>{name}</p>
              <span className={styles.span}>{servers}</span>
            </div>

            <button
              onClick={(e) => deleteById(e)}
              className={styles.button}
              
              >Delete</button>
        </div>
    </Link>
  )
}
