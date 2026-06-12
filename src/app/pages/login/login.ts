import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from '../../services/supabase';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})

 
  
export class LoginComponent {

  email = '';
  password = '';
  error = '';
  cargando = false;

  constructor(
    private supabase: SupabaseService,
    private router: Router
  ) {}

async onLogin() {

  console.time('login');

  this.cargando = true;
  this.error = '';

  const resultado = await this.supabase.login(
    this.email,
    this.password
  );

  console.timeEnd('login');

  if (resultado.error) {
    this.error = resultado.error.message;
  } else {
    this.router.navigate(['/dashboard']);
  }

  this.cargando = false;
}
}