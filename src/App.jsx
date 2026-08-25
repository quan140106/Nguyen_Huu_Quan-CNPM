import { useState } from 'react'

import './App.css'


import Sidebar from './components/Sidebar'
import Header from './components/Header'

import ManagerDashboard from './pages/ManagerDashboard'
import Orders from './pages/Orders'
import Tables from './pages/Tables'
import Menu from './pages/Menu'
import Inventory from './pages/Inventory'
import Kitchen from './pages/Kitchen'
import Payment from './pages/Payment'
import Reports from './pages/Reports'
import Settings from './pages/Settings'
function App() {

  const [activePage, setActivePage] = useState('dashboard')

  const renderPage = () => {

    switch (activePage) {

      case 'dashboard':
        return <ManagerDashboard />

      case 'orders':
        return <Orders />

      case 'tables':
        return <Tables />
      case 'menu':
        return <Menu />
      case 'inventory':
        return <Inventory />
      case 'kitchen':
        return <Kitchen />
      case 'payment':
        return <Payment />
      case 'reports':
        return <Reports />
      case 'settings':
        return <Settings />

      default:
        return <ManagerDashboard />
    }
  }

  return (
    <div className="app">

      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
      />

      <main className="main">

        <Header />

        {renderPage()}

      </main>

    </div>
  )
}

export default App