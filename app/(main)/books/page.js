'use client'

import {
  useBorrowBookMutation,
  useGetAllBooksQuery,
  useReturnBookMutation,
} from '@/store/api/bookApi'
import { useGetUserQuery } from '@/store/api/userApi'
import { AuthContext } from '@/utils/AuthContext'
import formatDate from '@/utils/formatDate'
import Image from 'next/image'
import { useContext } from 'react'

const Books = () => {
  const { getUser } = useContext(AuthContext)
  const isAuth = getUser()

  const { data } = useGetAllBooksQuery()
  const { data: user } = useGetUserQuery()
  const [borrowBook] = useBorrowBookMutation()
  const [returnBook] = useReturnBookMutation()

  const handleBorrow = (book_id) => {
    borrowBook({ user_id: user._id, book_id: book_id })
      .unwrap()
      .then((payload) => console.log(payload))
      .catch((err) => console.error(err))
  }

  const handleReturn = (book_id) => {
    returnBook({ user_id: user._id, book_id: book_id })
      .unwrap()
      .then((payload) => console.log(payload))
      .catch((err) => console.error(err))
  }

  return (
    <main className='flex flex-row'>
      {!isAuth && (
        <p className='text-xl font-bold'>
          You must be logged in to view this page
        </p>
      )}

      {isAuth && (
        <>
          <section className='blue_header h-screen'>
            <p className='text-center text-xl font-medium'>Dashboard</p>

            <div className='absolute bottom-2 text-center'>
              <p className='font-semibold'>Al Adiat Firman Alamsyah</p>
            </div>
          </section>
          <section className='px-4 py-10 bg-white w-5/6'>
            <div className='border-black border-2 p-4 m-8 shadow-box bg-paleblue-fir'>
              <p className='text-2xl font-semibold text-center'>
                Selamat datang di Perpustakaan Ifabula!
              </p>
            </div>
            <div className='flex flex-wrap gap-4 p4 m-8 justify-between'>
              {data?.map((d) => (
                <div
                  key={d._id}
                  className='border-black flex-1 border-2 p-4 shadow-box w-full flex flex-wrap flex-row gap-5 justify-between bg-paleblue-fir'
                >
                  <div className='flex flex-col flex-1 justify-between'>
                    <div>
                      <p className='font-bold tx-lg'>{d.title}</p>
                      <p className='font-medium'>{d.author}</p>
                      <p className='font-normal'>Quantity: {d.qty}</p>
                    </div>
                    {user?.borrowedBook?.book == d._id ? (
                      <>
                        <p>
                          Di pinjam tanggal: <br />
                          {formatDate(user?.borrowedBook?.borrowedAt)}
                        </p>
                        <button
                          className='red_btn'
                          onClick={() => handleReturn(d._id)}
                        >
                          Kembalikan
                        </button>
                      </>
                    ) : (
                      <button
                        className='white_btn'
                        onClick={() => handleBorrow(d._id)}
                      >
                        Pinjam
                      </button>
                    )}
                  </div>
                  <Image
                    src={d.image}
                    alt={`cover book - ${d.title}`}
                    width={100}
                    height={350}
                  />
                </div>
              ))}
              {/*  
             
              <div className="border-black border-2 p-4 shadow-box w-full flex flex-col gap-6 bg-paleblue-fir">
                <p className="font-bold tx-lg">Total Akurasi</p>
                <p className="font-medium">{accuracy}%</p>
              </div>
            */}
            </div>
          </section>
        </>
      )}
    </main>
  )
}

export default Books
