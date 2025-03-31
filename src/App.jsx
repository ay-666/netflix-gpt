import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <h2 className="text-3xl text-red-400 bg " >App configured with Tailwind CSS.</h2>
    <h2 >App configured with Tailwind CSS.</h2>
    <h2 >App configured with Tailwind CSS.</h2>
    </>
  )
}

export default App
