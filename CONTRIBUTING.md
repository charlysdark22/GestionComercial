# 🤝 Guía de Contribución

¡Gracias por tu interés en contribuir a CRM Adaptable! Esta guía te ayudará a entender cómo puedes colaborar con el proyecto.

## 📋 Código de Conducta

Este proyecto adhiere a un código de conducta. Al participar, se espera que mantengas este código. Por favor reporta comportamientos inaceptables a soporte@crm-adaptable.com.

## 🚀 Cómo Contribuir

### Reportar Bugs

1. **Verifica** que el bug no haya sido reportado anteriormente
2. **Crea** un issue detallado con:
   - Descripción clara del problema
   - Pasos para reproducir
   - Comportamiento esperado vs actual
   - Screenshots si es aplicable
   - Información del entorno (OS, navegador, versión)

### Sugerir Mejoras

1. **Revisa** las issues existentes para evitar duplicados
2. **Crea** un issue con:
   - Descripción clara de la mejora
   - Justificación del cambio
   - Posible implementación

### Desarrollo

#### Configuración del Entorno

1. **Fork** el repositorio
2. **Clona** tu fork:
   ```bash
   git clone https://github.com/tu-usuario/crm-adaptable-system.git
   ```
3. **Instala** las dependencias:
   ```bash
   npm run install:all
   ```
4. **Crea** una rama para tu feature:
   ```bash
   git checkout -b feature/nombre-descriptivo
   ```

#### Estándares de Código

- **TypeScript**: Todo el código debe estar tipado
- **ESLint**: Seguir las reglas de linting configuradas
- **Prettier**: Usar el formato automático
- **Commits**: Usar conventional commits

#### Estructura de Commits

```
tipo(scope): descripción

[cuerpo opcional]

[footer opcional]
```

**Tipos:**
- `feat`: Nueva funcionalidad
- `fix`: Corrección de bug
- `docs`: Cambios en documentación
- `style`: Cambios de formato (no afectan lógica)
- `refactor`: Refactorización de código
- `test`: Agregar o modificar tests
- `chore`: Tareas de mantenimiento

**Ejemplos:**
```bash
feat(clients): add client search functionality
fix(auth): resolve login redirect issue
docs(readme): update installation instructions
```

#### Testing

- Escribir tests para nueva funcionalidad
- Asegurar que todos los tests pasen:
  ```bash
  npm run test
  ```
- Mantener cobertura de código > 80%

#### Pull Requests

1. **Actualiza** tu rama con main:
   ```bash
   git checkout main
   git pull upstream main
   git checkout feature/nombre-descriptivo
   git rebase main
   ```

2. **Ejecuta** tests y linting:
   ```bash
   npm run test
   npm run lint
   ```

3. **Crea** el PR con:
   - Título descriptivo
   - Descripción detallada de cambios
   - Referencias a issues relacionadas
   - Screenshots si aplica

#### Revisión de Código

- Al menos un revisor debe aprobar
- Todos los checks de CI deben pasar
- Resolver todos los comentarios
- Mantener historial limpio (squash si es necesario)

## 📁 Estructura del Proyecto

### Aplicación Web (`web/`)
```
src/
├── components/     # Componentes reutilizables
├── pages/         # Páginas de la aplicación
├── hooks/         # Custom hooks
├── layouts/       # Layouts de página
├── services/      # Servicios API
├── store/         # Estado global
├── types/         # Tipos específicos de web
└── utils/         # Utilidades web
```

### Aplicación Móvil (`mobile/`)
```
src/
├── components/    # Componentes móviles
├── screens/       # Pantallas de la app
├── navigation/    # Configuración de navegación
├── hooks/         # Custom hooks móviles
├── services/      # Servicios API móviles
└── utils/         # Utilidades móviles
```

### Código Compartido (`shared/`)
```
├── types/         # Tipos TypeScript compartidos
├── constants/     # Constantes globales
├── utils/         # Utilidades compartidas
└── components/    # Componentes compartidos
```

## 🎨 Guías de Estilo

### TypeScript
- Usar interfaces para objetos
- Usar enums para constantes relacionadas
- Tipar todas las funciones y variables
- Evitar `any`, usar `unknown` si es necesario

### React
- Componentes funcionales con hooks
- Props tipadas con interfaces
- Usar memo para optimización cuando sea necesario
- Naming: PascalCase para componentes, camelCase para funciones

### CSS/Styling
- **Web**: Usar Tailwind CSS
- **Móvil**: Usar React Native Paper + StyleSheet
- Seguir principios de diseño responsive
- Mantener consistencia visual

### Naming Conventions
- **Archivos**: kebab-case para archivos, PascalCase para componentes
- **Variables**: camelCase
- **Constantes**: UPPER_SNAKE_CASE
- **Funciones**: camelCase, verbos descriptivos

## 🔧 Scripts Útiles

```bash
# Desarrollo
npm run web:dev          # Ejecutar web en desarrollo
npm run mobile:start     # Iniciar Metro Bundler
npm run mobile:android   # Ejecutar en Android
npm run mobile:ios       # Ejecutar en iOS

# Testing
npm run test             # Ejecutar todos los tests
npm run test:watch       # Tests en modo watch
npm run test:coverage    # Tests con cobertura

# Linting y Formato
npm run lint             # Ejecutar ESLint
npm run lint:fix         # Corregir errores de lint automáticamente
npm run format           # Formatear código con Prettier

# Build
npm run web:build        # Build de producción web
npm run mobile:build     # Build de producción móvil
```

## 📚 Recursos

- [Documentación de React](https://reactjs.org/docs)
- [Documentación de React Native](https://reactnative.dev/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [React Native Paper](https://reactnativepaper.com/)

## ❓ Preguntas

Si tienes preguntas sobre cómo contribuir:

1. Revisa la documentación existente
2. Busca en issues cerradas
3. Crea una issue con la etiqueta "question"
4. Únete a nuestro chat de desarrolladores

## 🏆 Reconocimientos

Todos los contribuidores serán reconocidos en nuestro archivo CONTRIBUTORS.md y en la documentación del proyecto.

¡Gracias por ayudar a hacer CRM Adaptable mejor! 🎉