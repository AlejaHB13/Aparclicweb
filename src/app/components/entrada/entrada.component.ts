import { formatDate, getLocaleDateTimeFormat } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { EntradaService } from 'src/app/services/entrada.service';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-entrada',
  templateUrl: './entrada.component.html',
  styleUrls: ['./entrada.component.css']
})
export class EntradaComponent {
  entradaList: any = [];
  entradaForm: any = this.formBuilder.group({
    placa: '',
    fechayhora: String
    //horaEntrada: this.getValidDate(new Date()), // Puedes ajustar la función si es necesario
  })
  editableEntrada: boolean = false;
  idEntrada: any;
  constructor(private entradaService: EntradaService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService) { }

  getAllEntradas() {
    this.entradaService.getAllEntradaData().subscribe((data: {}) => {
      this.entradaList = data;
    });
  }
  ngOnInit() {
    this.getAllEntradas();
  }

  newEntradaEntry() {

    this.entradaService.newEntrada(this.entradaForm.value).subscribe(
      () => {
        
        console.log('llega')
        //Redirigiendo a la ruta actual /animal y recargando la ventana
        this.router.navigate(['/entradavehiculo']).then(() => {
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
  updateEntradaEntry() {
    //Removiendo valores vacios del formulario de actualización
    for (let key in this.entradaForm.value) {
      if (this.entradaForm.value[key] === '') {
        this.entradaForm.removeControl(key);
      }
    }
    this.entradaService.updateEntrada(this.idEntrada, this.entradaForm.value).subscribe(
      () => {
        //Enviando mensaje de confirmación
        this.newMessage("Entrada editada");
      }
    );
  }
 
  toggleEditEntrada(id: any) {
    this.idEntrada = id;
    console.log(this.idEntrada)
    this.entradaService.getOneEntrada(id).subscribe(
      data => {
        this.entradaForm.setValue({
          placa: data.placa,
          fechayhora: this.getValidDate(data.fecha)
        });
      }
    );
    this.editableEntrada = !this.editableEntrada;
  }
  deleteEntradaEntry(id: any) {
    console.log(id)
    this.entradaService.deleteEntrada(id).subscribe(
      () => {
        //Enviando mensaje de confirmación
        this.newMessage("Entrada eliminada");
      }
    );
  }
  getValidDate(fecha: Date) {
    const fechaFinal: Date = new Date(fecha );
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