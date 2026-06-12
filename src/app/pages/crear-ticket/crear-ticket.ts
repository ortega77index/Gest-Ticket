import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from '../../services/supabase';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crear-ticket',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './crear-ticket.html',
  styleUrls: ['./crear-ticket.scss']
})
export class CrearTicketComponent {

  ticket = {  
    titulo: '',
    descripcion: '',
    prioridad: 'Media',
    sede: ''
  };

  cargando = false;
  exito = false;

  constructor(
    private supabase: SupabaseService,
    private router: Router
  ) {}

  async onCrear() {
    // Validación básica
    if (!this.ticket.titulo || !this.ticket.sede) {
      alert('El título y la sede son obligatorios');
      return;
    }

    this.cargando = true;

    const { error } = await this.supabase.createTicket(this.ticket);

    if (error) {
      console.error('Error creando ticket:', error);
      alert('Hubo un error al crear el ticket');
    } else {
      // Ticket creado → volvemos al dashboard
      this.router.navigate(['/dashboard']);
    }

    this.cargando = false;
  }

  volver() {
    this.router.navigate(['/dashboard']);
  }
}