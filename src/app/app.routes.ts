import { Routes } from '@angular/router';
import { UsuarioComponent } from './usuario/usuario.component';
import { CrudComponent } from './crud/crud.component';
import { LibroComponent } from './libro/libro.component';
import { AlquilerComponent } from './alquiler/alquiler.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthLoginGuard } from './authenticate/guard/auth-login.guard';
import { AuthGuard } from './authenticate/guard/auth.guard';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    
    // : al principio es una variable

    {path: '' , redirectTo:'/login', pathMatch:'full'},
        //se añade como data una variable para tener acceso al endpoint
   /* {path: 'crud/usuario', data: {ruta: "usuario"}, component: CrudComponent,
        children: [
            {path: '', component: UsuarioComponent},
        ]
    },*/
   /* {path: 'crud/libro', data: {ruta: "libro"}, component: CrudComponent,
        children: [
            {path: '', component: LibroComponent}
        ]

    },*/
    /*{path: 'crud/alquiler', data: {ruta: "alquiler"}, component: CrudComponent,
        children: [
            {path: '', component: AlquilerComponent}
        ]
    },*/
    {
        path: 'login',
        data: {ruta: "login"},
        component: LoginComponent,
        canActivate: [AuthLoginGuard]
    },
    {
        path: 'dashboard', data: {ruta: "dashboard"}, canActivate: [AuthGuard], component: DashboardComponent,
            children: [
                {path: 'crud/usuario', data: {ruta: "usuario"}, component: CrudComponent,
                children: [
                    {path: '', component: UsuarioComponent}
                ]},
                {path: 'crud/libro', data: {ruta: "libro"}, component: CrudComponent,
                children: [
                    {path: '', component: LibroComponent}
                ]},
                {path: 'crud/alquiler', data: {ruta: "alquiler"}, component: CrudComponent,
                children: [
                    {path: '', component: AlquilerComponent}
                ]}
            ]
    }
];
