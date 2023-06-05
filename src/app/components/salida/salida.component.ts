import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { SalidaService } from 'src/app/services/salida.service';

@Component({
  selector: 'app-salida',
  templateUrl: './salida.component.html',
  styleUrls: ['./salida.component.css']
})
export class SalidaComponent {
  salidaList: any = [];
  salidaForm: any = this.formBuilder.group({
    tipoVehiculo: '',
    placaVehiculo: '',
    fechayhora: String,
    costo:''

  })
  editableSalida: boolean = false;
  idSalida: any;
  constructor(private salidaService: SalidaService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService) { }

  getAllSalidas() {
    this.salidaService.getAllSalidaData().subscribe((data: {}) => {
      this.salidaList = data;
    });
  }
  ngOnInit() {
    this.getAllSalidas();
  }

  newSalidaEntry() {

    this.salidaService.newSalida(this.salidaForm.value).subscribe(
      (data) => {
        this.salidaForm.controls['costo'].setValue(data);
        console.log('llega')
        console.log(data)
        //Redirigiendo a la ruta actual /animal y recargando la ventana
        this.router.navigate(['/salidavehiculo']).then(() => {
          this.newMessage('Registro exitoso');
        })
      }
    );
  }

  newMessage(messageText: string) {
    this.toastr.success('Clic aquí para actualizar la lista', messageText)
      .onTap
      .pipe(take(1))
      .subscribe(() => window.location.reload());
  }
  updateSalidaEntry() {
    //Removiendo valores vacios del formulario de actualización
    for (let key in this.salidaForm.value) {
      if (this.salidaForm.value[key] === '') {
        this.salidaForm.removeControl(key);
      }
    }
    this.salidaService.updateSalida(this.idSalida, this.salidaForm.value).subscribe(
      () => {
        //Enviando mensaje de confirmación
        this.newMessage("Salida editado");
      }
    );
  }

  toggleEditSalida(id: any) {
    this.idSalida = id;
    console.log(this.idSalida)
    this.salidaService.getOneSalida(id).subscribe(
      data => {
        this.salidaForm.setValue({
          tipoVehiculo: data.tipoVehiculo,
          placaVehiculo: data.placaVehiculo,
          tipo: data.tipo,
          fechayhora: this.getValidDate(data.fechayhora)
        });
      }
    );
    this.editableSalida = !this.editableSalida;
  }
  deleteSalidaEntry(id: any) {
    console.log(id)
    this.salidaService.deleteSalida(id).subscribe(
      () => {
        //Enviando mensaje de confirmación
        this.newMessage("Salida eliminado");
      }
    );
  }
  getValidDate(fecha: Date) {
    const fechaFinal: Date = new Date(fecha);
    //separado los datos
    var dd = fechaFinal.getDate() + 1;//fue necesario porque siempre daba un día antes
    var mm = fechaFinal.getMonth() + 1; //porque Enero es 0
    var yyyy = fechaFinal.getFullYear();
    var mes = '';
    var dia = '';
    //Como algunos meses tienen 31 días dd puede dar 32
    if (dd == 32) {
      dd = 1;
      mm++;
    }
    //Transformación de fecha cuando el día o mes son menores a 10
    //se le coloca un cero al inicio
    //Día
    if (dd < 10) {
      dia += `0${dd}`;
    } else {
      dia += `${dd}`;
    }
    //Mes
    if (mm < 10) {
      mes += `0${mm}`;
    } else {
      mes += `${mm}`;
    }
    //formatDate para colocar la fecha en un formato aceptado por el calendario
    //GMT-0500 es para Colombia
    var finalDate = formatDate(new Date(yyyy + '-' + mes + '-' + dia + ' GMT-0500'), 'yyyy-MM-dd', "en-US");
    return finalDate;
  }


}
