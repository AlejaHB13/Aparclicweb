import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { ClienteService } from 'src/app/services/cliente.service';


@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent {

  clienteList: any = [];
  clienteForm: any = this.formBuilder.group({
    nombre: '',
    cedula: '',
    telefono: ''
  })

  editableCliente: boolean = false;
  idCliente: any;

  constructor(
    private ClienteService: ClienteService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService) { }
  getAllclientes() {
    this.ClienteService.getAllClientesData().subscribe((data: {}) => {
      this.clienteList = data;
    });
  }

  newClienteEntry() {
    this.ClienteService.newCliente(this.clienteForm.value).subscribe(
      () => {
        //Redirigiendo a la ruta actual /animal y recargando la ventana
        this.router.navigate(['/cliente']).then(() => {
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

  updateClienteEntry() {
    //Removiendo valores vacios del formulario de actualización
    for (let key in this.clienteForm.value) {
      if (this.clienteForm.value[key] === '') {
        this.clienteForm.removeControl(key);
      }
    }
    this.ClienteService.updateCliente(this.idCliente, this.clienteForm.value).subscribe(
      () => {
        //Enviando mensaje de confirmación
        this.newMessage("cliente editado");
      }
    );
  }

  deleteClienteEntry(id: any) {
    console.log(id)
    this.ClienteService.deleteCliente(id).subscribe(
      () => {
        //Enviando mensaje de confirmación
        this.newMessage("Cliente eliminado");
      }
    );
  }


  toggleEditCliente(id: any) {
    this.idCliente = id;
    console.log(this.idCliente)
    this.ClienteService.getOneCliente(id).subscribe(
      data => {
        this.clienteForm.setValue({
          nombre: data.nombre,
          cedula: data.cedula,
          telefono: data.telefono
        });
      }
    );
    this.editableCliente = !this.editableCliente;
  }

  ngOnInit() {
    this.getAllclientes();
  }

}