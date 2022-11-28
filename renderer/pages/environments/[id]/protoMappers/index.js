import React, { useEffect, useState } from 'react';
import styles from './index.module.css';
import {message1, message2} from './templateMessage'
import { BuildProtoFileFromCSharp } from './helper.js'

export default function index() {
  const [input, setInput] = useState(message2);
  const [output, setOutput] = useState('');
  const [error, setError] = useState('')
  
  useEffect(() => {
    setError('')

    try {
      setOutput(BuildProtoFileFromCSharp(input))
    } catch (error) {
      setError('Message with invalid format')
    }
  }, [input])

  return (
    <div className={styles.main}>
      <p>{error}</p>
        <div className={styles.areas}>
          <textarea
            className={styles.input}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            spellCheck="false"
            >
          </textarea>

          <textarea
            className={styles.input}
            value={output}
            onChange={(e) => setOutput(e.target.value)}
            spellCheck="false"
            >
          </textarea>
        </div>
    </div>
  )
}
