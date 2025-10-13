import { useState } from 'react'
import { 
  UsersIcon, 
  FolderOpenIcon, 
  ShoppingCartIcon, 
  CurrencyDollarIcon,
  TrendingUpIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  EyeIcon,
  CalendarIcon,
  ChartBarIcon,
  BanknotesIcon,
  BuildingOfficeIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline'
import { CustomBarChart, CustomPieChart, CustomLineChart, MetricCard } from '@shared/components/Charts'

// Datos para gráficos
const salesData = [
  { month: 'Ene', ventas: 45000, gastos: 32000, beneficio: 13000 },
  { month: 'Feb', ventas: 52000, gastos: 35000, beneficio: 17000 },
  { month: 'Mar', ventas: 48000, gastos: 33000, beneficio: 15000 },
  { month: 'Abr', ventas: 61000, gastos: 38000, beneficio: 23000 },
  { month: 'May', ventas: 55000, gastos: 36000, beneficio: 19000 },
  { month: 'Jun', ventas: 67000, gastos: 41000, beneficio: 26000 },
]

const clientDistribution = [
  { name: 'Activos', value: 156, color: '#10b981' },
  { name: 'Prospectos', value: 89, color: '#f59e0b' },
  { name: 'Leads', value: 45, color: '#3b82f6' },
  { name: 'Inactivos', value: 23, color: '#6b7280' },
]

const projectsByStatus = [
  { name: 'Completados', value: 24, color: '#10b981' },
  { name: 'En Progreso', value: 18, color: '#3b82f6' },
  { name: 'En Pausa', value: 8, color: '#f59e0b' },
  { name: 'Planificación', value: 12, color: '#8b5cf6' },
]

const revenueData = [
  { month: 'Ene', ingresos: 45000, proyectos: 8 },
  { month: 'Feb', ingresos: 52000, proyectos: 12 },
  { month: 'Mar', ingresos: 48000, proyectos: 10 },
  { month: 'Abr', ingresos: 61000, proyectos: 15 },
  { month: 'May', ingresos: 55000, proyectos: 13 },
  { month: 'Jun', ingresos: 67000, proyectos: 18 },
]

const topClients = [
  { name: 'Empresa ABC S.L.', revenue: 45000, projects: 5, status: 'active' },
  { name: 'Tech Solutions', revenue: 38000, projects: 3, status: 'active' },
  { name: 'Consulting Group', revenue: 32000, projects: 4, status: 'active' },
  { name: 'StartUp Innovadora', revenue: 28000, projects: 2, status: 'prospect' },
  { name: 'Comercial Med.', revenue: 22000, projects: 3, status: 'active' },
]

const recentActivities = [
  {
    id: 1,
    type: 'client',
    message: 'Nuevo cliente registrado: Empresa XYZ S.A.',
    time: 'Hace 15 minutos',
    icon: UsersIcon,
    iconColor: 'text-blue-600',
    bgColor: 'bg-blue-100',
  },
  {
    id: 2,
    type: 'project',
    message: 'Proyecto "App Móvil" completado al 90%',
    time: 'Hace 1 hora',
    icon: FolderOpenIcon,
    iconColor: 'text-green-600',
    bgColor: 'bg-green-100',
  },
  {
    id: 3,
    type: 'sale',
    message: 'Nueva venta por €25,000 - Cliente Premium',
    time: 'Hace 2 horas',
    icon: ShoppingCartIcon,
    iconColor: 'text-purple-600',
    bgColor: 'bg-purple-100',
  },
  {
    id: 4,
    type: 'whatsapp',
    message: '5 mensajes nuevos de WhatsApp',
    time: 'Hace 3 horas',
    icon: CheckCircleIcon,
    iconColor: 'text-green-600',
    bgColor: 'bg-green-100',
  },
  {
    id: 5,
    type: 'reminder',
    message: 'Recordatorio: Reunión con equipo de marketing',
    time: 'Hace 4 horas',
    icon: ClockIcon,
    iconColor: 'text-orange-600',
    bgColor: 'bg-orange-100',
  },
]

const upcomingEvents = [
  {
    id: 1,
    title: 'Reunión con Cliente ABC',
    time: '10:00 AM',
    date: 'Hoy',
    type: 'meeting',
  },
  {
    id: 2,
    title: 'Entrega Proyecto Web',
    time: '2:00 PM',
    date: 'Mañana',
    type: 'deadline',
  },
  {
    id: 3,
    title: 'Llamada con Proveedor',
    time: '11:30 AM',
    date: '15 Oct',
    type: 'call',
  },
]

const alerts = [
  {
    id: 1,
    type: 'warning',
    message: '5 productos con stock bajo',
    action: 'Ver inventario',
    href: '/inventory',
    priority: 'high',
  },
  {
    id: 2,
    type: 'info',
    message: '3 contratos vencen esta semana',
    action: 'Revisar contratos',
    href: '/contracts',
    priority: 'medium',
  },
  {
    id: 3,
    type: 'success',
    message: 'Backup completado exitosamente',
    action: 'Ver detalles',
    href: '/settings',
    priority: 'low',
  },
  {
    id: 4,
    type: 'warning',
    message: '2 facturas pendientes de cobro',
    action: 'Ver facturas',
    href: '/invoicing',
    priority: 'high',
  },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Dashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('6m')

  const periods = [
    { value: '7d', label: '7 días' },
    { value: '1m', label: '1 mes' },
    { value: '3m', label: '3 meses' },
    { value: '6m', label: '6 meses' },
    { value: '1y', label: '1 año' },
  ]

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            Resumen general de tu negocio
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="input"
          >
            {periods.map((period) => (
              <option key={period.value} value={period.value}>
                {period.label}
              </option>
            ))}
          </select>
          
          <button className="btn-primary">
            <EyeIcon className="h-5 w-5 mr-2" />
            Ver Reporte Completo
          </button>
        </div>
      </div>

      {/* Métricas principales */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Clientes"
          value="2,651"
          change={{ value: 4.75, type: 'increase' }}
          icon={<UsersIcon className="h-6 w-6" />}
          color="blue"
        />
        <MetricCard
          title="Proyectos Activos"
          value="24"
          change={{ value: 12.5, type: 'increase' }}
          icon={<FolderOpenIcon className="h-6 w-6" />}
          color="green"
        />
        <MetricCard
          title="Ventas del Mes"
          value="€67,000"
          change={{ value: 8.2, type: 'increase' }}
          icon={<ShoppingCartIcon className="h-6 w-6" />}
          color="purple"
        />
        <MetricCard
          title="Ingresos Totales"
          value="€1,245,000"
          change={{ value: 15.3, type: 'increase' }}
          icon={<CurrencyDollarIcon className="h-6 w-6" />}
          color="yellow"
        />
      </div>

      {/* Gráficos principales */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de ventas */}
        <div className="bg-white p-6 rounded-lg shadow">
          <CustomBarChart
            data={salesData}
            xKey="month"
            yKeys={['ventas', 'gastos', 'beneficio']}
            title="Análisis Financiero (Últimos 6 meses)"
            height={300}
          />
        </div>

        {/* Distribución de clientes */}
        <div className="bg-white p-6 rounded-lg shadow">
          <CustomPieChart
            data={clientDistribution}
            title="Distribución de Clientes"
            height={300}
          />
        </div>
      </div>

      {/* Segunda fila de gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tendencia de ingresos */}
        <div className="bg-white p-6 rounded-lg shadow">
          <CustomLineChart
            data={revenueData}
            xKey="month"
            yKeys={['ingresos']}
            title="Tendencia de Ingresos"
            height={300}
          />
        </div>

        {/* Estado de proyectos */}
        <div className="bg-white p-6 rounded-lg shadow">
          <CustomPieChart
            data={projectsByStatus}
            title="Estado de Proyectos"
            height={300}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top clientes */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              Top Clientes
            </h3>
            <div className="space-y-4">
              {topClients.map((client, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-xs font-medium text-gray-600">
                          {index + 1}
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {client.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {client.projects} proyectos
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-green-600">
                      €{client.revenue.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Actividades recientes */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              Actividad Reciente
            </h3>
            <div className="flow-root">
              <ul className="-mb-8">
                {recentActivities.slice(0, 5).map((activity, activityIdx) => (
                  <li key={activity.id}>
                    <div className="relative pb-8">
                      {activityIdx !== recentActivities.slice(0, 5).length - 1 ? (
                        <span
                          className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                          aria-hidden="true"
                        />
                      ) : null}
                      <div className="relative flex space-x-3">
                        <div>
                          <span className={classNames(
                            'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white',
                            activity.bgColor
                          )}>
                            <activity.icon className={classNames('h-4 w-4', activity.iconColor)} />
                          </span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <div>
                            <p className="text-sm text-gray-900">{activity.message}</p>
                            <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Próximos eventos y alertas */}
        <div className="space-y-6">
          {/* Próximos eventos */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                Próximos Eventos
              </h3>
              <div className="space-y-3">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <CalendarIcon className="h-5 w-5 text-blue-500" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{event.title}</p>
                      <p className="text-xs text-gray-500">{event.date} - {event.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Alertas */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                Alertas Importantes
              </h3>
              <div className="space-y-3">
                {alerts.filter(alert => alert.priority === 'high').map((alert) => (
                  <div
                    key={alert.id}
                    className={classNames(
                      'p-3 rounded-lg border-l-4',
                      alert.type === 'warning' ? 'bg-yellow-50 border-yellow-400' : '',
                      alert.type === 'info' ? 'bg-blue-50 border-blue-400' : '',
                      alert.type === 'success' ? 'bg-green-50 border-green-400' : ''
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <ExclamationTriangleIcon 
                          className={classNames(
                            'h-5 w-5 mr-2',
                            alert.type === 'warning' ? 'text-yellow-600' : '',
                            alert.type === 'info' ? 'text-blue-600' : '',
                            alert.type === 'success' ? 'text-green-600' : ''
                          )}
                        />
                        <p className="text-sm text-gray-900">{alert.message}</p>
                      </div>
                      <a
                        href={alert.href}
                        className="text-sm font-medium text-primary-600 hover:text-primary-500"
                      >
                        {alert.action}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Métricas adicionales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <BanknotesIcon className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Beneficio Neto</p>
              <p className="text-2xl font-semibold text-gray-900">€26,000</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <ChartBarIcon className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Tasa Conversión</p>
              <p className="text-2xl font-semibold text-gray-900">24.5%</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <BuildingOfficeIcon className="h-8 w-8 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Empresas Activas</p>
              <p className="text-2xl font-semibold text-gray-900">156</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <DocumentTextIcon className="h-8 w-8 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Contratos Activos</p>
              <p className="text-2xl font-semibold text-gray-900">42</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}