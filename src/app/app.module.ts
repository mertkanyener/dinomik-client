import { EventHttpService } from './event/event-http.service';
import { ArtistHttpService } from './artist/artist-http.service';
import { MatPaginatorIntl } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import {MaterialModule} from './material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {HttpClientModule} from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {AppRoutingModule} from './app-routing.module';
import { HomeComponent } from './home/home.component';
import {AuthService} from './auth/auth.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CommonModule} from '@angular/common';
import { ArtistListComponent } from './artist/artist-list/artist-list.component';
import { ArtistDetailComponent } from './artist/artist-detail/artist-detail.component';
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
import { TestComponent } from './test/test.component';
import { AgmCoreModule } from '@agm/core';
import { getTurkishPaginatorIntl } from './shared/turkish-paginator-intl';
import { RegisterComponent } from './auth/register/register.component';
import { FacebookService } from './shared/facebook.service';
import { CookieService } from 'ngx-cookie-service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UserLoginComponent } from './auth/user-login/user-login.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { VenueHttpService } from './venue/venue-http.service';
import { UserService } from './user/user.service';
import { UserHttpService } from './user/user-http.service';
import { SavedEventsComponent } from './user/saved-events/saved-events.component';
import { AttendingEventsComponent } from './user/attending-events/attending-events.component';
import { FriendsComponent } from './user/friends/friends.component';
import { LikedArtistsComponent } from './user/liked-artists/liked-artists.component';
import { FriendDetailComponent } from './user/friend-detail/friend-detail.component';


@NgModule({
   declarations: [
      AppComponent,
      LoginComponent,
      HomeComponent,
      ArtistListComponent,
      ArtistDetailComponent,
      VenueListComponent,
      VenueDetailComponent,
      EventComponent,
      HeaderComponent,
      MenuComponent,
      TestComponent,
      RegisterComponent,
      UserLoginComponent,
      SearchResultComponent,
      SavedEventsComponent,
      AttendingEventsComponent,
      FriendsComponent,
      LikedArtistsComponent,
      FriendDetailComponent
   ],
   imports: [
      BrowserModule,
      CommonModule,
      MaterialModule,
      FlexLayoutModule,
      HttpClientModule,
      AppRoutingModule,
      FontAwesomeModule,
      BrowserAnimationsModule,
      ReactiveFormsModule,
      FormsModule,
      AgmCoreModule.forRoot({
         apiKey: 'AIzaSyCUC95iOlSWV3njBfloU8VR3LWIKlQPRLc'
      }),
   ],
   providers: [
      AuthService,
      HttpService,
      EventService,
      VenueService,
      ArtistService,
      ArtistHttpService,
      EventHttpService,
      VenueHttpService,
      UtilityService,
      FacebookService,
      CookieService,
      UserService,
      UserHttpService,
      { provide: MatPaginatorIntl, useValue: getTurkishPaginatorIntl() }
   ],
   bootstrap: [
      AppComponent
   ],
   entryComponents: [
      LoginComponent
   ]
})
export class AppModule {}


