
'use client'
import dynamic from 'next/dynamic'
 
const NoSSR = dynamic(() => import('../Components/CartContainer'), { ssr: false })


export default function Cart() {


    return (
       <NoSSR />
    )
}