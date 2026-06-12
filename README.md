#  Mesa de Ayuda TI

Sistema de gestión de tickets de soporte técnico construido con **Angular**, **Supabase** y **Odoo**.

---

##  Descripción

Aplicación web para que empleados de una empresa reporten fallas técnicas, y los técnicos e supervisores puedan gestionar los tickets en tiempo real. El proyecto está pensado como práctica real de integración entre un frontend moderno, una base de datos reactiva y un ERP empresarial.

---

##  Arquitectura

```
Usuario
   │
   ▼
Angular (Frontend)
   │
   ├──────────────────────────────┐
   ▼                              ▼
Supabase                        Odoo
Auth · PostgreSQL · Realtime    Helpdesk · Inventario · XML-RPC
   │                              │
   └──────── Webhook ─────────────┘
```

---

##  Tecnologías

| Capa | Tecnología | Uso |
|------|-----------|-----|
| Frontend | Angular 17+ | Componentes, rutas, formularios |
| Base de datos | Supabase (PostgreSQL) | Tickets, auth, realtime |
| ERP | Odoo | Helpdesk, inventario, flujos |
| Estilos | SCSS | Diseño de componentes |

---

##  Módulos del proyecto

### Fase 1 — Base funcional 
- Login con Supabase Auth (JWT)
- Guards de autenticación por ruta
- Crear ticket desde formulario Angular
- Dashboard con lista de tickets

### Fase 2 — Integración Odoo *(próximamente)*
- Webhook Odoo → Supabase
- Gestión del ciclo de vida del ticket
- Descuento de inventario al resolver

### Fase 3 — Tiempo real y notificaciones *(próximamente)*
- Supabase Realtime: dashboard se actualiza sin recargar
- Notificaciones cuando un ticket cambia a "Asignado"

---

##  Estructura del proyecto

```
src/app/
├── guards/
│   └── auth.guard.ts          ← Protege rutas privadas
├── services/
│   └── supabase.service.ts    ← Lógica de conexión con Supabase
├── pages/
│   ├── login/                 ← Pantalla de inicio de sesión
│   ├── dashboard/             ← Lista y resumen de tickets
│   └── crear-ticket/          ← Formulario para nuevo ticket
└── app.routes.ts              ← Mapa de navegación
```

---

##  Requisitos previos

Antes de ejecutar el proyecto necesitas tener instalado:

- [Node.js](https://nodejs.org/) v18 o superior
- [Angular CLI](https://angular.io/cli) v17 o superior
- Una cuenta gratuita en [Supabase](https://supabase.com)

---

##  Instalación y configuración

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/mesa-ayuda.git
cd mesa-ayuda
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar Supabase

Crea un proyecto en [supabase.com](https://supabase.com) y ejecuta este SQL en el **SQL Editor**:

```sql
CREATE TABLE tickets (
  id BIGSERIAL PRIMARY KEY,
  titulo TEXT NOT NULL,
  descripcion TEXT,
  estado TEXT DEFAULT 'Abierto',
  prioridad TEXT DEFAULT 'Media',
  tecnico TEXT,
  sede TEXT,
  fecha TIMESTAMP DEFAULT NOW()
);

ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Acceso autenticado" ON tickets
  FOR ALL USING (auth.role() = 'authenticated');
```

### 4. Agregar credenciales

Edita el archivo `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  supabaseUrl: 'https://TU_PROJECT_ID.supabase.co',
  supabaseKey: 'TU_PUBLISHABLE_KEY'
};
```

>  **Nunca subas este archivo con tus claves reales a GitHub.** Asegúrate de que `environment.ts` esté en el `.gitignore`.

### 5. Crear usuarios de prueba

En Supabase ve a **Authentication → Users** y crea:

| Correo | Contraseña | Rol |
|--------|-----------|-----|
| juan@empresa.com | 123456 | tecnico |
| ana@empresa.com | 123456 | supervisor |

### 6. Ejecutar la aplicación

```bash
ng serve
```

Abre el navegador en `http://localhost:4200`

---

##  Variables de entorno

| Variable | Descripción |
|----------|-------------|
| `supabaseUrl` | URL del proyecto en Supabase |
| `supabaseKey` | Publishable key (segura para el navegador) |

---

##  Pantallas

| Pantalla | Ruta | Descripción |
|----------|------|-------------|
| Login | `/login` | Inicio de sesión con email y contraseña |
| Dashboard | `/dashboard` | Resumen y lista de tickets |
| Crear ticket | `/crear-ticket` | Formulario para reportar una falla |

---

##  Qué aprenderás con este proyecto

**Angular**
- Componentes standalone
- Servicios e inyección de dependencias
- Guards de autenticación
- Navegación con Router
- Binding de formularios con `ngModel`

**Supabase**
- Autenticación con JWT
- Operaciones CRUD sobre PostgreSQL
- Row Level Security (RLS)
- Realtime subscriptions *(Fase 3)*

**Odoo**
- Módulo Helpdesk
- Gestión de inventario
- Integración via XML-RPC / Webhooks *(Fase 2)*

---

##  Contribuir

Este proyecto es de práctica personal, pero si encuentras algo que mejorar:

1. Haz un fork del repositorio
2. Crea una rama: `git checkout -b mejora/nombre`
3. Haz commit: `git commit -m "Agrega mejora"`
4. Haz push: `git push origin mejora/nombre`
5. Abre un Pull Request

---

## 📄 Licencia

MIT — libre para usar, modificar y aprender.
