import { useState } from 'react'
import { 
  PlusIcon, 
  MagnifyingGlassIcon,
  FunnelIcon,
  EllipsisVerticalIcon,
  PhoneIcon,
  EnvelopeIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline'
import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'

// Datos de ejemplo
const clients = [
  {
    id: 1,
    name: 'María García',
    email: 'maria.garcia@empresa.com',
    phone: '+34 612 345 678',
    company: 'Empresa ABC S.L.',
    status: 'active',
    tags: ['Premium', 'VIP'],
    lastContact: '2024-01-15',
    totalSales: 45000,
  },
  {
    id: 2,
    name: 'Carlos Rodríguez',
    email: 'carlos.rodriguez@tech.com',
    phone: '+34 687 654 321',
    company: 'Tech Solutions',
    status: 'prospect',
    tags: ['Tecnología'],
    lastContact: '2024-01-12',
    totalSales: 0,
  },
  {
    id: 3,
    name: 'Ana Martínez',
    email: 'ana.martinez@consulting.com',
    phone: '+34 654 987 123',
    company: 'Consulting Group',
    status: 'active',
    tags: ['Consultoría', 'Recurrente'],
    lastContact: '2024-01-10',
    totalSales: 78000,
  },
  {
    id: 4,
    name: 'David López',
    email: 'david.lopez@startup.com',
    phone: '+34 698 765 432',
    company: 'StartUp Innovadora',
    status: 'lead',
    tags: ['Startup', 'Potencial'],
    lastContact: '2024-01-08',
    totalSales: 12000,
  },
]

const statusColors = {
  active: 'bg-green-100 text-green-800',
  prospect: 'bg-yellow-100 text-yellow-800',
  lead: 'bg-blue-100 text-blue-800',
  inactive: 'bg-gray-100 text-gray-800',
}

const statusLabels = {
  active: 'Activo',
  prospect: 'Prospecto',
  lead: 'Lead',
  inactive: 'Inactivo',
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Clients() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.company.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = selectedStatus === 'all' || client.status === selectedStatus
    
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Clientes</h1>
          <p className="mt-1 text-sm text-gray-500">
            Gestiona tu base de datos de clientes
          </p>
        </div>
        <button className="btn-primary">
          <PlusIcon className="h-5 w-5 mr-2" />
          Nuevo Cliente
        </button>
      </div>

      {/* Filtros y búsqueda */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar clientes..."
                className="input pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              className="input"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">Todos los estados</option>
              <option value="active">Activos</option>
              <option value="prospect">Prospectos</option>
              <option value="lead">Leads</option>
              <option value="inactive">Inactivos</option>
            </select>
            <button className="btn-outline">
              <FunnelIcon className="h-5 w-5 mr-2" />
              Filtros
            </button>
          </div>
        </div>
      </div>

      {/* Lista de clientes */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <div className="grid grid-cols-1 gap-4">
            {filteredClients.map((client) => (
              <div
                key={client.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                          <span className="text-sm font-medium text-gray-700">
                            {client.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <h3 className="text-lg font-medium text-gray-900 truncate">
                            {client.name}
                          </h3>
                          <span
                            className={classNames(
                              'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                              statusColors[client.status as keyof typeof statusColors]
                            )}
                          >
                            {statusLabels[client.status as keyof typeof statusLabels]}
                          </span>
                        </div>
                        <div className="flex items-center space-x-4 mt-1">
                          <div className="flex items-center text-sm text-gray-500">
                            <EnvelopeIcon className="h-4 w-4 mr-1" />
                            {client.email}
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <PhoneIcon className="h-4 w-4 mr-1" />
                            {client.phone}
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <BuildingOfficeIcon className="h-4 w-4 mr-1" />
                            {client.company}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 mt-2">
                          {client.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">
                        €{client.totalSales.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-500">
                        Último contacto: {new Date(client.lastContact).toLocaleDateString('es-ES')}
                      </div>
                    </div>
                    
                    <Menu as="div" className="relative">
                      <Menu.Button className="p-2 rounded-full hover:bg-gray-100">
                        <EllipsisVerticalIcon className="h-5 w-5 text-gray-400" />
                      </Menu.Button>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700'
                                )}
                              >
                                Ver detalles
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700'
                                )}
                              >
                                Editar
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700'
                                )}
                              >
                                Enviar WhatsApp
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700'
                                )}
                              >
                                Crear proyecto
                              </a>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredClients.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-500">
                No se encontraron clientes que coincidan con los filtros.
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Paginación */}
      <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 rounded-lg shadow">
        <div className="flex-1 flex justify-between sm:hidden">
          <a
            href="#"
            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Anterior
          </a>
          <a
            href="#"
            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Siguiente
          </a>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Mostrando <span className="font-medium">1</span> a <span className="font-medium">{filteredClients.length}</span> de{' '}
              <span className="font-medium">{clients.length}</span> resultados
            </p>
          </div>
          <div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <a
                href="#"
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                Anterior
              </a>
              <a
                href="#"
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                1
              </a>
              <a
                href="#"
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                Siguiente
              </a>
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
}