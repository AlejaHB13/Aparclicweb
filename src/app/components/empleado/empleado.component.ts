import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css']
})
export class EmpleadoComponent {
  empleadoList: any = [];
  empleadoForm: any = this.formBuilder.group({
    nombre: '',
    cedula: '',
    usuario: '',
    contrasena: ''
  })

  editableEmpleado: boolean = false;
  idEmpleado: any;

  constructor(
    private EmpleadoService: EmpleadoService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService) { }

  getAllempleados() {
    this.EmpleadoService.getAllempleadosData().subscribe((data: {}) => {
      this.empleadoList = data;
    });
  }

  newEmpleadoEntry() {
    this.EmpleadoService.newEmpleado(this.empleadoForm.value).subscribe(
      () => {
        //Redirigiendo a la ruta actual /empleado y recargando la ventana
        this.router.navigate(['/empleado']).then(() => {
          this.newMessage('Registro exitoso');
        })
      }
    );
  }

  updateEmpleadoEntry() {
    //Removiendo valores vacios del formulario de actualización
    for (let key in this.empleadoForm.value) {
      if (this.empleadoForm.value[key] === '') {
        this.empleadoForm.removeControl(key);
      }
    }
    this.EmpleadoService.updateEmpleado(this.idEmpleado, this.empleadoForm.value).subscribe(
      () => {
        //Enviando mensaje de confirmación
        this.newMessage("Empleado editado");
      }
    );
  }

  toggleEditEmpleado(id: any) {
    this.idEmpleado = id;
    console.log(this.idEmpleado)
    this.EmpleadoService.getOneEmpleado(id).subscribe(
      data => {
        this.empleadoForm.setValue({
          nombre: data.nombre,
          cedula: data.cedula
        });
      }
    );
    this.editableEmpleado = !this.editableEmpleado;
  }

  deleteEmpleadoEntry(id: any) {
    console.log(id)
    this.EmpleadoService.deleteEmpleado(id).subscribe(
      () => {
        //Enviando mensaje de confirmación
        this.newMessage("Empleado eliminado");
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
    this.getAllempleados();
  }

}
