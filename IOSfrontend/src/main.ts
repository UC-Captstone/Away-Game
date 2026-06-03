import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { IosRootComponent } from './app/app';

bootstrapApplication(IosRootComponent, appConfig).catch((err) => console.error(err));
