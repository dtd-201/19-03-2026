import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashbord from './pages/Dashbord'
import FormLogin from './pages/FormLogin'
import MainLayout from './layouts/MainLayout'
import StudenMangerment from './pages/StudentManagerment'

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element = {<FormLogin/>}/>
        <Route path='/' element = {<MainLayout/>}>
          <Route path='dashbord' element = {<Dashbord/>}/>
          <Route path='students' element = {<StudenMangerment/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
