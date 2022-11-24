import React from 'react'
import styles from './environment.module.css'
import Link from 'next/link'
import { DeleteEnvironmentById } from '../../main/db'

export default function environment({name, servers, id}) {

  const deleteById = (e) => {
    if (e.stopPropagation) e.stopPropagation();
    DeleteEnvironmentById(id);
    window.location.reload(false);
  }

  return (
    <Link href={`environments/${id}`} >
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
