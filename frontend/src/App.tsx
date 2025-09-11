import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import DesktopXl from "../pages/Signup"

function App() {
 

  return (
    <BrowserRouter>
    <Routes>
   <Route path='/landing' element={<DesktopXl/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App



