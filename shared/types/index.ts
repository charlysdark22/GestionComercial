// Tipos principales del sistema CRM

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  company: string;
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum UserRole {
  ADMIN = 'admin',
  MANAGER = 'manager',
  EMPLOYEE = 'employee',
  CLIENT = 'client'
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  address?: Address;
  status: ClientStatus;
  tags: string[];
  notes?: string;
  assignedTo: string; // User ID
  createdAt: Date;
  updatedAt: Date;
}

export enum ClientStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PROSPECT = 'prospect',
  LEAD = 'lead'
}

export interface Project {
  id: string;
  name: string;
  description: string;
  clientId: string;
  managerId: string;
  teamMembers: string[];
  status: ProjectStatus;
  priority: Priority;
  startDate: Date;
  endDate?: Date;
  budget?: number;
  progress: number;
  tasks: Task[];
  createdAt: Date;
  updatedAt: Date;
}

export enum ProjectStatus {
  PLANNING = 'planning',
  IN_PROGRESS = 'in_progress',
  ON_HOLD = 'on_hold',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  projectId: string;
  assignedTo: string;
  status: TaskStatus;
  priority: Priority;
  dueDate?: Date;
  estimatedHours?: number;
  actualHours?: number;
  createdAt: Date;
  updatedAt: Date;
}

export enum TaskStatus {
  TODO = 'todo',
  IN_PROGRESS = 'in_progress',
  REVIEW = 'review',
  DONE = 'done'
}

export enum Priority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent'
}

export interface Sale {
  id: string;
  clientId: string;
  products: SaleItem[];
  total: number;
  status: SaleStatus;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  salesPersonId: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SaleItem {
  productId: string;
  quantity: number;
  unitPrice: number;
  discount?: number;
  total: number;
}

export enum SaleStatus {
  DRAFT = 'draft',
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled'
}

export enum PaymentMethod {
  CASH = 'cash',
  CREDIT_CARD = 'credit_card',
  BANK_TRANSFER = 'bank_transfer',
  CHECK = 'check'
}

export enum PaymentStatus {
  PENDING = 'pending',
  PARTIAL = 'partial',
  PAID = 'paid',
  OVERDUE = 'overdue'
}

export interface Product {
  id: string;
  name: string;
  description?: string;
  sku: string;
  category: string;
  price: number;
  cost?: number;
  stock: number;
  minStock: number;
  images?: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Inventory {
  id: string;
  productId: string;
  type: InventoryType;
  quantity: number;
  reason: string;
  userId: string;
  createdAt: Date;
}

export enum InventoryType {
  IN = 'in',
  OUT = 'out',
  ADJUSTMENT = 'adjustment'
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  source: LeadSource;
  status: LeadStatus;
  score: number;
  assignedTo: string;
  notes?: string;
  activities: Activity[];
  createdAt: Date;
  updatedAt: Date;
}

export enum LeadSource {
  WEBSITE = 'website',
  SOCIAL_MEDIA = 'social_media',
  EMAIL = 'email',
  PHONE = 'phone',
  REFERRAL = 'referral',
  WHATSAPP = 'whatsapp'
}

export enum LeadStatus {
  NEW = 'new',
  CONTACTED = 'contacted',
  QUALIFIED = 'qualified',
  PROPOSAL = 'proposal',
  NEGOTIATION = 'negotiation',
  CLOSED_WON = 'closed_won',
  CLOSED_LOST = 'closed_lost'
}

export interface Activity {
  id: string;
  type: ActivityType;
  title: string;
  description?: string;
  userId: string;
  entityType: EntityType;
  entityId: string;
  createdAt: Date;
}

export enum ActivityType {
  CALL = 'call',
  EMAIL = 'email',
  MEETING = 'meeting',
  NOTE = 'note',
  TASK = 'task',
  WHATSAPP = 'whatsapp'
}

export enum EntityType {
  CLIENT = 'client',
  LEAD = 'lead',
  PROJECT = 'project',
  SALE = 'sale'
}

export interface Event {
  id: string;
  title: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  allDay: boolean;
  attendees: string[];
  location?: string;
  type: EventType;
  createdBy: string;
  createdAt: Date;
}

export enum EventType {
  MEETING = 'meeting',
  CALL = 'call',
  DEADLINE = 'deadline',
  REMINDER = 'reminder',
  PERSONAL = 'personal'
}

export interface Contract {
  id: string;
  title: string;
  clientId: string;
  type: ContractType;
  status: ContractStatus;
  startDate: Date;
  endDate?: Date;
  value: number;
  terms: string;
  signedDate?: Date;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum ContractType {
  SERVICE = 'service',
  PRODUCT = 'product',
  MAINTENANCE = 'maintenance',
  SUBSCRIPTION = 'subscription'
}

export enum ContractStatus {
  DRAFT = 'draft',
  PENDING = 'pending',
  ACTIVE = 'active',
  EXPIRED = 'expired',
  TERMINATED = 'terminated'
}

export interface Expense {
  id: string;
  title: string;
  description?: string;
  amount: number;
  category: string;
  date: Date;
  receipt?: string;
  approvedBy?: string;
  status: ExpenseStatus;
  createdBy: string;
  createdAt: Date;
}

export enum ExpenseStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  PAID = 'paid'
}

export interface Asset {
  id: string;
  name: string;
  description?: string;
  category: string;
  value: number;
  purchaseDate: Date;
  condition: AssetCondition;
  location: string;
  assignedTo?: string;
  maintenanceSchedule?: MaintenanceSchedule[];
  createdAt: Date;
  updatedAt: Date;
}

export enum AssetCondition {
  EXCELLENT = 'excellent',
  GOOD = 'good',
  FAIR = 'fair',
  POOR = 'poor',
  OUT_OF_SERVICE = 'out_of_service'
}

export interface MaintenanceSchedule {
  id: string;
  assetId: string;
  type: string;
  frequency: number; // días
  lastMaintenance?: Date;
  nextMaintenance: Date;
  cost?: number;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
  read: boolean;
  actionUrl?: string;
  createdAt: Date;
}

export enum NotificationType {
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
  SUCCESS = 'success'
}

// Tipos para la API
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface FilterParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  filters?: Record<string, any>;
}