import { PlusIcon } from '@heroicons/react/24/outline'

export default function Leads() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestión de Leads</h1>
          <p className="mt-1 text-sm text-gray-500">Seguimiento de prospectos y oportunidades</p>
        </div>
        <button className="btn-primary">
          <PlusIcon className="h-5 w-5 mr-2" />
          Nuevo Lead
        </button>
      </div>
      
      <div className="card">
        <div className="card-content">
          <p className="text-gray-500">Funcionalidad de gestión de leads en desarrollo...</p>
        </div>
      </div>
    </div>
  )
}