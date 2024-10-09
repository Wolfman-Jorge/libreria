import { Component } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-crud',
  standalone: true,
  imports: [AppComponent],
  templateUrl: './crud.component.html',
  styleUrl: './crud.component.css'
})
export class CrudComponent {

  deptName: string;
  btName: string;

  constructor(private appComponent: AppComponent){}

  onCreate(): void{
    this.btName = 'create';
    this.deptName = this.appComponent.getDeptName();
  }

  onUpdate(): void{
    this.btName = 'update';
    this.deptName = this.appComponent.getDeptName();
  }

  onShow(): void{
    this.btName = 'show';
    this.deptName = this.appComponent.getDeptName();
  }

  onSearch(): void{
    this.btName = 'search';
    this.deptName = this.appComponent.getDeptName();
  }

  onDelete(): void{
    this.btName = 'delete';
    this.deptName = this.appComponent.getDeptName();
  }

  onSend():void{}

}
