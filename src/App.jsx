import { useState, useEffect } from 'react'
import './App.css'
import { IntercomProvider } from 'react-use-intercom'
import IntercomComponent from './components/IntercomComponent'

function App() {
  return (
    <IntercomProvider appId={import.meta.env.VITE_INTERCOM_APP_ID}>
      <div className="App">
        <IntercomComponent />
      </div>
    </IntercomProvider>
  )
}

export default App 