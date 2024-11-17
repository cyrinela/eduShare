import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';  // Import CommonModule
import { HttpClientModule } from '@angular/common/http';  // Import HttpClientModule
import { AppRoutingModule } from './app.routes';


@NgModule({
  imports: [
    CommonModule,       // Import CommonModule to provide common directives like ngFor, ngIf
    HttpClientModule,   // Import HttpClientModule to enable HTTP requests
    AppRoutingModule,
  ],
  exports: [
    CommonModule,       // Export CommonModule so that it's available in other modules or standalone components
    HttpClientModule,   // Export HttpClientModule for HTTP functionality
    AppRoutingModule,
  ]
})
export class SharedModule { }