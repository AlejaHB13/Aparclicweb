import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpleadoComponent } from './components/empleado/empleado.component';
import { ClienteComponent} from './components/cliente/cliente.component';
import { ParqueaderosComponent } from './components/parqueaderos/parqueaderos.component';
import { EntradaComponent } from './components/entrada/entrada.component';
import { SalidaComponent } from './components/salida/salida.component';
import { VehiculoComponent } from './components/vehiculo/vehiculo.component';
import { LoginComponent } from './authentication/login/login.component';
import { SignupComponent } from './authentication/signup/signup.component';

const routes: Routes = [
  {path : 'empleado',component: EmpleadoComponent},
  {path : 'cliente',component: ClienteComponent},
  {path : 'parqueaderos',component: ParqueaderosComponent},
  {path : 'entradavehiculo',component:EntradaComponent},
  {path : 'salidavehiculo',component:SalidaComponent},
  {path : 'vehiculo',component:VehiculoComponent},
  {path: 'signup',component: SignupComponent},
  {path: 'login',component: LoginComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
