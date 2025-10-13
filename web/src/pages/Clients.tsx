import { useState } from 'react'
import { 
  PlusIcon, 
  EyeIcon,
  PencilIcon,
  TrashIcon,
  ChatBubbleLeftRightIcon,
  DocumentDuplicateIcon,
  PhoneIcon,
  EnvelopeIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline'
import { DataTable, Column } from '@shared/components/DataTable'
import { Modal, ConfirmModal } from '@shared/components/Modal'
import { DynamicForm, FormField } from '@shared/components/Form'
import { Client, ClientStatus } from '@shared/types'
import toast from 'react-hot-toast'

// Datos de ejemplo expandidos
const initialClients: Client[] = [
  {
    id: '1',
    name: 'María García López',
    email: 'maria.garcia@empresaabc.com',
    phone: '+34 612 345 678',
    company: 'Empresa ABC S.L.',
    address: {
      street: 'Calle Mayor 123',
      city: 'Madrid',
      state: 'Madrid',
      country: 'España',
      zipCode: '28001'
    },
    status: ClientStatus.ACTIVE,
    tags: ['Premium', 'VIP', 'Tecnología'],
    notes: 'Cliente muy importante, requiere atención personalizada',
    assignedTo: '1',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20'),
  },
  {
    id: '2',
    name: 'Carlos Rodríguez Martín',
    email: 'carlos.rodriguez@techsolutions.com',
    phone: '+34 687 654 321',
    company: 'Tech Solutions España',
    address: {
      street: 'Avenida Tecnología 45',
      city: 'Barcelona',
      state: 'Cataluña',
      country: 'España',
      zipCode: '08001'
    },
    status: ClientStatus.PROSPECT,
    tags: ['Tecnología', 'Startup'],
    notes: 'Interesado en servicios de desarrollo web',
    assignedTo: '1',
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-18'),
  },
  {
    id: '3',
    name: 'Ana Martínez Sánchez',
    email: 'ana.martinez@consultinggroup.es',
    phone: '+34 654 987 123',
    company: 'Consulting Group Internacional',
    address: {
      street: 'Plaza Consultoría 8',
      city: 'Valencia',
      state: 'Valencia',
      country: 'España',
      zipCode: '46001'
    },
    status: ClientStatus.ACTIVE,
    tags: ['Consultoría', 'Recurrente', 'Internacional'],
    notes: 'Cliente de larga duración, contratos anuales',
    assignedTo: '1',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-22'),
  },
  {
    id: '4',
    name: 'David López Fernández',
    email: 'david.lopez@startupinnovadora.com',
    phone: '+34 698 765 432',
    company: 'StartUp Innovadora S.L.',
    address: {
      street: 'Calle Innovación 12',
      city: 'Sevilla',
      state: 'Andalucía',
      country: 'España',
      zipCode: '41001'
    },
    status: ClientStatus.LEAD,
    tags: ['Startup', 'Potencial', 'Joven'],
    notes: 'Startup emergente con gran potencial de crecimiento',
    assignedTo: '1',
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-01-19'),
  },
  {
    id: '5',
    name: 'Elena Ruiz Torres',
    email: 'elena.ruiz@comercialmediterraneo.es',
    phone: '+34 612 888 999',
    company: 'Comercial Mediterráneo',
    status: ClientStatus.INACTIVE,
    tags: ['Comercio', 'Mediterráneo'],
    notes: 'Cliente inactivo desde hace 6 meses',
    assignedTo: '1',
    createdAt: new Date('2023-12-01'),
    updatedAt: new Date('2023-12-15'),
  },
];

const statusColors = {
  [ClientStatus.ACTIVE]: 'bg-green-100 text-green-800',
  [ClientStatus.PROSPECT]: 'bg-yellow-100 text-yellow-800',
  [ClientStatus.LEAD]: 'bg-blue-100 text-blue-800',
  [ClientStatus.INACTIVE]: 'bg-gray-100 text-gray-800',
}

const statusLabels = {
  [ClientStatus.ACTIVE]: 'Activo',
  [ClientStatus.PROSPECT]: 'Prospecto',
  [ClientStatus.LEAD]: 'Lead',
  [ClientStatus.INACTIVE]: 'Inactivo',
}

// Campos del formulario de cliente
const clientFormFields: FormField<Partial<Client>>[] = [
  {
    name: 'name',
    label: 'Nombre completo',
    type: 'text',
    required: true,
    placeholder: 'Ej: María García López',
  },
  {
    name: 'email',
    label: 'Correo electrónico',
    type: 'email',
    required: true,
    placeholder: 'maria@empresa.com',
  },
  {
    name: 'phone',
    label: 'Teléfono',
    type: 'tel',
    placeholder: '+34 612 345 678',
  },
  {
    name: 'company',
    label: 'Empresa',
    type: 'text',
    placeholder: 'Nombre de la empresa',
  },
  {
    name: 'status',
    label: 'Estado',
    type: 'select',
    required: true,
    options: [
      { value: ClientStatus.ACTIVE, label: 'Activo' },
      { value: ClientStatus.PROSPECT, label: 'Prospecto' },
      { value: ClientStatus.LEAD, label: 'Lead' },
      { value: ClientStatus.INACTIVE, label: 'Inactivo' },
    ],
  },
  {
    name: 'notes',
    label: 'Notas',
    type: 'textarea',
    placeholder: 'Información adicional sobre el cliente...',
  },
];

export default function Clients() {
  const [clients, setClients] = useState<Client[]>(initialClients)
  const [selectedClients, setSelectedClients] = useState<React.Key[]>([])
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [currentClient, setCurrentClient] = useState<Client | null>(null)
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: initialClients.length,
  })

  // Definir columnas de la tabla
  const columns: Column<Client>[] = [
    {
      key: 'name',
      title: 'Nombre',
      sortable: true,
      render: (value, record) => (
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
              <span className="text-sm font-medium text-gray-700">
                {record.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
          </div>
          <div>
            <div className="text-sm font-medium text-gray-900">{record.name}</div>
            <div className="text-sm text-gray-500">{record.company}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'email',
      title: 'Contacto',
      render: (value, record) => (
        <div className="space-y-1">
          <div className="flex items-center text-sm text-gray-900">
            <EnvelopeIcon className="h-4 w-4 mr-2 text-gray-400" />
            {record.email}
          </div>
          {record.phone && (
            <div className="flex items-center text-sm text-gray-500">
              <PhoneIcon className="h-4 w-4 mr-2 text-gray-400" />
              {record.phone}
            </div>
          )}
        </div>
      ),
    },
    {
      key: 'status',
      title: 'Estado',
      sortable: true,
      render: (value) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[value as ClientStatus]}`}>
          {statusLabels[value as ClientStatus]}
        </span>
      ),
    },
    {
      key: 'tags',
      title: 'Etiquetas',
      render: (value) => (
        <div className="flex flex-wrap gap-1">
          {(value as string[])?.slice(0, 2).map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800"
            >
              {tag}
            </span>
          ))}
          {(value as string[])?.length > 2 && (
            <span className="text-xs text-gray-500">+{(value as string[]).length - 2} más</span>
          )}
        </div>
      ),
    },
    {
      key: 'createdAt',
      title: 'Fecha de registro',
      sortable: true,
      render: (value) => new Date(value).toLocaleDateString('es-ES'),
    },
    {
      key: 'id',
      title: 'Acciones',
      width: '120px',
      render: (value, record) => (
        <div className="flex space-x-2">
          <button
            onClick={() => handleViewClient(record)}
            className="text-blue-600 hover:text-blue-900"
            title="Ver detalles"
          >
            <EyeIcon className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleEditClient(record)}
            className="text-green-600 hover:text-green-900"
            title="Editar"
          >
            <PencilIcon className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleDeleteClient(record)}
            className="text-red-600 hover:text-red-900"
            title="Eliminar"
          >
            <TrashIcon className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleWhatsAppClient(record)}
            className="text-green-600 hover:text-green-900"
            title="WhatsApp"
          >
            <ChatBubbleLeftRightIcon className="h-4 w-4" />
          </button>
        </div>
      ),
    },
  ]

  // Handlers
  const handleCreateClient = async (data: Partial<Client>) => {
    try {
      const newClient: Client = {
        ...data as Client,
        id: Date.now().toString(),
        assignedTo: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
        tags: data.tags || [],
      }
      
      setClients([newClient, ...clients])
      setPagination(prev => ({ ...prev, total: prev.total + 1 }))
      setIsCreateModalOpen(false)
      toast.success('Cliente creado exitosamente')
    } catch (error) {
      toast.error('Error al crear cliente')
    }
  }

  const handleEditClient = (client: Client) => {
    setCurrentClient(client)
    setIsEditModalOpen(true)
  }

  const handleUpdateClient = async (data: Partial<Client>) => {
    try {
      if (!currentClient) return
      
      const updatedClient = {
        ...currentClient,
        ...data,
        updatedAt: new Date(),
      }
      
      setClients(clients.map(c => c.id === currentClient.id ? updatedClient : c))
      setIsEditModalOpen(false)
      setCurrentClient(null)
      toast.success('Cliente actualizado exitosamente')
    } catch (error) {
      toast.error('Error al actualizar cliente')
    }
  }

  const handleViewClient = (client: Client) => {
    setCurrentClient(client)
    setIsViewModalOpen(true)
  }

  const handleDeleteClient = (client: Client) => {
    setCurrentClient(client)
    setIsDeleteModalOpen(true)
  }

  const confirmDeleteClient = () => {
    if (!currentClient) return
    
    setClients(clients.filter(c => c.id !== currentClient.id))
    setPagination(prev => ({ ...prev, total: prev.total - 1 }))
    setCurrentClient(null)
    toast.success('Cliente eliminado exitosamente')
  }

  const handleWhatsAppClient = (client: Client) => {
    if (client.phone) {
      const message = encodeURIComponent(`Hola ${client.name}, ¿cómo estás?`)
      const phoneNumber = client.phone.replace(/[^\d]/g, '')
      window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank')
    } else {
      toast.error('Este cliente no tiene número de teléfono')
    }
  }

  const handleBulkDelete = () => {
    if (selectedClients.length === 0) return
    
    setClients(clients.filter(c => !selectedClients.includes(c.id)))
    setPagination(prev => ({ ...prev, total: prev.total - selectedClients.length }))
    setSelectedClients([])
    toast.success(`${selectedClients.length} clientes eliminados`)
  }

  const handleExportSelected = () => {
    const selectedData = clients.filter(c => selectedClients.includes(c.id))
    const csv = [
      'Nombre,Email,Teléfono,Empresa,Estado,Fecha de registro',
      ...selectedData.map(c => 
        `"${c.name}","${c.email}","${c.phone || ''}","${c.company || ''}","${statusLabels[c.status]}","${c.createdAt.toLocaleDateString('es-ES')}"`
      )
    ].join('\n')
    
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'clientes-seleccionados.csv'
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Clientes</h1>
          <p className="mt-1 text-sm text-gray-500">
            Gestiona tu base de datos de clientes ({clients.length} total)
          </p>
        </div>
        <div className="flex space-x-3">
          {selectedClients.length > 0 && (
            <>
              <button
                onClick={handleExportSelected}
                className="btn-outline"
              >
                <DocumentDuplicateIcon className="h-5 w-5 mr-2" />
                Exportar ({selectedClients.length})
              </button>
              <button
                onClick={handleBulkDelete}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                <TrashIcon className="h-5 w-5 mr-2" />
                Eliminar ({selectedClients.length})
              </button>
            </>
          )}
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="btn-primary"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Nuevo Cliente
          </button>
        </div>
      </div>

      {/* Tabla de clientes */}
      <DataTable
        data={clients}
        columns={columns}
        pagination={{
          ...pagination,
          onChange: (page, pageSize) => setPagination(prev => ({ ...prev, current: page, pageSize }))
        }}
        rowSelection={{
          selectedRowKeys: selectedClients,
          onChange: (keys) => setSelectedClients(keys)
        }}
        onRowClick={handleViewClient}
        searchable
        exportable
      />

      {/* Modal de crear cliente */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Crear Nuevo Cliente"
        size="lg"
      >
        <DynamicForm
          fields={clientFormFields}
          onSubmit={handleCreateClient}
          submitText="Crear Cliente"
          onCancel={() => setIsCreateModalOpen(false)}
          columns={2}
        />
      </Modal>

      {/* Modal de editar cliente */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Editar Cliente"
        size="lg"
      >
        {currentClient && (
          <DynamicForm
            fields={clientFormFields}
            onSubmit={handleUpdateClient}
            defaultValues={currentClient}
            submitText="Actualizar Cliente"
            onCancel={() => setIsEditModalOpen(false)}
            columns={2}
          />
        )}
      </Modal>

      {/* Modal de ver cliente */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="Detalles del Cliente"
        size="lg"
      >
        {currentClient && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Información Personal</h3>
                <dl className="space-y-3">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Nombre</dt>
                    <dd className="text-sm text-gray-900">{currentClient.name}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Email</dt>
                    <dd className="text-sm text-gray-900">{currentClient.email}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Teléfono</dt>
                    <dd className="text-sm text-gray-900">{currentClient.phone || 'No especificado'}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Empresa</dt>
                    <dd className="text-sm text-gray-900">{currentClient.company || 'No especificado'}</dd>
                  </div>
                </dl>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Información Adicional</h3>
                <dl className="space-y-3">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Estado</dt>
                    <dd>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[currentClient.status]}`}>
                        {statusLabels[currentClient.status]}
                      </span>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Etiquetas</dt>
                    <dd className="flex flex-wrap gap-1">
                      {currentClient.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800"
                        >
                          {tag}
                        </span>
                      ))}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Fecha de registro</dt>
                    <dd className="text-sm text-gray-900">{currentClient.createdAt.toLocaleDateString('es-ES')}</dd>
                  </div>
                </dl>
              </div>
            </div>
            
            {currentClient.address && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Dirección</h3>
                <p className="text-sm text-gray-900">
                  {currentClient.address.street}<br />
                  {currentClient.address.city}, {currentClient.address.state}<br />
                  {currentClient.address.zipCode}, {currentClient.address.country}
                </p>
              </div>
            )}
            
            {currentClient.notes && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Notas</h3>
                <p className="text-sm text-gray-900">{currentClient.notes}</p>
              </div>
            )}
          </div>
        )}
      </Modal>

      {/* Modal de confirmación de eliminación */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDeleteClient}
        title="Eliminar Cliente"
        message={`¿Estás seguro de que deseas eliminar a ${currentClient?.name}? Esta acción no se puede deshacer.`}
        confirmText="Eliminar"
        type="danger"
      />
    </div>
  )
}