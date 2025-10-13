import { PlusIcon, CalendarIcon, UsersIcon, ClockIcon } from '@heroicons/react/24/outline'

const projects = [
  {
    id: 1,
    name: 'Desarrollo Web Corporativo',
    client: 'Empresa ABC S.L.',
    status: 'in_progress',
    progress: 75,
    startDate: '2024-01-01',
    endDate: '2024-03-15',
    team: ['María García', 'Carlos López', 'Ana Martínez'],
    budget: 25000,
  },
  {
    id: 2,
    name: 'App Móvil E-commerce',
    client: 'Tech Solutions',
    status: 'planning',
    progress: 15,
    startDate: '2024-02-01',
    endDate: '2024-06-30',
    team: ['David Rodríguez', 'Laura Sánchez'],
    budget: 45000,
  },
]

const statusColors = {
  planning: 'bg-yellow-100 text-yellow-800',
  in_progress: 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800',
  on_hold: 'bg-gray-100 text-gray-800',
}

export default function Projects() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Proyectos</h1>
          <p className="mt-1 text-sm text-gray-500">Gestiona todos tus proyectos</p>
        </div>
        <button className="btn-primary">
          <PlusIcon className="h-5 w-5 mr-2" />
          Nuevo Proyecto
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {projects.map((project) => (
          <div key={project.id} className="card">
            <div className="card-header">
              <div className="flex items-center justify-between">
                <h3 className="card-title text-lg">{project.name}</h3>
                <span className={`px-2 py-1 text-xs rounded-full ${statusColors[project.status as keyof typeof statusColors]}`}>
                  {project.status === 'in_progress' ? 'En Progreso' : 
                   project.status === 'planning' ? 'Planificación' : 
                   project.status === 'completed' ? 'Completado' : 'En Pausa'}
                </span>
              </div>
              <p className="text-sm text-gray-600">{project.client}</p>
            </div>
            <div className="card-content">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progreso</span>
                    <span>{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <CalendarIcon className="h-4 w-4 mr-1" />
                    {new Date(project.startDate).toLocaleDateString('es-ES')} - {new Date(project.endDate).toLocaleDateString('es-ES')}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <UsersIcon className="h-4 w-4 mr-1 text-gray-400" />
                    <span className="text-sm text-gray-600">{project.team.length} miembros</span>
                  </div>
                  <div className="text-lg font-semibold text-green-600">
                    €{project.budget.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}