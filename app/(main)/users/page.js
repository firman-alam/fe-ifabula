'use client'

import { useGetAllBooksQuery } from '@/store/api/bookApi'
import { AuthContext } from '@/utils/AuthContext'
import formatDate from '@/utils/formatDate'
import Image from 'next/image'
import { useContext, useMemo } from 'react'
import { MaterialReactTable } from 'material-react-table'
import { useGetUsersQuery } from '@/store/api/userApi'

const Users = () => {
  const { getUser } = useContext(AuthContext)
  const isAuth = getUser()

  const { data: users } = useGetUsersQuery()

  const columns = useMemo(
    () => [
      { accessorKey: 'email', header: 'email' },
      {
        accessorKey: 'isAdmin',
        header: 'admin',
        Cell: (params) => {
          if (params.row.original.isAdmin) {
            return 'Ya'
          }
          return 'Tidak'
        },
      },
    ],
    [users]
  )

  return (
    <main className='flex flex-row'>
      {!isAuth && (
        <p className='text-xl font-bold'>
          You must be logged in to view this page
        </p>
      )}
      {isAuth && (
        <section className='flex flex-wrap-reverse'>
          <section className='green_header h-screen'>
            <p className='text-center text-xl font-medium'>Daftar anggota</p>

            <div className='absolute bottom-2 text-center'>
              <p className='font-semibold'>Al Adiat Firman Alamsyah</p>
            </div>
          </section>
          <section className='px-4 py-10 bg-white w-5/6 overflow-auto h-screen'>
            <div className='border-black border-2 p-4 m-8 shadow-box bg-green-fir'>
              <p className='text-2xl font-semibold text-center'>
                Daftar anggota di Perpustakaan Ifabula!
              </p>
            </div>
            <MaterialReactTable
              columns={columns}
              data={users || []}
              enableColumnFilters={false}
              enableColumnActions={false}
              enableDensityToggle={false}
              enableFullScreenToggle={false}
              enableHiding={false}
              muiTableProps={{
                sx: {
                  tableLayout: 'fixed',
                  border: '1px solid black',
                  overflow: 'scroll',
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

export default Users
