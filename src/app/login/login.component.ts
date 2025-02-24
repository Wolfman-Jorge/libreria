import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { UserAdmin } from '../interface/userAdmin';
import { delay } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, RouterOutlet],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  myForm: FormGroup;
  visible: boolean = true;
  changeType: boolean = true;
  userAdmin: UserAdmin = {} as UserAdmin;

  ngOnInit(): void {
      
  }

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ){
    this.myForm = this.formBuilder.group({
      username:['', Validators.required],
      password:['', Validators.required]
    });
  }
/*
  login(): void{
  
    this.authService.login(this.myForm.get("username").value, this.myForm.get("password").value).subscribe({
      next: () => this.router.navigate(["/dashboard"]),
      error: (err) => console.error("Error de login ", err)
    });
  }
*/
/*
login(): void{
    
  //recupera los datos del formulario reactivo
  /*
  this.username = this.myForm.get("username")?.value,
  this.password = this.myForm.get("password")?.value
*/
/*
  this.authService.login(this.myForm.get("username").value, this.myForm.get("password").value).subscribe({
    next: (data)=>{
      this.getUser(this.authService.getToken());
      console.log(`dentro de next ${this.userAdmin.username}`);
      this.router.navigate(["/dashboard", this.userAdmin.username]);
    },
    error: (err) => console.error("Error de login ", err)
  });
}
*/

login(): void{
    
  //recupera los datos del formulario reactivo
  /*
  this.username = this.myForm.get("username")?.value,
  this.password = this.myForm.get("password")?.value
*/

  this.authService.login(this.myForm.get("username").value, this.myForm.get("password").value).subscribe({
    next: (data)=>{
      this.authService.getUser(this.authService.getToken()).subscribe(result=>{
        this.userAdmin = result;
        //los parámetros en la URL son siempre cadenas de texto, para enviar objetos hay
        //que serializarlos y luego deserializarlos
        this.router.navigate(["/dashboard", { userAdmin: JSON.stringify(this.userAdmin) }]);
      });
      console.log(`dentro de next ${this.userAdmin.username}`);
//      this.router.navigate(["/dashboard", this.userAdmin.username]);
    },
    error: (err) => console.error("Error de login ", err)
  });
}


getUser(data: any): void{
  console.log(`prueba data ${data}`);

  this.authService.getUser(data).subscribe(result=>{
    //console.log(`El usuario es ${result}`);
    this.userAdmin = result;
    console.log(`El usuario getUser ${this.userAdmin.username}`);
  });
  
  
  /*
          this.userService.postUser(this.formUser.get("nombre").value, this.formUser.get("email").value)
        .subscribe({
          next: (user)=>{
            this.users = user;
          }
        });
  */
}

  onMostrar(){
    this.visible = !this.visible;
    this.changeType = !this.changeType;
  }

  onSubmit(){
    this.myForm.reset();
  }



}
