import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { GuestPage } from './pages/GuestPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    
     <GuestPage/>
    
    </>
  )
}

export default App
