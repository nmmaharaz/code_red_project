import Link from 'next/link'
import React from 'react'


export default function HomeLeft() {
  return (
    <div className="hidden md:block sticky top-0 ">
      <Link href="/community " className='btn bg-red-400'>Community</Link>
    </div>
  )
}
