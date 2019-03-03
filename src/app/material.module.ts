import { NgModule } from '@angular/core';

import {
  MatButtonModule,
  MatCardModule, MatDialogModule, MatIconModule
} from '@angular/material';


@NgModule({
  imports: [
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule
  ],
  exports: [
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule
  ]
})
export class MaterialModule {
}
