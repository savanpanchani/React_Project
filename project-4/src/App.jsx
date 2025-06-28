import { useState } from 'react'
import './App.css'
import UserRewiew from './Components/UserReview'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <UserRewiew/>
    </>
  )
}

export default App