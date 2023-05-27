import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpleadoComponent } from './components/empleado/empleado.component';
import { ClienteComponent} from './components/cliente/cliente.component';
import { ParqueaderosComponent } from './components/parqueaderos/parqueaderos.component';

const routes: Routes = [
  {path : 'empleado',component: EmpleadoComponent},
  {path : 'cliente',component: ClienteComponent},
  {path : 'parqueaderos',component: ParqueaderosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
