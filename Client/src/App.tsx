import './App.css'
import { useLayoutEffect } from 'react'
import { RouterProvider } from 'react-router-dom'

import router from '@/router/index'
import { apiSrv, IConfigInit } from '@/utils/index.utils'
import { showPopupSpinnerAlert } from '@/components/SpinnerPopup';

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
    apiSrv.setShowPopupSpinnerAlertFn(showPopupSpinnerAlert)
  } 

  useLayoutEffect(() => {
    // console.log('initializate CONSTRUCTOR')
    initializate()
  }, [])

  return (<RouterProvider router={router} />)
}
