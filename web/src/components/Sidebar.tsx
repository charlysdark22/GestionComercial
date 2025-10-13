import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Link, useLocation } from 'react-router-dom'
import { 
  XMarkIcon,
  HomeIcon,
  UsersIcon,
  FolderOpenIcon,
  ShoppingCartIcon,
  TargetIcon,
  CalendarIcon,
  ChatBubbleLeftRightIcon,
  CubeIcon,
  ReceiptPercentIcon,
  DocumentTextIcon,
  ArchiveBoxIcon,
  UserGroupIcon,
  DocumentCheckIcon,
  MegaphoneIcon,
  BuildingOfficeIcon,
  CalculatorIcon,
  BuildingStorefrontIcon,
  ChatBubbleLeftEllipsisIcon,
  BellIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline'
import { MODULES } from '@shared/constants'

interface SidebarProps {
  open: boolean
  setOpen: (open: boolean) => void
}

const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon },
  { name: MODULES.CLIENTS.name, href: MODULES.CLIENTS.path, icon: UsersIcon },
  { name: MODULES.PROJECTS.name, href: MODULES.PROJECTS.path, icon: FolderOpenIcon },
  { name: MODULES.SALES.name, href: MODULES.SALES.path, icon: ShoppingCartIcon },
  { name: MODULES.LEADS.name, href: MODULES.LEADS.path, icon: TargetIcon },
  { name: MODULES.CALENDAR.name, href: MODULES.CALENDAR.path, icon: CalendarIcon },
  { name: MODULES.WHATSAPP.name, href: MODULES.WHATSAPP.path, icon: ChatBubbleLeftRightIcon },
  { name: MODULES.INVENTORY.name, href: MODULES.INVENTORY.path, icon: CubeIcon },
  { name: MODULES.EXPENSES.name, href: MODULES.EXPENSES.path, icon: ReceiptPercentIcon },
  { name: MODULES.CONTRACTS.name, href: MODULES.CONTRACTS.path, icon: DocumentTextIcon },
  { name: MODULES.ASSETS.name, href: MODULES.ASSETS.path, icon: ArchiveBoxIcon },
  { name: MODULES.EMPLOYEES.name, href: MODULES.EMPLOYEES.path, icon: UserGroupIcon },
  { name: MODULES.INVOICING.name, href: MODULES.INVOICING.path, icon: DocumentCheckIcon },
  { name: MODULES.MARKETING.name, href: MODULES.MARKETING.path, icon: MegaphoneIcon },
  { name: MODULES.MANUFACTURING.name, href: '/manufacturing', icon: BuildingOfficeIcon },
  { name: MODULES.ACCOUNTING.name, href: MODULES.ACCOUNTING.path, icon: CalculatorIcon },
  { name: MODULES.REAL_ESTATE.name, href: '/real-estate', icon: BuildingStorefrontIcon },
  { name: MODULES.CHAT.name, href: MODULES.CHAT.path, icon: ChatBubbleLeftEllipsisIcon },
  { name: MODULES.REMINDERS.name, href: MODULES.REMINDERS.path, icon: BellIcon },
  { name: 'Configuración', href: '/settings', icon: Cog6ToothIcon },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Sidebar({ open, setOpen }: SidebarProps) {
  const location = useLocation()

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="flex items-center h-16 px-4 bg-primary-600">
        <img
          className="h-8 w-auto"
          src="/logo.svg"
          alt="CRM Adaptable"
        />
        <span className="ml-2 text-white font-bold text-lg">CRM Adaptable</span>
      </div>
      
      <nav className="flex-1 px-2 py-4 bg-white overflow-y-auto">
        <div className="space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href
            return (
              <Link
                key={item.name}
                to={item.href}
                className={classNames(
                  isActive
                    ? 'bg-primary-100 border-r-4 border-primary-600 text-primary-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                  'group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors duration-150'
                )}
                onClick={() => setOpen(false)}
              >
                <item.icon
                  className={classNames(
                    isActive ? 'text-primary-600' : 'text-gray-400 group-hover:text-gray-500',
                    'mr-3 flex-shrink-0 h-5 w-5'
                  )}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )

  return (
    <>
      {/* Mobile sidebar */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-50 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                    <button
                      type="button"
                      className="-m-2.5 p-2.5"
                      onClick={() => setOpen(false)}
                    >
                      <span className="sr-only">Cerrar sidebar</span>
                      <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                    </button>
                  </div>
                </Transition.Child>
                
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white">
                  <SidebarContent />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white">
          <SidebarContent />
        </div>
      </div>
    </>
  )
}