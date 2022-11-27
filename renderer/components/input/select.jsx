import React, { useState } from 'react'
import styles from './select.module.css'

export default function select({
    options = [],
    onChange,
    value,
    useBlankLine = true,
    name,
}) {
    const [showOptions, setShowOptions] = useState(false);
    const [filter, setFilter] = useState('')

    const toggleOptions = () => {
        setShowOptions(!showOptions);
    }

    const setValue = (newValue) => {
        onChange(newValue);
        toggleOptions();
    }

    const buttonValue = <div className={styles.value}>
        <button onClick={() => toggleOptions()}>
            <div>
                {value}
                <p>▼</p>
            </div>
        </button>
    </div>

    const search = <div className={styles.search}>
        <input
            type="text"
            className={styles.searchInput}
            placeholder='Search'
            onChange={e => setFilter(e.target.value)}
        />
    </div>

    const selectOptions = <div className={styles.options}>
        {
            useBlankLine && <button
                className={value === '' ? styles.optionSelected : styles.option}
                onClick={() => setValue('')}
            ></button>
        }
        {
            options.filter(x => x.includes(filter)).map(x => (
                <button
                    className={value === x ? styles.optionSelected : styles.option}
                    onClick={() => setValue(x)}
                >
                    {x}
                </button>
            ))
        }
    </div>

    return (
        <div className={styles.main}>
            {name}
            <div className={styles.select}>
                {buttonValue}

                {showOptions && search}
                
                {showOptions && selectOptions}
            </div>
        </div>
    )
}
