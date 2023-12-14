import './App.css'
import { useLayoutEffect, useRef } from 'react'
import { RouterProvider } from 'react-router-dom'

import router from '@/router/index'
import { apiSrv, IConfigInit, ui } from '@/libraries/index.libraries'


export default function App () {

  const refHtml = useRef(null)

  const initializateApp = () => {
    const pl: IConfigInit = {
      info: {
        mockmode: 'false',
      },
      url: process.env.VITE_URL_API as string // Poner la variable de entorno
    }

    apiSrv.init(pl)
    ui.initializateLibraryUi(refHtml)
  }

  useLayoutEffect(() => {
    console.log('initializate APP CONSTRUCTOR')
    initializateApp()
  }, [])

  return (
    <>
      <div ref={refHtml}></div>
      <RouterProvider router={router} />
    </>
  )
}
