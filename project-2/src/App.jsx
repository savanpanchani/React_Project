import { useState } from 'react'
import './App.css'
import Counter from './assets/Components/Counter'


function App() {
  const [count, setCount] = useState()

  return (
    <div>
      <Counter />
    </div>
  )
}

export default App