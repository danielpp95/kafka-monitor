import React from 'react';
import styles from './validationText.module.css'

export default function validationText({
    field,
    placeholder,
    value,
    onChange,
    hasError = false
}) {
  return (
    <div>
        {
            hasError &&
                <p className={styles.error}>
                    {field} is required
                </p>
        }
        <div className={styles.flex}>
            <span className={styles.span}>{field}</span>
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={e => { onChange(e.target.value) }}
            />
        </div>
        
    </div>
  )
}
