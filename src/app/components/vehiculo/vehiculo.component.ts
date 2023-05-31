import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { VehiculoService } from 'src/app/services/vehiculo.service';

@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.component.html',
  styleUrls: ['./vehiculo.component.css']
})
export class VehiculoComponent {

  vehiculoList: any = [];
  vehiculoForm: any = this.formBuilder.group({
    tipo: '',
    placa: '',
    color: '',
    modelo: ''
  })

  editableVehiculo: boolean = false;
  idVehiculo: any;

  constructor(
    private VehiculoService: VehiculoService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService) { }
  getAllvehiculo() {
    this.VehiculoService.getAllVehiculoData().subscribe((data: {}) => {
      this.vehiculoList = data;
    });
  }

  newVehiculoEntry() {
    this.VehiculoService.newVehiculo(this.vehiculoForm.value).subscribe(
      () => {
        //Redirigiendo a la ruta actual /vehiculo y recargando la ventana
        this.router.navigate(['/vehiculo']).then(() => {
          this.newMessage('Registro exitoso');
        })
      }
    );
    }

  


updateVehiculoEntry() {
  //Removiendo valores vacios del formulario de actualización
  for (let key in this.vehiculoForm.value) {
    if (this.vehiculoForm.value[key] === '') {
      this.vehiculoForm.removeControl(key);
    }
  }
  this.VehiculoService.updateVehiculo(this.idVehiculo, this.vehiculoForm.value).subscribe(
    () => {
      //Enviando mensaje de confirmación
      this.newMessage("vehiculo editado");
    }
  );
}

deleteVehiculoEntry(id: any) {
  console.log(id)
  this.VehiculoService.deleteVehiculo(id).subscribe(
    () => {
      //Enviando mensaje de confirmación
      this.newMessage("Vehiculo eliminado");
    }
  );
}


toggleEditVehiculo(id: any) {
  this.idVehiculo = id;
  console.log(this.idVehiculo)
  this.VehiculoService.getOneVehiculo(id).subscribe(
    data => {
      this.vehiculoForm.setValue({
        tipo: data.tipo,
        placa: data.placa,
        color: data.color,
        modelo: data.modelo

      });
    }
  );
  this.editableVehiculo = !this.editableVehiculo;
}

ngOnInit() {
  this.getAllvehiculo();
}


newMessage(messageText: string) {
  this.toastr.success('Clic aquí para actualizar la lista', messageText)
    .onTap
    .pipe(take(1))
    .subscribe(() => window.location.reload());
}
}
