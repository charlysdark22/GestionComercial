import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
} from 'recharts';

// Colores predefinidos
const COLORS = [
  '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6',
  '#06b6d4', '#84cc16', '#f97316', '#ec4899', '#6366f1'
];

// Componente de gráfico de barras
export interface BarChartProps {
  data: any[];
  xKey: string;
  yKeys: string[];
  title?: string;
  height?: number;
  colors?: string[];
}

export function CustomBarChart({
  data,
  xKey,
  yKeys,
  title,
  height = 300,
  colors = COLORS,
}: BarChartProps) {
  return (
    <div className="w-full">
      {title && (
        <h3 className="text-lg font-medium text-gray-900 mb-4">{title}</h3>
      )}
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xKey} />
          <YAxis />
          <Tooltip formatter={(value: any) => [`€${value.toLocaleString()}`, '']} />
          <Legend />
          {yKeys.map((key, index) => (
            <Bar
              key={key}
              dataKey={key}
              fill={colors[index % colors.length]}
              name={key.charAt(0).toUpperCase() + key.slice(1)}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// Componente de gráfico de torta
export interface PieChartProps {
  data: Array<{ name: string; value: number; color?: string }>;
  title?: string;
  height?: number;
  showLabels?: boolean;
}

export function CustomPieChart({
  data,
  title,
  height = 300,
  showLabels = true,
}: PieChartProps) {
  const renderLabel = (entry: any) => {
    const percent = ((entry.value / data.reduce((sum, item) => sum + item.value, 0)) * 100).toFixed(1);
    return `${entry.name}: ${percent}%`;
  };

  return (
    <div className="w-full">
      {title && (
        <h3 className="text-lg font-medium text-gray-900 mb-4">{title}</h3>
      )}
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={showLabels ? renderLabel : false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.color || COLORS[index % COLORS.length]} 
              />
            ))}
          </Pie>
          <Tooltip formatter={(value: any) => [`€${value.toLocaleString()}`, 'Valor']} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

// Componente de gráfico de líneas
export interface LineChartProps {
  data: any[];
  xKey: string;
  yKeys: string[];
  title?: string;
  height?: number;
  colors?: string[];
}

export function CustomLineChart({
  data,
  xKey,
  yKeys,
  title,
  height = 300,
  colors = COLORS,
}: LineChartProps) {
  return (
    <div className="w-full">
      {title && (
        <h3 className="text-lg font-medium text-gray-900 mb-4">{title}</h3>
      )}
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xKey} />
          <YAxis />
          <Tooltip formatter={(value: any) => [`€${value.toLocaleString()}`, '']} />
          <Legend />
          {yKeys.map((key, index) => (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              stroke={colors[index % colors.length]}
              strokeWidth={2}
              name={key.charAt(0).toUpperCase() + key.slice(1)}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

// Componente de gráfico de área
export interface AreaChartProps {
  data: any[];
  xKey: string;
  yKeys: string[];
  title?: string;
  height?: number;
  colors?: string[];
  stacked?: boolean;
}

export function CustomAreaChart({
  data,
  xKey,
  yKeys,
  title,
  height = 300,
  colors = COLORS,
  stacked = false,
}: AreaChartProps) {
  return (
    <div className="w-full">
      {title && (
        <h3 className="text-lg font-medium text-gray-900 mb-4">{title}</h3>
      )}
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xKey} />
          <YAxis />
          <Tooltip formatter={(value: any) => [`€${value.toLocaleString()}`, '']} />
          <Legend />
          {yKeys.map((key, index) => (
            <Area
              key={key}
              type="monotone"
              dataKey={key}
              stackId={stacked ? "1" : undefined}
              stroke={colors[index % colors.length]}
              fill={colors[index % colors.length]}
              fillOpacity={0.6}
              name={key.charAt(0).toUpperCase() + key.slice(1)}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

// Componente de métricas rápidas
export interface MetricCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    type: 'increase' | 'decrease';
  };
  icon?: React.ReactNode;
  color?: 'blue' | 'green' | 'yellow' | 'red' | 'purple';
}

export function MetricCard({
  title,
  value,
  change,
  icon,
  color = 'blue',
}: MetricCardProps) {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    yellow: 'bg-yellow-50 text-yellow-600',
    red: 'bg-red-50 text-red-600',
    purple: 'bg-purple-50 text-purple-600',
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-semibold text-gray-900 mt-2">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </p>
          {change && (
            <div className={`flex items-center mt-2 text-sm ${
              change.type === 'increase' ? 'text-green-600' : 'text-red-600'
            }`}>
              <span className="mr-1">
                {change.type === 'increase' ? '↗' : '↘'}
              </span>
              {Math.abs(change.value)}%
            </div>
          )}
        </div>
        {icon && (
          <div className={`p-3 rounded-full ${colorClasses[color]}`}>
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}