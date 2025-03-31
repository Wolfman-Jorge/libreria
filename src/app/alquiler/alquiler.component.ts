import { Component, Output, EventEmitter, Input, input, SimpleChange, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Alquiler } from '../interface/alquiler';
import { AlquilerService } from '../service/alquiler.service';
import { CommonModule } from '@angular/common';
import { User } from '../interface/user';
import { Libro } from '../interface/libro';


@Component({
  selector: 'app-alquiler',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alquiler.component.html',
  styleUrl: './alquiler.component.css'
})
export class AlquilerComponent implements OnInit{


  @Input() alquileres: Alquiler[] = [];
  dateIni: string = '';
  users: User[] = [];
  libros: Libro[] = [];

  constructor(
    private alquilerService: AlquilerService
  ){}
 

    //permite inicializar el componente una vez ha recibido las propiedades de entrada
    ngOnInit(): void {
      this.getAlquileres();
  }

  getAlquileres():void{

      this.alquilerService.getAlquileres().subscribe({
        next: (alquiler)=>{
          this.alquileres = alquiler;
          console.log("prueba de paso");

        }
      });
  
  }

  onDateOrder(){

  }
  
  onSelect(alquiler: Alquiler){

    //envia una copia del objeto
  this.alquilerService.selectedAlquiler = JSON.parse(JSON.stringify(alquiler));
  this.alquilerService.seleccionarAlquiler(alquiler);
  }

  get selectedAlquilerId(){
    return this.alquilerService.selectedAlquiler?.id;
  }

  get alquilerSeleccionado(){
    return this.alquilerService.alquilerSeleccionado$;
  }


}
