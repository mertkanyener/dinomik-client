import { NgModule } from '@angular/core';

import {
  MatButtonModule,
  MatCardModule, MatDialogModule, MatIconModule, MatToolbarModule
} from '@angular/material';


@NgModule({
  imports: [
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatToolbarModule
  ],
  exports: [
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatToolbarModule
  ]
})
export class MaterialModule {
}
