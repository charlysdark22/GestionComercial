import { 
  UsersIcon, 
  FolderOpenIcon, 
  ShoppingCartIcon, 
  CurrencyDollarIcon,
  TrendingUpIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'

const stats = [
  {
    name: 'Total Clientes',
    value: '2,651',
    change: '+4.75%',
    changeType: 'positive',
    icon: UsersIcon,
  },
  {
    name: 'Proyectos Activos',
    value: '24',
    change: '+54.02%',
    changeType: 'positive',
    icon: FolderOpenIcon,
  },
  {
    name: 'Ventas del Mes',
    value: '$405,091',
    change: '+23.36%',
    changeType: 'positive',
    icon: ShoppingCartIcon,
  },
  {
    name: 'Ingresos Totales',
    value: '$1,245,000',
    change: '+12.48%',
    changeType: 'positive',
    icon: CurrencyDollarIcon,
  },
]

const recentActivities = [
  {
    id: 1,
    type: 'client',
    message: 'Nuevo cliente registrado: Empresa ABC S.A.',
    time: 'Hace 2 horas',
    icon: UsersIcon,
    iconColor: 'text-blue-600',
  },
  {
    id: 2,
    type: 'project',
    message: 'Proyecto "Desarrollo Web" completado al 85%',
    time: 'Hace 4 horas',
    icon: FolderOpenIcon,
    iconColor: 'text-green-600',
  },
  {
    id: 3,
    type: 'sale',
    message: 'Nueva venta por $15,000 - Cliente Premium',
    time: 'Hace 6 horas',
    icon: ShoppingCartIcon,
    iconColor: 'text-purple-600',
  },
  {
    id: 4,
    type: 'reminder',
    message: 'Recordatorio: Reunión con equipo de marketing',
    time: 'Hace 8 horas',
    icon: ClockIcon,
    iconColor: 'text-orange-600',
  },
]

const quickActions = [
  {
    name: 'Nuevo Cliente',
    description: 'Registrar un nuevo cliente',
    href: '/clients',
    icon: UsersIcon,
    color: 'bg-blue-500',
  },
  {
    name: 'Crear Proyecto',
    description: 'Iniciar un nuevo proyecto',
    href: '/projects',
    icon: FolderOpenIcon,
    color: 'bg-green-500',
  },
  {
    name: 'Nueva Venta',
    description: 'Registrar una venta',
    href: '/sales',
    icon: ShoppingCartIcon,
    color: 'bg-purple-500',
  },
  {
    name: 'WhatsApp',
    description: 'Enviar mensaje',
    href: '/whatsapp',
    icon: CheckCircleIcon,
    color: 'bg-green-600',
  },
]

const alerts = [
  {
    id: 1,
    type: 'warning',
    message: '5 productos con stock bajo',
    action: 'Ver inventario',
    href: '/inventory',
  },
  {
    id: 2,
    type: 'info',
    message: '3 contratos vencen esta semana',
    action: 'Revisar contratos',
    href: '/contracts',
  },
  {
    id: 3,
    type: 'success',
    message: 'Backup completado exitosamente',
    action: 'Ver detalles',
    href: '/settings',
  },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Resumen general de tu negocio
        </p>
      </div>

      {/* Estadísticas principales */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <stat.icon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">{stat.value}</div>
                      <div
                        className={classNames(
                          stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600',
                          'ml-2 flex items-baseline text-sm font-semibold'
                        )}
                      >
                        <TrendingUpIcon className="self-center flex-shrink-0 h-4 w-4" aria-hidden="true" />
                        <span className="sr-only">
                          {stat.changeType === 'positive' ? 'Increased' : 'Decreased'} by
                        </span>
                        {stat.change}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Actividades recientes */}
        <div className="lg:col-span-2">
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                Actividad Reciente
              </h3>
              <div className="flow-root">
                <ul className="-mb-8">
                  {recentActivities.map((activity, activityIdx) => (
                    <li key={activity.id}>
                      <div className="relative pb-8">
                        {activityIdx !== recentActivities.length - 1 ? (
                          <span
                            className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                            aria-hidden="true"
                          />
                        ) : null}
                        <div className="relative flex space-x-3">
                          <div>
                            <span className={classNames(
                              'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white',
                              'bg-gray-100'
                            )}>
                              <activity.icon className={classNames('h-4 w-4', activity.iconColor)} />
                            </span>
                          </div>
                          <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                            <div>
                              <p className="text-sm text-gray-900">{activity.message}</p>
                            </div>
                            <div className="text-right text-sm whitespace-nowrap text-gray-500">
                              {activity.time}
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
        </div>

        {/* Acciones rápidas y alertas */}
        <div className="space-y-6">
          {/* Acciones rápidas */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                Acciones Rápidas
              </h3>
              <div className="space-y-3">
                {quickActions.map((action) => (
                  <a
                    key={action.name}
                    href={action.href}
                    className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className={classNames(action.color, 'rounded-lg p-2')}>
                      <action.icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">{action.name}</p>
                      <p className="text-sm text-gray-500">{action.description}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Alertas */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                Alertas
              </h3>
              <div className="space-y-3">
                {alerts.map((alert) => (
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
    </div>
  )
}