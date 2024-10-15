import { Routes } from '@angular/router';
import { UsuarioComponent } from './usuario/usuario.component';
import { CrudComponent } from './crud/crud.component';
import { LibroComponent } from './libro/libro.component';
import { AlquilerComponent } from './alquiler/alquiler.component';

export const routes: Routes = [
    
    // : al principio es una variable

    {path: '' , redirectTo:'crud/usuario', pathMatch:'full'},

    {path: 'crud/usuario', component: CrudComponent,
        children: [
            {path: '', component: UsuarioComponent},
        ]
    },
    {path: 'crud/libro', component: CrudComponent,
        children: [
            {path: '', component: LibroComponent}
        ]

    },
    {path: 'crud/alquiler', component: CrudComponent,
        children: [
            {path: '', component: AlquilerComponent}
        ]
    }
];
