import { NgModule } from '@angular/core';

import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatDividerModule, MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatSidenavModule,
  MatSortModule,
  MatTableModule, MatTabsModule,
  MatToolbarModule,
  MatPaginatorModule,
  MatSelectModule,
  MatOptionModule
} from '@angular/material';
import { ScrollingModule } from '@angular/cdk/scrolling';


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
    MatTabsModule,
    MatGridListModule,
    MatPaginatorModule,
    MatSelectModule,
    MatOptionModule,
    ScrollingModule
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
    MatTabsModule,
    MatGridListModule,
    MatPaginatorModule,
    MatSelectModule,
    MatOptionModule,
    ScrollingModule
  ]
})
export class MaterialModule {
}
