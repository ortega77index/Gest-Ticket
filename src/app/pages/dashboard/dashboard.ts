import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SupabaseService } from '../../services/supabase';
import { ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class DashboardComponent implements OnInit {

  

  // PRUEBA
  mensajePrueba = 'FUNCIONA';

  tickets: any[] = [];
  cargando = true;

  constructor(
  private supabase: SupabaseService,
  private router: Router,
  private cdr: ChangeDetectorRef
  ) {}

  filtroPrioridad = 'Todas';
  filtroEstado = 'Todos';

 get ticketsFiltrados() {

  let resultado = this.tickets;

  // Filtro por prioridad
  if (this.filtroPrioridad !== 'Todas') {
    resultado = resultado.filter(
      ticket => ticket.prioridad === this.filtroPrioridad
    );
  }

  // Filtro por estado
  if (this.filtroEstado !== 'Todos') {
    resultado = resultado.filter(
      ticket => ticket.estado === this.filtroEstado
    );
  }

  return resultado;
}

  async ngOnInit() {
    console.log('DASHBOARD CARGADO');
    await this.cargarTickets();
  }

async cargarTickets() {

  this.cargando = true;

  const { data, error } = await this.supabase.getTickets();

  if (!error) {
    this.tickets = data || [];
  }

  this.cargando = false;

  this.cdr.detectChanges();
}

  get ticketsAbiertos(): number {
    return this.tickets.filter(
      ticket => ticket.estado === 'Abierto'
    ).length;
  }

  get ticketsCerrados(): number {
    return this.tickets.filter(
      ticket => ticket.estado === 'Cerrado'
    ).length;
  }
  async cambiarEstado(ticket: any) {

  const nuevoEstado =
    ticket.estado === 'Cerrado'
      ? 'Abierto'
      : 'Cerrado';

  const { error } =
    await this.supabase.actualizarEstado(
      ticket.id,
      nuevoEstado
    );

  if (error) {
    console.error(error);
    return;
  }

  ticket.estado = nuevoEstado;

  this.cdr.detectChanges();
}

  async cerrarSesion() {
    await this.supabase.logout();
    this.router.navigate(['/login']);
  }

  irACrearTicket() {
    this.router.navigate(['/crear-ticket']);
  }
  editarTicket(ticket: any) {

  this.router.navigate([
    '/editar-ticket',
    ticket.id
  ]);

}

async eliminarTicket(ticket: any) {

  const confirmar = confirm(
    `¿Eliminar ticket #${ticket.id}?`
  );

  if (!confirmar) {
    return;
  }

  const { error } =
    await this.supabase.eliminarTicket(ticket.id);

  if (error) {
    console.error(error);
    return;
  }

  await this.cargarTickets();
}
}