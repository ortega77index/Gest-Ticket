import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth-guard';

export const routes: Routes = [

  // Ruta principal
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  // Login
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login').then(m => m.LoginComponent)
  },

  // Dashboard (protegido)
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./pages/dashboard/dashboard').then(m => m.DashboardComponent)
  },

  // Crear Ticket (protegido)
  {
    path: 'crear-ticket',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./pages/crear-ticket/crear-ticket').then(m => m.CrearTicketComponent)
  },
  {
  path: 'editar-ticket/:id',
  canActivate: [AuthGuard],
  loadComponent: () =>
    import('./pages/editar-ticket/editar-ticket')
      .then(m => m.EditarTicketComponent)
},

  // Ruta no encontrada
  {
    path: '**',
    redirectTo: 'login'
  }

];