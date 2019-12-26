import { ProfileComponent } from './user/profile/profile.component';
import { AuthGuard } from './auth/auth-guard.service';
import { FriendDetailComponent } from './user/friend-detail/friend-detail.component';
import { RegisterComponent } from './auth/register/register.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ArtistListComponent} from './artist/artist-list/artist-list.component';
import {ArtistDetailComponent} from './artist/artist-detail/artist-detail.component';
import {VenueListComponent} from './venue/venue-list/venue-list.component';
import {VenueDetailComponent} from './venue/venue-detail/venue-detail.component';
import {EventComponent} from './event/event.component';
import { TestComponent } from './test/test.component';
import { UserLoginComponent } from './auth/user-login/user-login.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { SavedEventsComponent } from './user/saved-events/saved-events.component';
import { FriendsComponent } from './user/friends/friends.component';
import { LikedArtistsComponent } from './user/liked-artists/liked-artists.component';

const appRoutes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)},
  { path: 'sanatcilar', component: ArtistListComponent, pathMatch: 'full' },
  { path: 'sanatcilar/:id', component: ArtistDetailComponent },
  { path: 'mekanlar', component: VenueListComponent },
  { path: 'mekanlar/:id', component: VenueDetailComponent},
  { path: 'etkinlikler/:id', component: EventComponent },
  { path: 'test-path', component: TestComponent },
  { path: 'kayit-ol', component: RegisterComponent },
  { path: 'giris-yap', component: UserLoginComponent },
  { path: 'arama-sonuclari/:name', component: SearchResultComponent, canActivate: [AuthGuard] },
  { path: 'kaydedilenler', component: SavedEventsComponent, canActivate: [AuthGuard] },
  { path: 'gidilecekler', component: SavedEventsComponent, canActivate: [AuthGuard] },
  { path: 'arkadaslar', component: FriendsComponent, canActivate: [AuthGuard]},
  { path: 'kullanicilar/:id', component: FriendDetailComponent, canActivate: [AuthGuard]},
  { path: 'sevilen-sanatcilar', component: LikedArtistsComponent, pathMatch: 'full', canActivate: [AuthGuard]},
  { path: 'profil', component: ProfileComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {
}
