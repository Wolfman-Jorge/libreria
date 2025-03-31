import { Component, Input, OnInit } from '@angular/core';
import { Libro } from '../interface/libro';
import { LibroService } from '../service/libro.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-libro',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './libro.component.html',
  styleUrl: './libro.component.css'
})
export class LibroComponent implements OnInit{

  
  @Input() libros: Libro[] = [];

  //Se inyecta el servicio
  constructor(private libroService: LibroService){}

  //permite inicializar el componente una vez ha recibido las propiedades de entrada
  ngOnInit(): void {
      this.getLibros();
  }

  getLibros():void{

      this.libroService.getLibros().subscribe({
        next: (libro)=>{
          this.libros = libro;
          console.log(libro);
        }
      });
  
  }
  
  onSelect(libro: Libro){
    //envia una copia del objeto
    this.libroService.selectedLibro = JSON.parse(JSON.stringify(libro));
    this.libroService.seleccionarLibro(libro);
  }

  get selectedLibroId(){
    return this.libroService.selectedLibro?.id;
  }

  get libroSeleccionado(){
    return this.libroService.libroSeleccionado$;
  }


}
