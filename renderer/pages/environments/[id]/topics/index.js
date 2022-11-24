import React from 'react'
import { useRouter } from 'next/router'

export default function index() {
    const router = useRouter()
    const { id } = router.query

  return (
    <div>topics {id}</div>
  )
}
