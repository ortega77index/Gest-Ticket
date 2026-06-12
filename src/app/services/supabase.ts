import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'  // disponible en toda la app
})

export class SupabaseService {

  private supabase: SupabaseClient;

  constructor() {

    console.log('URL:', environment.supabaseUrl);
    console.log('KEY:', environment.supabaseKey);

    // Creamos la conexión con Supabase usando nuestras credenciales
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  // ─── AUTH ──────────────────────────────────────────

  // Iniciar sesión con email y contraseña
  async login(email: string, password: string) {
    return this.supabase.auth.signInWithPassword({ email, password });
  }

  // Cerrar sesión
  async logout() {
    return this.supabase.auth.signOut();
  }

  // Obtener el usuario actual (si hay sesión activa)
  async getUser() {
    return this.supabase.auth.getUser();
  }

  // ─── TICKETS ──────────────────────────────────────

  //Actualizar el estado de un ticket
  

  // Leer todos los tickets (ordenados del más reciente al más antiguo)
async getTickets() {
  return await this.supabase
    .from('tickets')
    .select('*')
    .order('id', { ascending: false });
}

// Actualizar estado de un ticket
async actualizarEstado(id: number, estado: string) {
  return this.supabase
    .from('tickets')
    .update({ estado })
    .eq('id', id);
}

  // Crear un nuevo ticket
  async createTicket(ticket: {
    titulo: string;
    descripcion: string;
    prioridad: string;
    sede: string;
  }) {
    return this.supabase
      .from('tickets')
      .insert(ticket);
  }

  // Obtener ticket por id
async getTicketById(id: number) {
  return this.supabase
    .from('tickets')
    .select('*')
    .eq('id', id)
    .single();
}

// Actualizar ticket completo
async actualizarTicket(
  id: number,
  ticket: {
    titulo: string;
    descripcion: string;
    prioridad: string;
    sede: string;
  }
) {
  return this.supabase
    .from('tickets')
    .update(ticket)
    .eq('id', id);
}

// Eliminar ticket
async eliminarTicket(id: number) {
  return this.supabase
    .from('tickets')
    .delete()
    .eq('id', id);
}
  
}