import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './custom/auth.interceptor';
import { provideHotToastConfig} from '@ngxpert/hot-toast';
import { provideToastr} from "ngx-toastr";
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideToastr({
      timeOut: 2000,
      preventDuplicates: true
    }),
    provideAnimations()
  ]
};


