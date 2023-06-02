import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpleadoComponent } from './components/empleado/empleado.component';
import { ClienteComponent} from './components/cliente/cliente.component';
import { ParqueaderosComponent } from './components/parqueaderos/parqueaderos.component';
import { EntradaComponent } from './components/entrada/entrada.component';
import { SalidaComponent } from './components/salida/salida.component';
import { VehiculoComponent } from './components/vehiculo/vehiculo.component';

const routes: Routes = [
  {path : 'empleado',component: EmpleadoComponent},
  {path : 'cliente',component: ClienteComponent},
  {path : 'parqueaderos',component: ParqueaderosComponent},
  {path : 'entradavehiculo',component:EntradaComponent},
  {path : 'salidavehiculo',component:SalidaComponent},
  {path : 'vehiculo',component:VehiculoComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
