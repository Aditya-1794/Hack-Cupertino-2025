// App.jsx
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import OurMission from './pages/OurMission';
import SavedCrafts from "./pages/SavedCrafts"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/OurMission" element={<OurMission />} />
        <Route path='/SavedCrafts' element={<SavedCrafts />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
