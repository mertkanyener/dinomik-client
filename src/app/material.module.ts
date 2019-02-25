import { NgModule } from '@angular/core';

import {
  MatButtonModule,
  MatCardModule, MatDialogModule
} from '@angular/material';


@NgModule({
  imports: [
    MatButtonModule,
    MatCardModule,
    MatDialogModule
  ],
  exports: [
    MatButtonModule,
    MatCardModule,
    MatDialogModule
  ]
})
export class MaterialModule {
}
