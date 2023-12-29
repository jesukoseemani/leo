import React from 'react'
import AppRoutes from './routes/AppRoutes'
import Modal from './components/modal/Modal'
import { useSelector } from 'react-redux'
import ToastSort from './components/toast/ToastSort'
import './app.scss'

function App() {
  const { toasts, position } = useSelector((state) => state.toast)
  return (
    <>
      <AppRoutes />
      <ToastSort data={toasts} position={position} />
      <Modal />
    </>
  )
}

export default App