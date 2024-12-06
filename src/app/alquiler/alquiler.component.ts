import { Component, Output, EventEmitter } from '@angular/core';
import { Alquiler } from '../interface/alquiler';
import { AlquilerService } from '../service/alquiler.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-alquiler',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alquiler.component.html',
  styleUrl: './alquiler.component.css'
})
export class AlquilerComponent {


  alquileres: Alquiler[];
  @Output() detailAlquiler = new EventEmitter<Alquiler>();
  dateIni: string = '';


  constructor(private alquilerService: AlquilerService){}

    //permite inicializar el componente una vez ha recibido las propiedades de entrada
    ngOnInit(): void {
      this.getAlquileres();
  }

  getAlquileres():void{
    /*Se utiliza el servicio para acceder al get que accede a datos
    this.alquilerService.getAlquiler()
      .subscribe(alquiler => this.alquiler = alquiler); //Esto funciona de forma asíncrona
      //subscribe "convierte" el array que se recibe de forma asíncrona y lo almacena en la propiedad alquileres[]
  */
      this.alquilerService.getAlquileres().subscribe({
        next: (alquiler)=>{
          this.alquileres = alquiler;
          console.log(alquiler);
        }
      });
  
  }
  
  onSelect(alquiler: Alquiler){/*
    this.detailAlquiler.emit(alquiler);
    console.log(alquiler);
*/

    //envia una copia del objeto
  this.alquilerService.selectedAlquiler = JSON.parse(JSON.stringify(alquiler));
  }

  get selectedAlquilerId(){
    return this.alquilerService.selectedAlquiler?.id;
  }

}
