'use client'

import { AuthContext } from '@/utils/AuthContext'
import formatDate from '@/utils/formatDate'
import Image from 'next/image'
import { useContext, useMemo } from 'react'
import { MaterialReactTable } from 'material-react-table'
import { useGetAllTransactionsQuery } from '@/store/api/transactionApi'

const Transactions = () => {
  const { getUser } = useContext(AuthContext)
  const isAuth = getUser()

  const { data } = useGetAllTransactionsQuery()

  const columns = useMemo(
    () => [
      { accessorKey: 'book.title', header: 'judul' },
      { accessorKey: 'book.author', header: 'penulis' },
      { accessorKey: 'user.email', header: 'peminjam' },
      { accessorKey: 'action', header: 'kegiatan', size: 120 },
      {
        accessorKey: 'dueDate',
        header: 'tenggat pengembalian',
        Cell: (params) => {
          return formatDate(params.row.original.dueDate)
        },
      },
      {
        accessorKey: 'returnDate',
        header: 'tanggal pengembalian',
        Cell: (params) => {
          if (params.row.original.returnDate == null) {
            return
          }

          return formatDate(params.row.original.returnDate)
        },
      },
    ],
    [data]
  )

  return (
    <main className='flex flex-row'>
      {!isAuth && (
        <p className='text-xl font-bold'>
          You must be logged in to view this page
        </p>
      )}
      {isAuth && (
        <section className='flex'>
          <section className='orange_header h-screen'>
            <p className='text-center text-xl font-medium'>
              Transaksi Peminjaman
            </p>

            <div className='absolute bottom-2 text-center'>
              <p className='font-semibold'>Al Adiat Firman Alamsyah</p>
            </div>
          </section>
          <section className='px-4 py-4 bg-white w-5/6 overflow-auto h-screen'>
            <div className='border-black border-2 p-4 m-8 shadow-box bg-orange-fir'>
              <p className='text-2xl font-semibold text-center'>
                Daftar peminjaman buku di Perpustakaan Ifabula!
              </p>
            </div>

            <MaterialReactTable
              columns={columns}
              data={data || []}
              enableColumnFilters={false}
              enableColumnActions={false}
              enableDensityToggle={false}
              enableFullScreenToggle={false}
              enableHiding={false}
              muiTableProps={{
                sx: {
                  tableLayout: 'fixed',
                  border: '1px solid black',
                },
              }}
              muiTableBodyCellProps={{
                sx: {
                  border: '1px solid black',
                },
              }}
              muiTableHeadCellProps={{
                sx: {
                  border: '1px solid black',
                },
              }}
              muiTableFooterCellProps={{
                sx: {
                  border: '1px solid black',
                },
              }}
            />
          </section>
        </section>
      )}
    </main>
  )
}

export default Transactions
