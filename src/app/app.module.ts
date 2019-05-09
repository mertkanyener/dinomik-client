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
import {HttpService} from './shared/http.service';
import {EventService} from './event/event.service';
import {VenueService} from './venue/venue.service';
import {ArtistService} from './artist/artist.service';
import {UtilityService} from './shared/utility.service';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { ArtistCardComponent } from './artist/artist-list/artist-card/artist-card.component';
import { TestComponent } from './test/test.component';

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
      EventComponent,
      HeaderComponent,
      MenuComponent,
      ArtistCardComponent,
      TestComponent
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
   providers: [
      AuthService,
      HttpService,
      EventService,
      VenueService,
      ArtistService,
      UtilityService
   ],
   bootstrap: [
      AppComponent
   ],
   entryComponents: [
      LoginComponent
   ]
})
export class AppModule {}


