import { Component } from '@angular/core';
import { IonApp } from '@ionic/angular/standalone';
import { App as WebApp } from '../../../frontend/src/app/app';

@Component({
  selector: 'ios-root',
  standalone: true,
  imports: [IonApp, WebApp],
  template: '<ion-app><app-root></app-root></ion-app>',
  styleUrl: './app.css',
})
export class IosRootComponent {}
