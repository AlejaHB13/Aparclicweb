import { formatDate } from '@angular/common';
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
    placa: '',
    tipo: '',
    color: '',
    modelo: '',
    fechayhora: String
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
          placa: data.placa,
          tipo: data.tipo,
          color: data.color,
          modelo: data.modelo,
          fechayhora: this.getValidDate(data.fecha)

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
  getValidDate(fecha: Date) {
    const fechaFinal: Date = new Date(fecha);
    var dd = fechaFinal.getDate();
    var mm = fechaFinal.getMonth() + 1;
    var yyyy = fechaFinal.getFullYear();
    var mes = '';
    var dia = '';

    // Manejar el caso en el que el mes cambie
    if (dd === 31 && mm === 12) {
      dd = 1;
      mm = 1;
      yyyy++;
    } else if (dd === 32) {
      dd = 1;
      mm++;
    }

    // Transformación de fecha cuando el día o mes son menores a 10
    // se le coloca un cero al inicio
    // Día
    if (dd < 10) {
      dia += `0${dd}`;
    } else {
      dia += `${dd}`;
    }
    // Mes
    if (mm < 10) {
      mes += `0${mm}`;
    } else {
      mes += `${mm}`;
    }

    // formatDate para colocar la fecha en un formato aceptado por el calendario
    // GMT-0500 es para Colombia
    var finalDate = formatDate(new Date(yyyy + '-' + mes + '-' + dia + ' GMT-0500'), 'yyyy-MM-dd', 'en-US');
    return finalDate;
  }

}
