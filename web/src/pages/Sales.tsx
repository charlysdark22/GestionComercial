import { PlusIcon, EyeIcon, DocumentIcon } from '@heroicons/react/24/outline'

export default function Sales() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Ventas y Compras</h1>
          <p className="mt-1 text-sm text-gray-500">Gestiona todas las transacciones comerciales</p>
        </div>
        <div className="flex space-x-2">
          <button className="btn-outline">
            <DocumentIcon className="h-5 w-5 mr-2" />
            Nueva Compra
          </button>
          <button className="btn-primary">
            <PlusIcon className="h-5 w-5 mr-2" />
            Nueva Venta
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="card">
          <div className="card-content">
            <div className="text-2xl font-bold text-green-600">€125,430</div>
            <p className="text-sm text-gray-600">Ventas este mes</p>
          </div>
        </div>
        <div className="card">
          <div className="card-content">
            <div className="text-2xl font-bold text-blue-600">€45,200</div>
            <p className="text-sm text-gray-600">Compras este mes</p>
          </div>
        </div>
        <div className="card">
          <div className="card-content">
            <div className="text-2xl font-bold text-purple-600">€80,230</div>
            <p className="text-sm text-gray-600">Beneficio neto</p>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Transacciones Recientes</h3>
        </div>
        <div className="card-content">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tipo</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cliente/Proveedor</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Monto</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Venta</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Empresa ABC S.L.</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">15/01/2024</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">€15,000</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Pagado</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-blue-600 hover:text-blue-900">
                      <EyeIcon className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}