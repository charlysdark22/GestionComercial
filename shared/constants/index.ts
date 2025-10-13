// Constantes compartidas del sistema

export const APP_CONFIG = {
  NAME: 'CRM Adaptable',
  VERSION: '1.0.0',
  DESCRIPTION: 'Sistema CRM adaptable a cualquier tipo de negocio',
  COMPANY: 'CRM Solutions',
};

export const API_ENDPOINTS = {
  BASE_URL: process.env.NODE_ENV === 'production' 
    ? 'https://api.crm-adaptable.com' 
    : 'http://localhost:8000',
  
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    PROFILE: '/auth/profile',
  },
  
  CLIENTS: {
    LIST: '/clients',
    CREATE: '/clients',
    UPDATE: '/clients/:id',
    DELETE: '/clients/:id',
    GET: '/clients/:id',
  },
  
  PROJECTS: {
    LIST: '/projects',
    CREATE: '/projects',
    UPDATE: '/projects/:id',
    DELETE: '/projects/:id',
    GET: '/projects/:id',
  },
  
  TASKS: {
    LIST: '/tasks',
    CREATE: '/tasks',
    UPDATE: '/tasks/:id',
    DELETE: '/tasks/:id',
    GET: '/tasks/:id',
  },
  
  SALES: {
    LIST: '/sales',
    CREATE: '/sales',
    UPDATE: '/sales/:id',
    DELETE: '/sales/:id',
    GET: '/sales/:id',
  },
  
  PRODUCTS: {
    LIST: '/products',
    CREATE: '/products',
    UPDATE: '/products/:id',
    DELETE: '/products/:id',
    GET: '/products/:id',
  },
  
  LEADS: {
    LIST: '/leads',
    CREATE: '/leads',
    UPDATE: '/leads/:id',
    DELETE: '/leads/:id',
    GET: '/leads/:id',
  },
  
  WHATSAPP: {
    SEND_MESSAGE: '/whatsapp/send',
    GET_CONVERSATIONS: '/whatsapp/conversations',
    GET_MESSAGES: '/whatsapp/messages/:conversationId',
  },
};

export const COLORS = {
  PRIMARY: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },
  
  STATUS: {
    SUCCESS: '#10b981',
    WARNING: '#f59e0b',
    ERROR: '#ef4444',
    INFO: '#3b82f6',
  },
  
  PRIORITY: {
    LOW: '#10b981',
    MEDIUM: '#f59e0b',
    HIGH: '#f97316',
    URGENT: '#ef4444',
  },
};

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
};

export const VALIDATION = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^[\+]?[1-9][\d]{0,15}$/,
  PASSWORD_MIN_LENGTH: 8,
};

export const DATE_FORMATS = {
  DISPLAY: 'dd/MM/yyyy',
  DISPLAY_WITH_TIME: 'dd/MM/yyyy HH:mm',
  API: 'yyyy-MM-dd',
  API_WITH_TIME: "yyyy-MM-dd'T'HH:mm:ss.SSSxxx",
};

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'crm_auth_token',
  REFRESH_TOKEN: 'crm_refresh_token',
  USER_PREFERENCES: 'crm_user_preferences',
  THEME: 'crm_theme',
  LANGUAGE: 'crm_language',
};

export const MODULES = {
  PROJECTS: {
    name: 'Gestión de Proyectos',
    icon: 'FolderOpen',
    path: '/projects',
    description: 'Administra proyectos, tareas y equipos de trabajo',
  },
  WHATSAPP: {
    name: 'Integración WhatsApp',
    icon: 'MessageCircle',
    path: '/whatsapp',
    description: 'Comunícate con clientes a través de WhatsApp',
  },
  MARKETING: {
    name: 'Marketing Automatizado',
    icon: 'Megaphone',
    path: '/marketing',
    description: 'Campañas de marketing y automatización',
  },
  MANUFACTURING: {
    name: 'Gestión de Fabricación',
    icon: 'Factory',
    path: '/manufacturing',
    description: 'Control de procesos de fabricación',
  },
  ACCOUNTING: {
    name: 'Contabilidad',
    icon: 'Calculator',
    path: '/accounting',
    description: 'Gestión contable y financiera',
  },
  REAL_ESTATE: {
    name: 'Administración Inmobiliaria',
    icon: 'Building',
    path: '/real-estate',
    description: 'Gestión de propiedades inmobiliarias',
  },
  ASSETS: {
    name: 'Control de Activos',
    icon: 'Package',
    path: '/assets',
    description: 'Administración de activos empresariales',
  },
  SALES: {
    name: 'Ventas y Compras',
    icon: 'ShoppingCart',
    path: '/sales',
    description: 'Gestión de ventas y compras',
  },
  INVENTORY: {
    name: 'Inventarios',
    icon: 'Warehouse',
    path: '/inventory',
    description: 'Control de stock e inventarios',
  },
  EXPENSES: {
    name: 'Gestión de Gastos',
    icon: 'Receipt',
    path: '/expenses',
    description: 'Control y seguimiento de gastos',
  },
  CLIENTS: {
    name: 'Administración de Clientes',
    icon: 'Users',
    path: '/clients',
    description: 'Gestión de clientes y contactos',
  },
  CONTRACTS: {
    name: 'Contratos',
    icon: 'FileText',
    path: '/contracts',
    description: 'Administración de contratos',
  },
  LEADS: {
    name: 'Gestión de Leads',
    icon: 'Target',
    path: '/leads',
    description: 'Seguimiento de prospectos y leads',
  },
  CALENDAR: {
    name: 'Calendario de Eventos',
    icon: 'Calendar',
    path: '/calendar',
    description: 'Programación y seguimiento de eventos',
  },
  CHAT: {
    name: 'Chat Interno',
    icon: 'MessageSquare',
    path: '/chat',
    description: 'Comunicación interna del equipo',
  },
  EMPLOYEES: {
    name: 'Gestión de Empleados',
    icon: 'UserCheck',
    path: '/employees',
    description: 'Administración de recursos humanos',
  },
  INVOICING: {
    name: 'Facturación',
    icon: 'FileCheck',
    path: '/invoicing',
    description: 'Generación y gestión de facturas',
  },
  REMINDERS: {
    name: 'Recordatorios',
    icon: 'Bell',
    path: '/reminders',
    description: 'Sistema de recordatorios y notificaciones',
  },
};

export const WHATSAPP_CONFIG = {
  API_URL: 'https://graph.facebook.com/v17.0',
  WEBHOOK_VERIFY_TOKEN: process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN || 'crm_webhook_token',
  BUSINESS_PHONE_NUMBER_ID: process.env.WHATSAPP_BUSINESS_PHONE_NUMBER_ID,
  ACCESS_TOKEN: process.env.WHATSAPP_ACCESS_TOKEN,
};

export const NOTIFICATION_TYPES = {
  TASK_ASSIGNED: 'task_assigned',
  PROJECT_DEADLINE: 'project_deadline',
  LEAD_UPDATED: 'lead_updated',
  PAYMENT_RECEIVED: 'payment_received',
  INVENTORY_LOW: 'inventory_low',
  CONTRACT_EXPIRING: 'contract_expiring',
  WHATSAPP_MESSAGE: 'whatsapp_message',
};