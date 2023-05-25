import { Component } from '@angular/core';
import { EmpleadoService } from 'src/app/services/empleado.service';


@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css']
})
export class EmpleadoComponent {
  empleadoList: any = [];
  constructor(private EmpleadoService: EmpleadoService) { }
  getAllempleados() {
    this.EmpleadoService.getAllempleadosData().subscribe((data: {}) => {
      this.empleadoList = data;
    });
  }
  ngOnInit() {
    this.getAllempleados();
  }

}
