import './App.css'
import { useLayoutEffect } from 'react'
import { RouterProvider } from 'react-router-dom'

import router from '@/router/index'
import { apiSrv, IConfigInit } from '@/libraries/index.libraries'
import { createNotify } from '@/libraries/fwk-react-ui/'


export default function App () {

  const initializate = () => {
    const pl: IConfigInit = {
      info: {
        mockmode: 'false',
      },
      url: process.env.VITE_URL_API as string // Poner la variable de entorno
    }

    apiSrv.init(pl)
  }

  createNotify()
  useLayoutEffect(() => {
    console.log('initializate CONSTRUCTOR')
    initializate()
  }, [])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}
