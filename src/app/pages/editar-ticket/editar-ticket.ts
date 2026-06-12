import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SupabaseService } from '../../services/supabase';

@Component({
  selector: 'app-editar-ticket',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './editar-ticket.html',
  styleUrls: ['./editar-ticket.scss']
})
export class EditarTicketComponent implements OnInit {

  id!: number;

  ticket = {
    titulo: '',
    descripcion: '',
    prioridad: 'Media',
    sede: ''
  };

  cargando = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private supabase: SupabaseService
  ) {}

  async ngOnInit() {

    this.id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    const { data, error } =
      await this.supabase.getTicketById(this.id);

    if (error || !data) {
      this.router.navigate(['/dashboard']);
      return;
    }

    this.ticket = {
      titulo: data.titulo,
      descripcion: data.descripcion,
      prioridad: data.prioridad,
      sede: data.sede
    };
  }

  async guardar() {

    this.cargando = true;

    const { error } =
      await this.supabase.actualizarTicket(
        this.id,
        this.ticket
      );

    this.cargando = false;

    if (error) {
      alert('Error al actualizar');
      return;
    }

    this.router.navigate(['/dashboard']);
  }

  volver() {
    this.router.navigate(['/dashboard']);
  }
}