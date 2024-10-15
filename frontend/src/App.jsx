import React from 'react'
import {Route,Routes} from 'react-router-dom'
import  Home from './pages/Home.jsx';
import CreateBooks  from './pages/CreateBooks.jsx'
import  EditBooks  from './pages/EditBooks.jsx'
import  DeleteBook  from './pages/DeleteBook.jsx'
import  ShowBook  from './pages/ShowBook.jsx'
import DarkModeToggle from './components/DarkModeToggle.jsx';
const App = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white relative"> {/* Add 'relative' to position the button correctly */}
      <div className="">
        <DarkModeToggle />
        <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/books/create' element={<CreateBooks />} />
      <Route path='/books/edit/:id' element={<EditBooks />} />
      <Route path='/books/delete/:id' element={<DeleteBook />} />
      <Route path='/books/detail/:id' element={<ShowBook />} />
    </Routes>
      </div>
    </div>
    

   
  )
}

export default App

// import React from 'react'
// const App = () => {
//   return (
//     <div>Solra</div>
//   )
// }

// export default App