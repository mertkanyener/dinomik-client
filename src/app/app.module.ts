import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import {MaterialModule} from './material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import { HomeComponent } from './home/home.component';
import {AuthService} from './auth/auth.service';
import {AngularFontAwesomeModule} from "angular-font-awesome";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CommonModule} from '@angular/common';
import { ArtistComponent } from './artist/artist.component';
import { ArtistListComponent } from './artist/artist-list/artist-list.component';
import { ArtistDetailComponent } from './artist/artist-detail/artist-detail.component';
import { VenueComponent } from './venue/venue.component';
import { VenueListComponent } from './venue/venue-list/venue-list.component';
import { VenueDetailComponent } from './venue/venue-detail/venue-detail.component';
import { EventComponent } from './event/event.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ArtistComponent,
    ArtistListComponent,
    ArtistDetailComponent,
    VenueComponent,
    VenueListComponent,
    VenueDetailComponent,
    EventComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    AppRoutingModule,
    AngularFontAwesomeModule,
    BrowserAnimationsModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
  entryComponents: [LoginComponent]
})
export class AppModule {}


