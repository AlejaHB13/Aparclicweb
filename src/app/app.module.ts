import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmpleadoComponent } from './components/empleado/empleado.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ClienteComponent} from './components/cliente/cliente.component';
import { ToastrModule } from 'ngx-toastr';
import { ParqueaderosComponent } from './components/parqueaderos/parqueaderos.component';
import { EntradaComponent } from './components/entrada/entrada.component';
import { HoraMilitarPipe } from './hora-militar.pipe';
import { SalidaComponent } from './components/salida/salida.component';
import { VehiculoComponent } from './components/vehiculo/vehiculo.component';
import { LoginComponent } from './authentication/login/login.component';
import { SignupComponent } from './authentication/signup/signup.component';



  @NgModule({
  declarations: [
    AppComponent,
    EmpleadoComponent,
    ClienteComponent,
    ParqueaderosComponent,
    EntradaComponent,
    HoraMilitarPipe,
    SalidaComponent,
    VehiculoComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
       positionClass: 'toast-bottom-right'
       }),
      
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
