import React, { useState, Suspense } from 'react'
import Navbar from './components/Navbar/Navbar.jsx'
import MainContainer from './components/MainContainer/MainContainer.jsx'
import './App.css'

export const TabKey = {
  Home: "Home",
  Work: "Work",
  Blog: "Blog",
  Contact: "Contact",
}

function App() {
  const [activeTab, setActiveTab] = useState(TabKey.Home);

  return (
    <div className='App'>
      <Navbar setActiveTab={setActiveTab} />
      <MainContainer activeTab={activeTab}/>
      
    </div>
  )
}

export default App
