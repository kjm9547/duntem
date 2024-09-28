import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { GuestPage } from './pages/render/GuestPage'
import { RootRoutes } from './routes/RootRoutes'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <RootRoutes/>
    </>
  )
}

export default App
