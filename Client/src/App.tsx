import './App.css'
import { useLayoutEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import { apiSrv } from './utils/apiSrv'
import { IConfigInit } from './utils/apiSrv/interface/IConfigInit'

export default function App() {

  const initializate = () => {
    const pl: IConfigInit = {
      info: {
        authorization: '',
        mockmode: 'false',
        userid: ''
      },
      url: process.env.VITE_URL_API as string // Poner la variable de entorno
    }
    apiSrv.init(pl)
  } 

  useLayoutEffect(() => {
    // console.log('initializate CONSTRUCTOR')
    initializate()
  }, [])

  return (<RouterProvider router={router} />)
}
