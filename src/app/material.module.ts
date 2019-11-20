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
  MatOptionModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatMenuModule,
  MatAutocompleteModule,
  MatChipsModule,
  MatCheckboxModule
} from '@angular/material';
import { ScrollingModule } from '@angular/cdk/scrolling';


@NgModule({
  imports: [
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
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
    MatNativeDateModule,
    MatMenuModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatCheckboxModule,
    ScrollingModule
  ],
  exports: [
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
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
    MatNativeDateModule,
    MatMenuModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatCheckboxModule,
    ScrollingModule
  ]
})
export class MaterialModule {
}
