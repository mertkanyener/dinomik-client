import { AgmCoreModule } from '@agm/core';
import {NgModule} from '@angular/core';
import {AdminComponent} from './admin.component';
import {AdminStartComponent} from './admin-start/admin-start.component';
import {AdminArtistEditComponent} from './admin-artist-edit/admin-artist-edit.component';
import {AdminArtistListComponent} from './admin-artist-list/admin-artist-list.component';
import {AdminEventListComponent} from './admin-event-list/admin-event-list.component';
import {AdminEventEditComponent} from './admin-event-edit/admin-event-edit.component';
import {AdminVenueEditComponent} from './admin-venue-edit/admin-venue-edit.component';
import {AdminVenueListComponent} from './admin-venue-list/admin-venue-list.component';
import {CommonModule} from '@angular/common';
import {AdminRoutingModule} from './admin-routing.module';
import {MaterialModule} from '../material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {HttpClientModule} from '@angular/common/http';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { ResponseDialogComponent } from './response-dialog/response-dialog.component';

@NgModule({
  declarations: [
    AdminComponent,
    AdminStartComponent,
    AdminArtistEditComponent,
    AdminArtistListComponent,
    AdminEventListComponent,
    AdminEventEditComponent,
    AdminVenueEditComponent,
    AdminVenueListComponent,
    DeleteDialogComponent,
    AdminLoginComponent,
    ResponseDialogComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    AngularFontAwesomeModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCUC95iOlSWV3njBfloU8VR3LWIKlQPRLc'
   })
  ],
  entryComponents: [
    DeleteDialogComponent
  ],
})
export class AdminModule {

}
