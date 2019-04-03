import { NgModule } from '@angular/core';

import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatDividerModule,
  MatIconModule,
  MatInputModule,
  MatSidenavModule,
  MatSortModule,
  MatTableModule, MatTabsModule,
  MatToolbarModule
} from '@angular/material';


@NgModule({
  imports: [
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatToolbarModule,
    MatTableModule,
    MatSortModule,
    MatDividerModule,
    MatInputModule,
    MatSidenavModule,
    MatTabsModule
  ],
  exports: [
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatToolbarModule,
    MatTableModule,
    MatSortModule,
    MatDividerModule,
    MatInputModule,
    MatSidenavModule,
    MatTabsModule
  ]
})
export class MaterialModule {
}
