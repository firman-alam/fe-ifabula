'use client'

import { AuthContext } from '@/utils/AuthContext'
import Link from 'next/link'
import { useContext } from 'react'

export default function Home() {
  const { getUser } = useContext(AuthContext)
  const isAuth = getUser()

  return (
    <section className='w-full flex h-screen'>
      <div className='w-1/2 text-center bg-green-fir pt-14 flex flex-col justify-center'>
        <p className='text-justify font-medium mb-5 text-3xl font-mabry_pro p-6'>
          APLIKASI PERPUSTAKAAN - TES IFABULA
        </p>
      </div>
      <div className='border-r-2 border-black' />
      <div className='w-1/2 text-center bg-white pt-14 flex flex-col justify-center gap-8'>
        <p className='text-center text-2xl font-medium'>
          Al Adiat Firman Alamsyah
        </p>

        {isAuth && (
          <Link href='/books' className='flex justify-center'>
            <button className='mt-16 black_btn cursor-pointer'>
              back to books page
            </button>
          </Link>
        )}
      </div>
    </section>
  )
}
