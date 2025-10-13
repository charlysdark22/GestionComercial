import { useState, useEffect } from 'react'
import { 
  PaperAirplaneIcon,
  PhotoIcon,
  DocumentIcon,
  PhoneIcon,
  VideoCameraIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  EllipsisVerticalIcon
} from '@heroicons/react/24/outline'
import { whatsappService, WhatsAppConversation, WhatsAppMessage, WhatsAppTemplate } from '../services/whatsappService'
import { Modal } from '@shared/components/Modal'
import { DynamicForm, FormField } from '@shared/components/Form'
import toast from 'react-hot-toast'

// Datos de ejemplo para demostración
const mockConversations: WhatsAppConversation[] = [
  {
    id: '1',
    contactName: 'María García',
    contactPhone: '+34612345678',
    lastMessage: 'Perfecto, quedamos así entonces',
    lastMessageTime: new Date(Date.now() - 300000), // 5 min ago
    unreadCount: 2,
    messages: [],
  },
  {
    id: '2',
    contactName: 'Carlos Rodríguez',
    contactPhone: '+34687654321',
    lastMessage: 'Gracias por la información',
    lastMessageTime: new Date(Date.now() - 3600000), // 1 hour ago
    unreadCount: 0,
    messages: [],
  },
  {
    id: '3',
    contactName: 'Ana Martínez',
    contactPhone: '+34654987123',
    lastMessage: 'Nos vemos mañana en la oficina',
    lastMessageTime: new Date(Date.now() - 7200000), // 2 hours ago
    unreadCount: 1,
    messages: [],
  },
]

const mockMessages: WhatsAppMessage[] = [
  {
    id: '1',
    from: '+34612345678',
    to: '123456789',
    message: 'Hola, ¿cómo va el proyecto?',
    timestamp: new Date(Date.now() - 1800000),
    type: 'text',
    status: 'delivered',
  },
  {
    id: '2',
    from: '123456789',
    to: '+34612345678',
    message: 'Hola María, el proyecto va muy bien. Estamos al 75% de completado.',
    timestamp: new Date(Date.now() - 1500000),
    type: 'text',
    status: 'read',
  },
  {
    id: '3',
    from: '+34612345678',
    to: '123456789',
    message: 'Excelente, ¿cuándo estará listo?',
    timestamp: new Date(Date.now() - 900000),
    type: 'text',
    status: 'delivered',
  },
  {
    id: '4',
    from: '123456789',
    to: '+34612345678',
    message: 'Estimamos que estará listo la próxima semana.',
    timestamp: new Date(Date.now() - 600000),
    type: 'text',
    status: 'read',
  },
  {
    id: '5',
    from: '+34612345678',
    to: '123456789',
    message: 'Perfecto, quedamos así entonces',
    timestamp: new Date(Date.now() - 300000),
    type: 'text',
    status: 'delivered',
  },
]

const messageFormFields: FormField<any>[] = [
  {
    name: 'to',
    label: 'Número de teléfono',
    type: 'tel',
    required: true,
    placeholder: '+34 612 345 678',
  },
  {
    name: 'message',
    label: 'Mensaje',
    type: 'textarea',
    required: true,
    placeholder: 'Escribe tu mensaje aquí...',
  },
]

const templateFormFields: FormField<any>[] = [
  {
    name: 'to',
    label: 'Número de teléfono',
    type: 'tel',
    required: true,
    placeholder: '+34 612 345 678',
  },
  {
    name: 'template',
    label: 'Plantilla',
    type: 'select',
    required: true,
    options: [
      { value: 'bienvenida_cliente', label: 'Bienvenida Cliente' },
      { value: 'recordatorio_reunion', label: 'Recordatorio Reunión' },
      { value: 'seguimiento_proyecto', label: 'Seguimiento Proyecto' },
    ],
  },
  {
    name: 'variables',
    label: 'Variables (separadas por comas)',
    type: 'text',
    placeholder: 'María, Proyecto Web, 75',
  },
]

export default function WhatsApp() {
  const [conversations, setConversations] = useState<WhatsAppConversation[]>(mockConversations)
  const [selectedConversation, setSelectedConversation] = useState<WhatsAppConversation | null>(null)
  const [messages, setMessages] = useState<WhatsAppMessage[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [isNewMessageModalOpen, setIsNewMessageModalOpen] = useState(false)
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false)
  const [isSending, setIsSending] = useState(false)

  useEffect(() => {
    if (selectedConversation) {
      // Simular carga de mensajes
      setMessages(mockMessages)
    }
  }, [selectedConversation])

  const filteredConversations = conversations.filter(conv =>
    conv.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.contactPhone.includes(searchTerm)
  )

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation || isSending) return

    setIsSending(true)
    try {
      const result = await whatsappService.sendTextMessage(
        selectedConversation.contactPhone,
        newMessage
      )

      if (result.success) {
        const message: WhatsAppMessage = {
          id: result.messageId || Date.now().toString(),
          from: '123456789',
          to: selectedConversation.contactPhone,
          message: newMessage,
          timestamp: new Date(),
          type: 'text',
          status: 'sent',
        }

        setMessages(prev => [...prev, message])
        setNewMessage('')
        toast.success('Mensaje enviado')
      } else {
        toast.error(result.error || 'Error al enviar mensaje')
      }
    } catch (error) {
      toast.error('Error al enviar mensaje')
    } finally {
      setIsSending(false)
    }
  }

  const handleSendNewMessage = async (data: any) => {
    setIsSending(true)
    try {
      const result = await whatsappService.sendTextMessage(data.to, data.message)

      if (result.success) {
        toast.success('Mensaje enviado')
        setIsNewMessageModalOpen(false)
        
        // Agregar o actualizar conversación
        const existingConv = conversations.find(c => c.contactPhone === data.to)
        if (!existingConv) {
          const newConv: WhatsAppConversation = {
            id: Date.now().toString(),
            contactName: data.to,
            contactPhone: data.to,
            lastMessage: data.message,
            lastMessageTime: new Date(),
            unreadCount: 0,
            messages: [],
          }
          setConversations(prev => [newConv, ...prev])
        }
      } else {
        toast.error(result.error || 'Error al enviar mensaje')
      }
    } catch (error) {
      toast.error('Error al enviar mensaje')
    } finally {
      setIsSending(false)
    }
  }

  const handleSendTemplate = async (data: any) => {
    setIsSending(true)
    try {
      const variables = data.variables ? data.variables.split(',').map((v: string) => v.trim()) : []
      const result = await whatsappService.sendTemplateMessage(data.to, data.template, variables)

      if (result.success) {
        toast.success('Plantilla enviada')
        setIsTemplateModalOpen(false)
      } else {
        toast.error(result.error || 'Error al enviar plantilla')
      }
    } catch (error) {
      toast.error('Error al enviar plantilla')
    } finally {
      setIsSending(false)
    }
  }

  const formatTime = (date: Date) => {
    const now = new Date()
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)

    if (diffInHours < 24) {
      return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
    } else {
      return date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' })
    }
  }

  return (
    <div className="h-[calc(100vh-200px)] flex bg-white rounded-lg shadow overflow-hidden">
      {/* Lista de conversaciones */}
      <div className="w-1/3 border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-bold text-gray-900">WhatsApp</h1>
            <button
              onClick={() => setIsNewMessageModalOpen(true)}
              className="btn-primary p-2"
              title="Nuevo mensaje"
            >
              <PlusIcon className="h-5 w-5" />
            </button>
          </div>
          
          {/* Búsqueda */}
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar conversaciones..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Lista de conversaciones */}
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.map((conversation) => (
            <div
              key={conversation.id}
              onClick={() => setSelectedConversation(conversation)}
              className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                selectedConversation?.id === conversation.id ? 'bg-blue-50 border-blue-200' : ''
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-sm font-medium text-green-600">
                      {conversation.contactName.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {conversation.contactName}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatTime(conversation.lastMessageTime)}
                    </p>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-sm text-gray-500 truncate">
                      {conversation.lastMessage}
                    </p>
                    {conversation.unreadCount > 0 && (
                      <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-green-500 rounded-full">
                        {conversation.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat */}
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            {/* Header del chat */}
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-sm font-medium text-green-600">
                      {selectedConversation.contactName.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h2 className="text-lg font-medium text-gray-900">
                      {selectedConversation.contactName}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {selectedConversation.contactPhone}
                    </p>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => setIsTemplateModalOpen(true)}
                    className="btn-outline p-2"
                    title="Enviar plantilla"
                  >
                    <DocumentIcon className="h-5 w-5" />
                  </button>
                  <button className="btn-outline p-2" title="Llamada">
                    <PhoneIcon className="h-5 w-5" />
                  </button>
                  <button className="btn-outline p-2" title="Videollamada">
                    <VideoCameraIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Mensajes */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.from === '123456789' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.from === '123456789'
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 text-gray-900'
                    }`}
                  >
                    <p className="text-sm">{message.message}</p>
                    <div className="flex justify-between items-center mt-1">
                      <p className={`text-xs ${
                        message.from === '123456789' ? 'text-green-100' : 'text-gray-500'
                      }`}>
                        {formatTime(message.timestamp)}
                      </p>
                      {message.from === '123456789' && (
                        <span className="text-xs text-green-100 ml-2">
                          {message.status === 'sent' && '✓'}
                          {message.status === 'delivered' && '✓✓'}
                          {message.status === 'read' && '✓✓'}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Input de mensaje */}
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <div className="flex space-x-2">
                <button className="btn-outline p-2" title="Adjuntar imagen">
                  <PhotoIcon className="h-5 w-5" />
                </button>
                <button className="btn-outline p-2" title="Adjuntar documento">
                  <DocumentIcon className="h-5 w-5" />
                </button>
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Escribe un mensaje..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    disabled={isSending}
                  />
                </div>
                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim() || isSending}
                  className="btn-primary p-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSending ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <PaperAirplaneIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="h-24 w-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <ChatBubbleLeftRightIcon className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Selecciona una conversación
              </h3>
              <p className="text-gray-500">
                Elige una conversación de la lista para comenzar a chatear
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Modal nuevo mensaje */}
      <Modal
        isOpen={isNewMessageModalOpen}
        onClose={() => setIsNewMessageModalOpen(false)}
        title="Nuevo Mensaje"
        size="md"
      >
        <DynamicForm
          fields={messageFormFields}
          onSubmit={handleSendNewMessage}
          submitText={isSending ? 'Enviando...' : 'Enviar Mensaje'}
          loading={isSending}
          onCancel={() => setIsNewMessageModalOpen(false)}
        />
      </Modal>

      {/* Modal plantilla */}
      <Modal
        isOpen={isTemplateModalOpen}
        onClose={() => setIsTemplateModalOpen(false)}
        title="Enviar Plantilla"
        size="md"
      >
        <DynamicForm
          fields={templateFormFields}
          onSubmit={handleSendTemplate}
          submitText={isSending ? 'Enviando...' : 'Enviar Plantilla'}
          loading={isSending}
          onCancel={() => setIsTemplateModalOpen(false)}
        />
      </Modal>
    </div>
  )
}