

'use client'
import dynamic from 'next/dynamic'
const ListenerLoading = dynamic(() => import('@/components/loadingPage/ListenerAndPage'), { ssr: false })
import React from 'react'

const Page = () => {
    return (
        <div><ListenerLoading /></div>
    )
}

export default Page