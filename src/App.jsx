// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import { Button } from './components/ui/button'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//      <button
//       className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//     >
//       hello
//     </button>
//       <Button>hello</Button>
//     </>
//   )
// }

// export default App
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from './components/ui/button'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

    <div className=" bg-blue-500 flex flex-col items-center justify-center min-h-screen py-2">
     <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      hello
    </button>
    
      <Button>hello</Button>
    </div>
    </>
  )
}

export default App
