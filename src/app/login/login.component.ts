import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../service/auth.service';

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
  private username: string = '';
  private password: string = '';

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

  login(): void{
    
    //recupera los datos del formulario reactivo
    /*
    this.username = this.myForm.get("username")?.value,
    this.password = this.myForm.get("password")?.value
*/
    console.log(this.username);
    console.log(this.password);
  
    this.authService.login(this.myForm.get("username").value, this.myForm.get("password").value).subscribe({
      next: () => this.router.navigate(["/dashboard"]),
      error: (err) => console.error("Error de login ", err)
    });
  }

  onMostrar(){
    this.visible = !this.visible;
    this.changeType = !this.changeType;
  }

  onSubmit(){
    this.myForm.reset();
  }



}
