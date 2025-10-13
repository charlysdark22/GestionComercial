import React from 'react';
import { useForm, Controller, FieldValues, Path } from 'react-hook-form';

// Tipos para los campos del formulario
export interface FormField<T extends FieldValues> {
  name: Path<T>;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'date' | 'file';
  placeholder?: string;
  required?: boolean;
  options?: Array<{ value: string | number; label: string }>;
  validation?: any;
  disabled?: boolean;
  description?: string;
  multiple?: boolean;
  accept?: string; // Para campos de archivo
}

export interface FormProps<T extends FieldValues> {
  fields: FormField<T>[];
  onSubmit: (data: T) => void | Promise<void>;
  defaultValues?: Partial<T>;
  submitText?: string;
  cancelText?: string;
  onCancel?: () => void;
  loading?: boolean;
  className?: string;
  layout?: 'vertical' | 'horizontal';
  columns?: 1 | 2 | 3;
}

export function DynamicForm<T extends FieldValues>({
  fields,
  onSubmit,
  defaultValues,
  submitText = 'Guardar',
  cancelText = 'Cancelar',
  onCancel,
  loading = false,
  className = '',
  layout = 'vertical',
  columns = 1,
}: FormProps<T>) {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<T>({
    defaultValues: defaultValues as any,
  });

  const onFormSubmit = async (data: T) => {
    try {
      await onSubmit(data);
    } catch (error) {
      console.error('Error al enviar formulario:', error);
    }
  };

  const renderField = (field: FormField<T>) => {
    const hasError = !!errors[field.name];
    const errorMessage = errors[field.name]?.message as string;

    const baseInputClasses = `input ${hasError ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`;

    return (
      <div key={field.name} className="space-y-1">
        <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
          {field.label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </label>

        <Controller
          name={field.name}
          control={control}
          rules={{
            required: field.required ? `${field.label} es requerido` : false,
            ...field.validation,
          }}
          render={({ field: { onChange, value, ...fieldProps } }) => {
            switch (field.type) {
              case 'textarea':
                return (
                  <textarea
                    {...fieldProps}
                    id={field.name}
                    placeholder={field.placeholder}
                    disabled={field.disabled}
                    className={`${baseInputClasses} min-h-[100px]`}
                    value={value || ''}
                    onChange={onChange}
                  />
                );

              case 'select':
                return (
                  <select
                    {...fieldProps}
                    id={field.name}
                    disabled={field.disabled}
                    className={baseInputClasses}
                    value={value || ''}
                    onChange={onChange}
                    multiple={field.multiple}
                  >
                    <option value="">Seleccionar...</option>
                    {field.options?.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                );

              case 'checkbox':
                return (
                  <div className="flex items-center">
                    <input
                      {...fieldProps}
                      type="checkbox"
                      id={field.name}
                      disabled={field.disabled}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      checked={value || false}
                      onChange={(e) => onChange(e.target.checked)}
                    />
                    <label htmlFor={field.name} className="ml-2 text-sm text-gray-700">
                      {field.description}
                    </label>
                  </div>
                );

              case 'radio':
                return (
                  <div className="space-y-2">
                    {field.options?.map((option) => (
                      <div key={option.value} className="flex items-center">
                        <input
                          type="radio"
                          id={`${field.name}-${option.value}`}
                          name={field.name}
                          value={option.value}
                          disabled={field.disabled}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                          checked={value === option.value}
                          onChange={() => onChange(option.value)}
                        />
                        <label htmlFor={`${field.name}-${option.value}`} className="ml-2 text-sm text-gray-700">
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                );

              case 'file':
                return (
                  <input
                    {...fieldProps}
                    type="file"
                    id={field.name}
                    disabled={field.disabled}
                    accept={field.accept}
                    multiple={field.multiple}
                    className={baseInputClasses}
                    onChange={(e) => {
                      const files = e.target.files;
                      onChange(field.multiple ? files : files?.[0]);
                    }}
                  />
                );

              default:
                return (
                  <input
                    {...fieldProps}
                    type={field.type}
                    id={field.name}
                    placeholder={field.placeholder}
                    disabled={field.disabled}
                    className={baseInputClasses}
                    value={value || ''}
                    onChange={onChange}
                  />
                );
            }
          }}
        />

        {field.description && field.type !== 'checkbox' && (
          <p className="text-xs text-gray-500">{field.description}</p>
        )}

        {hasError && (
          <p className="text-xs text-red-600">{errorMessage}</p>
        )}
      </div>
    );
  };

  const gridClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className={`space-y-6 ${className}`}>
      <div className={`grid ${gridClasses[columns]} gap-6`}>
        {fields.map(renderField)}
      </div>

      <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting || loading}
            className="btn-outline"
          >
            {cancelText}
          </button>
        )}
        
        <button
          type="submit"
          disabled={isSubmitting || loading}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting || loading ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Guardando...
            </div>
          ) : (
            submitText
          )}
        </button>
      </div>
    </form>
  );
}

// Hook para formularios simples
export function useSimpleForm<T extends FieldValues>(
  defaultValues?: Partial<T>
) {
  const form = useForm<T>({
    defaultValues: defaultValues as any,
  });

  return {
    ...form,
    isLoading: form.formState.isSubmitting,
    hasErrors: Object.keys(form.formState.errors).length > 0,
  };
}