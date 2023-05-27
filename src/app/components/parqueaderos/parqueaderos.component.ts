import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ParqueaderosService } from 'src/app/services/parqueaderos.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';

@Component({
  selector: 'app-parqueaderos',
  templateUrl: './parqueaderos.component.html',
  styleUrls: ['./parqueaderos.component.css']
})
export class ParqueaderosComponent {
  parqueaderosList: any = [];
  parqueaderosForm: any = this.formBuilder.group({
    pisos: '',
    cantEspacios: '',
    cantDisponibles: ''
  })

  editableParqueaderos: boolean = false;
  idParqueaderos: any;

  constructor(
    private ParqueaderosService: ParqueaderosService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService) { }

  getAllparqueaderos() {
    this.ParqueaderosService.getAllParqueaderosData().subscribe((data: {}) => {
      this.parqueaderosList = data;
    });
  }

  newParqueaderoEntry() {
    this.ParqueaderosService.newParqueaderos(this.parqueaderosForm.value).subscribe(
      () => {
        //Redirigiendo a la ruta actual /parqueaderos y recargando la ventana
        this.router.navigate(['/parqueaderos']).then(() => {
          this.newMessage('Registro exitoso');
        })
      }
    );
  }

  updateParqueaderosEntry() {
    //Removiendo valores vacios del formulario de actualización
    for (let key in this.parqueaderosForm.value) {
      if (this.parqueaderosForm.value[key] === '') {
        this.parqueaderosForm.removeControl(key);
      }
    }
    this.ParqueaderosService.updateParqueaderos(this.idParqueaderos, this.parqueaderosForm.value).subscribe(
      () => {
        //Enviando mensaje de confirmación
        this.newMessage("Parqueadero editado");
      }
    );
  }

  toggleEditParqueaderos(id: any) {
    this.idParqueaderos = id;
    console.log(this.idParqueaderos)
    this.ParqueaderosService.getOneParqueaderos(id).subscribe(
      data => {
        this.parqueaderosForm.setValue({
          pisos: data.pisos,
          cantEspacios: data.cantEspacios,
          cantDisponibles: data.cantDisponibles
        });
      }
    );
    this.editableParqueaderos = !this.editableParqueaderos;
  }

  deleteParqueaderosEntry(id: any) {
    console.log(id)
    this.ParqueaderosService.deleteParqueaderos(id).subscribe(
      () => {
        //Enviando mensaje de confirmación
        this.newMessage("Parqueadero eliminado");
      }
    );
  }

  newMessage(messageText: string) {
    this.toastr.success('Clic aquí para actualizar la lista', messageText)
      .onTap
      .pipe(take(1))
      .subscribe(() => window.location.reload());
  }


  ngOnInit() {
    this.getAllparqueaderos();
  }

}