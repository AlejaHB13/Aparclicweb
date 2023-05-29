import { getLocaleDateTimeFormat } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { EntradaService } from 'src/app/services/entrada.service';

@Component({
  selector: 'app-entrada',
  templateUrl: './entrada.component.html',
  styleUrls: ['./entrada.component.css']
})
export class EntradaComponent {
  entradaForm = this.formBuilder.group({
    placa: '',
    fechaIngreso: Date,
    horaEntrada: getLocaleDateTimeFormat,
  })
  constructor(private entradaService: EntradaService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService) { }
  entradaList: any = [];
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




}
