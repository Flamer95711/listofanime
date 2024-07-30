import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Popular from './component/popular'
import './index.css'
import Anime from './component/singleAnime'
import { useCustom } from './context/context'
import Home from './component/home'
import Character from './component/character'

function App() {
  // const global=useCustom()
  // console.log(global);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/anime/:id" element={<Anime />}></Route>
        <Route path="/character/:id" element={<Character/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
