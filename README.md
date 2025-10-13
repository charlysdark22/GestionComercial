# 🚀 CRM Adaptable - Sistema de Gestión Empresarial Completo

![CRM Adaptable](https://img.shields.io/badge/CRM-Adaptable-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react)
![React Native](https://img.shields.io/badge/React%20Native-0.72.6-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.1.0-3178C6?style=for-the-badge&logo=typescript)

## 📋 Descripción

**CRM Adaptable** es un sistema de gestión empresarial completo y flexible que integra todas las herramientas que tu negocio necesita en una sola plataforma. Desarrollado con React para web y React Native para móvil, ofrece una experiencia unificada en todos los dispositivos.

### ✨ Características Principales

- ✅ **Gestión de proyectos** - Administra proyectos, tareas y equipos
- ✅ **Integración con WhatsApp** - Comunicación directa con clientes
- ✅ **Marketing automatizado** - Campañas y automatización
- ✅ **Gestión de fabricación** - Control de procesos productivos
- ✅ **Contabilidad** - Gestión financiera completa
- ✅ **Administración inmobiliaria** - Gestión de propiedades
- ✅ **Control de activos** - Inventario de activos empresariales
- ✅ **Ventas y compras** - Transacciones comerciales
- ✅ **Inventarios** - Control de stock en tiempo real
- ✅ **Gestión de gastos** - Seguimiento de gastos empresariales
- ✅ **Administración de clientes** - CRM completo
- ✅ **Contratos** - Gestión de contratos y acuerdos
- ✅ **Gestión de leads** - Seguimiento de prospectos
- ✅ **Calendario de eventos** - Programación y seguimiento
- ✅ **Chat interno** - Comunicación del equipo
- ✅ **Gestión de empleados** - Recursos humanos
- ✅ **Facturación** - Generación de facturas
- ✅ **Recordatorios** - Sistema de notificaciones

## 🏗️ Arquitectura del Proyecto

```
crm-adaptable-system/
├── web/                    # Aplicación web (React + Vite)
│   ├── src/
│   │   ├── components/     # Componentes reutilizables
│   │   ├── pages/         # Páginas de la aplicación
│   │   ├── hooks/         # Custom hooks
│   │   ├── layouts/       # Layouts de página
│   │   └── services/      # Servicios API
├── mobile/                # Aplicación móvil (React Native)
│   ├── src/
│   │   ├── components/    # Componentes móviles
│   │   ├── screens/       # Pantallas de la app
│   │   ├── navigation/    # Navegación
│   │   └── hooks/         # Custom hooks móviles
├── shared/                # Código compartido
│   ├── types/            # Tipos TypeScript
│   ├── constants/        # Constantes
│   └── utils/            # Utilidades compartidas
└── docs/                 # Documentación
```

## 🚀 Instalación y Configuración

### Prerrequisitos

- **Node.js** >= 16.0.0
- **npm** >= 8.0.0
- **React Native CLI** (para desarrollo móvil)
- **Android Studio** (para Android)
- **Xcode** (para iOS, solo macOS)

### Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/crm-adaptable-system.git
   cd crm-adaptable-system
   ```

2. **Instalar dependencias**
   ```bash
   npm run install:all
   ```

3. **Configurar variables de entorno**
   ```bash
   # Copiar archivos de ejemplo
   cp web/.env.example web/.env
   cp mobile/.env.example mobile/.env
   ```

### 🌐 Ejecutar Aplicación Web

```bash
# Desarrollo
npm run web:dev

# Construcción para producción
npm run web:build
```

La aplicación web estará disponible en `http://localhost:3000`

### 📱 Ejecutar Aplicación Móvil

```bash
# Iniciar Metro Bundler
npm run mobile:start

# Android
npm run mobile:android

# iOS (solo macOS)
npm run mobile:ios
```

## 🔐 Credenciales de Prueba

Para acceder al sistema utiliza las siguientes credenciales:

- **Email:** `admin@crm.com`
- **Contraseña:** `admin123`

## 🎨 Tecnologías Utilizadas

### Frontend Web
- **React 18.2.0** - Biblioteca de interfaz de usuario
- **TypeScript** - Tipado estático
- **Vite** - Herramienta de construcción rápida
- **Tailwind CSS** - Framework de CSS utilitario
- **React Router** - Enrutamiento
- **React Query** - Gestión de estado del servidor
- **Zustand** - Gestión de estado global
- **Headless UI** - Componentes accesibles
- **Heroicons** - Iconografía

### Frontend Móvil
- **React Native 0.72.6** - Framework móvil multiplataforma
- **React Navigation 6** - Navegación móvil
- **React Native Paper** - Componentes Material Design
- **React Native Vector Icons** - Iconografía
- **AsyncStorage** - Almacenamiento local

### Compartido
- **TypeScript** - Tipado estático compartido
- **Axios** - Cliente HTTP
- **Date-fns** - Manipulación de fechas
- **React Query** - Gestión de estado del servidor

## 📚 Módulos Principales

### 👥 Gestión de Clientes
- Registro y administración de clientes
- Historial de interacciones
- Segmentación y etiquetado
- Información de contacto completa

### 📊 Proyectos y Tareas
- Creación y seguimiento de proyectos
- Asignación de tareas y equipos
- Control de progreso y deadlines
- Gestión de presupuestos

### 💰 Ventas y Facturación
- Registro de ventas y compras
- Generación automática de facturas
- Seguimiento de pagos
- Reportes financieros

### 📦 Inventario y Activos
- Control de stock en tiempo real
- Gestión de productos y servicios
- Seguimiento de activos empresariales
- Alertas de stock bajo

### 📱 Integración WhatsApp
- Comunicación directa con clientes
- Automatización de mensajes
- Historial de conversaciones
- Plantillas de mensajes

## 🔧 Configuración Avanzada

### Variables de Entorno

#### Web (.env)
```env
VITE_API_URL=http://localhost:8000
VITE_WHATSAPP_API_URL=https://graph.facebook.com/v17.0
VITE_APP_NAME=CRM Adaptable
```

#### Móvil (.env)
```env
API_URL=http://localhost:8000
WHATSAPP_API_URL=https://graph.facebook.com/v17.0
APP_NAME=CRM Adaptable
```

### Personalización de Tema

El sistema incluye un sistema de temas personalizable. Puedes modificar los colores y estilos en:

- **Web:** `web/tailwind.config.js`
- **Móvil:** `mobile/src/theme.ts`

## 🧪 Testing

```bash
# Ejecutar tests
npm run test

# Tests con cobertura
npm run test:coverage

# Linting
npm run lint
```

## 📱 Construcción para Producción

### Web
```bash
npm run web:build
```

### Móvil Android
```bash
cd mobile/android
./gradlew assembleRelease
```

### Móvil iOS
```bash
cd mobile/ios
xcodebuild -workspace CRMAdaptable.xcworkspace -scheme CRMAdaptable -configuration Release archive
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🆘 Soporte

Si tienes alguna pregunta o necesitas ayuda:

- 📧 Email: soporte@crm-adaptable.com
- 💬 Chat: [Abrir chat de soporte](https://crm-adaptable.com/chat)
- 📚 Documentación: [docs.crm-adaptable.com](https://docs.crm-adaptable.com)

## 🗺️ Roadmap

- [ ] Integración con más plataformas de mensajería
- [ ] Dashboard analytics avanzado
- [ ] API REST completa
- [ ] Aplicación de escritorio (Electron)
- [ ] Integración con sistemas ERP
- [ ] Módulo de inteligencia artificial
- [ ] Aplicación web progresiva (PWA)

---

**Desarrollado con ❤️ para optimizar la gestión de tu negocio**