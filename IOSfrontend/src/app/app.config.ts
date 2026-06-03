import { ApplicationConfig } from '@angular/core';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { appConfig as frontendAppConfig } from '../../../frontend/src/app/app.config';

export const appConfig: ApplicationConfig = {
  providers: [...(frontendAppConfig.providers ?? []), provideIonicAngular()],
};
