import { AdminGuard } from './admin-guard.service';
import {NgModule} from '@angular/core';
import {Route, RouterModule} from '@angular/router';
import {AdminComponent} from './admin.component';
import {AdminStartComponent} from './admin-start/admin-start.component';
import {AdminEventListComponent} from './admin-event-list/admin-event-list.component';
import {AdminVenueListComponent} from './admin-venue-list/admin-venue-list.component';
import {AdminArtistListComponent} from './admin-artist-list/admin-artist-list.component';
import {AdminEventEditComponent} from './admin-event-edit/admin-event-edit.component';
import {AdminVenueEditComponent} from './admin-venue-edit/admin-venue-edit.component';
import {AdminArtistEditComponent} from './admin-artist-edit/admin-artist-edit.component';
import {AdminLoginComponent} from './admin-login/admin-login.component';

const routes: Route[] = [
  { path: '', component: AdminComponent, children: [
      { path: '', component: AdminLoginComponent },
      { path: 'home', component: AdminStartComponent, canActivate: [AdminGuard] },
      { path: 'events', component: AdminEventListComponent,  canActivate: [AdminGuard] },
      { path: 'venues', component: AdminVenueListComponent, canActivate: [AdminGuard] },
      { path: 'artists', component: AdminArtistListComponent, canActivate: [AdminGuard] },
      { path: 'event/:id/edit', component: AdminEventEditComponent,  canActivate: [AdminGuard]},
      { path: 'events/new', component: AdminEventEditComponent,  canActivate: [AdminGuard] },
      { path: 'venue/:id/edit', component: AdminVenueEditComponent,  canActivate: [AdminGuard] },
      { path: 'venues/new', component: AdminVenueEditComponent,  canActivate: [AdminGuard]},
      { path: 'artist/:id/edit', component: AdminArtistEditComponent, canActivate: [AdminGuard] },
      { path: 'artists/new', component: AdminArtistEditComponent, canActivate: [AdminGuard] }
    ] }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  providers: [AdminGuard]
})
export class AdminRoutingModule {}
