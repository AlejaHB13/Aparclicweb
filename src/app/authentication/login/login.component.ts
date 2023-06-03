import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(@Inject(DOCUMENT) private document: Document,
    private authenticationService: AuthenticationService,
    private router: Router) { }
  ngOnInit(): void {
    this.document.body.classList.add('bg-gradient-primary');
  }
  onLogin(form: any): void {
    const tipoUsuario = form.value.tipoUsuario;
    this.authenticationService.login(form.value).subscribe(
      (res) => {
        localStorage.setItem('accessToken',JSON.parse(JSON.stringify(res)).accessToken);
        if (tipoUsuario === 'empleado') {
          this.router.navigateByUrl('/cliente');
        } else if (tipoUsuario === 'administrador') {
          // Agrega la ruta correspondiente para administrador
          this.router.navigateByUrl('/empleado');
        } else {
          // Si no se especifica un tipo válido, puedes mostrar un mensaje de error o tomar alguna otra acción
        }
      }
    );
  }


}
