import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SupabaseService } from '../services/supabase';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private supabase: SupabaseService,
    private router: Router
  ) {}

  async canActivate(): Promise<boolean> {
    const { data } = await this.supabase.getUser();

    if (data.user) {
      return true;  // tiene sesión → puede entrar
    } else {
      this.router.navigate(['/login']);  // no tiene sesión → al login
      return false;
    }
  }
}