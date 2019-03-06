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

const routes: Route[] = [
  { path: '', component: AdminComponent, children: [
      { path: '', component: AdminStartComponent },
      { path: 'events', component: AdminEventListComponent, pathMatch: 'full' },
      { path: 'venues', component: AdminVenueListComponent },
      { path: 'artists', component: AdminArtistListComponent },
      { path: 'event/:id/edit', component: AdminEventEditComponent, pathMatch: 'full'},
      { path: 'events/new', component: AdminEventEditComponent, pathMatch: 'full' },
      { path: 'venue/:id/edit', component: AdminVenueEditComponent, pathMatch: 'full' },
      { path: 'venues/new', component: AdminVenueEditComponent, pathMatch: 'full'},
      { path: 'artist/:id/edit', component: AdminArtistEditComponent, pathMatch: 'full' },
      { path: 'artists/new', component: AdminArtistEditComponent, pathMatch: 'full' }
    ] }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
