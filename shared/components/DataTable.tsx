import React, { useState } from 'react';

export interface Column<T> {
  key: keyof T;
  title: string;
  render?: (value: any, record: T) => React.ReactNode;
  sortable?: boolean;
  filterable?: boolean;
  width?: string;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  pagination?: {
    current: number;
    pageSize: number;
    total: number;
    onChange: (page: number, pageSize: number) => void;
  };
  onRowClick?: (record: T) => void;
  rowSelection?: {
    selectedRowKeys: React.Key[];
    onChange: (selectedRowKeys: React.Key[], selectedRows: T[]) => void;
  };
  searchable?: boolean;
  exportable?: boolean;
}

export function DataTable<T extends { id: string | number }>({
  data,
  columns,
  loading = false,
  pagination,
  onRowClick,
  rowSelection,
  searchable = true,
  exportable = true,
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T;
    direction: 'asc' | 'desc';
  } | null>(null);

  // Filtrado por búsqueda
  const filteredData = searchTerm
    ? data.filter(item =>
        columns.some(column => {
          const value = item[column.key];
          return String(value).toLowerCase().includes(searchTerm.toLowerCase());
        })
      )
    : data;

  // Ordenamiento
  const sortedData = sortConfig
    ? [...filteredData].sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        
        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      })
    : filteredData;

  const handleSort = (key: keyof T) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const exportToCSV = () => {
    const headers = columns.map(col => col.title).join(',');
    const rows = sortedData.map(item =>
      columns.map(col => {
        const value = item[col.key];
        return typeof value === 'string' && value.includes(',') 
          ? `"${value}"` 
          : value;
      }).join(',')
    );
    
    const csv = [headers, ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'data-export.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Barra de herramientas */}
      <div className="flex justify-between items-center">
        {searchable && (
          <div className="flex-1 max-w-md">
            <input
              type="text"
              placeholder="Buscar..."
              className="input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        )}
        
        <div className="flex space-x-2">
          {exportable && (
            <button
              onClick={exportToCSV}
              className="btn-outline"
            >
              Exportar CSV
            </button>
          )}
          
          {rowSelection && rowSelection.selectedRowKeys.length > 0 && (
            <span className="text-sm text-gray-600">
              {rowSelection.selectedRowKeys.length} seleccionados
            </span>
          )}
        </div>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {rowSelection && (
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <input
                    type="checkbox"
                    checked={rowSelection.selectedRowKeys.length === sortedData.length}
                    onChange={(e) => {
                      if (e.target.checked) {
                        rowSelection.onChange(
                          sortedData.map(item => item.id),
                          sortedData
                        );
                      } else {
                        rowSelection.onChange([], []);
                      }
                    }}
                  />
                </th>
              )}
              
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                    column.sortable ? 'cursor-pointer hover:bg-gray-100' : ''
                  }`}
                  style={{ width: column.width }}
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  <div className="flex items-center space-x-1">
                    <span>{column.title}</span>
                    {column.sortable && sortConfig?.key === column.key && (
                      <span className="text-primary-600">
                        {sortConfig.direction === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedData.map((item) => (
              <tr
                key={item.id}
                className={`${
                  onRowClick ? 'cursor-pointer hover:bg-gray-50' : ''
                } ${
                  rowSelection?.selectedRowKeys.includes(item.id)
                    ? 'bg-blue-50'
                    : ''
                }`}
                onClick={() => onRowClick?.(item)}
              >
                {rowSelection && (
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={rowSelection.selectedRowKeys.includes(item.id)}
                      onChange={(e) => {
                        e.stopPropagation();
                        const newSelectedKeys = e.target.checked
                          ? [...rowSelection.selectedRowKeys, item.id]
                          : rowSelection.selectedRowKeys.filter(key => key !== item.id);
                        
                        const newSelectedRows = sortedData.filter(row =>
                          newSelectedKeys.includes(row.id)
                        );
                        
                        rowSelection.onChange(newSelectedKeys, newSelectedRows);
                      }}
                    />
                  </td>
                )}
                
                {columns.map((column) => (
                  <td
                    key={String(column.key)}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                  >
                    {column.render
                      ? column.render(item[column.key], item)
                      : String(item[column.key] || '-')
                    }
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      {pagination && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Mostrando {((pagination.current - 1) * pagination.pageSize) + 1} a{' '}
            {Math.min(pagination.current * pagination.pageSize, pagination.total)} de{' '}
            {pagination.total} resultados
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={() => pagination.onChange(pagination.current - 1, pagination.pageSize)}
              disabled={pagination.current <= 1}
              className="btn-outline disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Anterior
            </button>
            
            <span className="px-3 py-2 text-sm">
              Página {pagination.current} de {Math.ceil(pagination.total / pagination.pageSize)}
            </span>
            
            <button
              onClick={() => pagination.onChange(pagination.current + 1, pagination.pageSize)}
              disabled={pagination.current >= Math.ceil(pagination.total / pagination.pageSize)}
              className="btn-outline disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Siguiente
            </button>
          </div>
        </div>
      )}
    </div>
  );
}