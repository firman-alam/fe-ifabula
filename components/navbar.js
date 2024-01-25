'use client'

import { AuthContext } from '@/utils/AuthContext'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { useContext } from 'react'

const Nav = () => {
  const { getUser, signout } = useContext(AuthContext)
  const user = getUser()

  const handlesignout = () => {
    signout()
    redirect('/')
  }

  return (
    <nav className='flex justify-between h-14 border-b-2 border-black pl-9 w-full bg-white'>
      {/* Logo or title */}
      <Link href='/' className='flex items-center'>
        <p className='logo_text cursor-pointer'>IFABULA</p>
      </Link>

      {/* menu */}
      {user ? (
        <div className='flex gap-6'>
          <Link href='/books' className='flex items-center'>
            <p className='text-large font-semibold hover:border-b hover:border-black'>
              Books
            </p>
          </Link>
          {user.isAdmin && (
            <>
              <Link href='/transactions' className='flex items-center'>
                <p className='text-large font-semibold hover:border-b hover:border-black'>
                  Transactions
                </p>
              </Link>
              <Link href='/users' className='flex items-center'>
                <p className='text-large font-semibold hover:border-b hover:border-black'>
                  Users
                </p>
              </Link>
            </>
          )}
        </div>
      ) : null}

      {user ? (
        <Link
          href='/'
          className='flex items-center border-l-2 border-black transition-all hover:bg-black hover:text-white'
        >
          <p className='text-xl font-semibold px-4' onClick={handlesignout}>
            Sign Out
          </p>
        </Link>
      ) : (
        <Link
          href='/auth'
          className='flex items-center border-l-2 border-black transition-all hover:bg-black hover:text-white'
        >
          <p className='text-xl font-semibold px-4'>Sign In</p>
        </Link>
      )}
    </nav>
  )
}

export default Nav
