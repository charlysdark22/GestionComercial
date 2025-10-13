import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Toaster } from 'react-hot-toast'
import Layout from './layouts/Layout'
import Dashboard from './pages/Dashboard'
import Clients from './pages/Clients'
import Projects from './pages/Projects'
import Sales from './pages/Sales'
import Leads from './pages/Leads'
import Calendar from './pages/Calendar'
import WhatsApp from './pages/WhatsApp'
import Inventory from './pages/Inventory'
import Expenses from './pages/Expenses'
import Contracts from './pages/Contracts'
import Assets from './pages/Assets'
import Employees from './pages/Employees'
import Invoicing from './pages/Invoicing'
import Marketing from './pages/Marketing'
import Manufacturing from './pages/Manufacturing'
import Accounting from './pages/Accounting'
import RealEstate from './pages/RealEstate'
import Chat from './pages/Chat'
import Reminders from './pages/Reminders'
import Settings from './pages/Settings'
import Login from './pages/Login'
import { AuthProvider } from './hooks/useAuth'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Layout />}>
                <Route index element={<Dashboard />} />
                <Route path="clients" element={<Clients />} />
                <Route path="projects" element={<Projects />} />
                <Route path="sales" element={<Sales />} />
                <Route path="leads" element={<Leads />} />
                <Route path="calendar" element={<Calendar />} />
                <Route path="whatsapp" element={<WhatsApp />} />
                <Route path="inventory" element={<Inventory />} />
                <Route path="expenses" element={<Expenses />} />
                <Route path="contracts" element={<Contracts />} />
                <Route path="assets" element={<Assets />} />
                <Route path="employees" element={<Employees />} />
                <Route path="invoicing" element={<Invoicing />} />
                <Route path="marketing" element={<Marketing />} />
                <Route path="manufacturing" element={<Manufacturing />} />
                <Route path="accounting" element={<Accounting />} />
                <Route path="real-estate" element={<RealEstate />} />
                <Route path="chat" element={<Chat />} />
                <Route path="reminders" element={<Reminders />} />
                <Route path="settings" element={<Settings />} />
              </Route>
            </Routes>
            <Toaster 
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
              }}
            />
          </div>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App