import './App.css'
import Home from './routes/home/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './routes/dashboard/Dashboard'
import Navbar from './components/navbar/Navbar'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<Dashboard />} path="/dashboard/" />
          <Route element={<Dashboard />} path="/dashboard/:feature" />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
