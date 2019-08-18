import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ArtistListComponent} from './artist/artist-list/artist-list.component';
import {ArtistDetailComponent} from './artist/artist-detail/artist-detail.component';
import {VenueListComponent} from './venue/venue-list/venue-list.component';
import {VenueDetailComponent} from './venue/venue-detail/venue-detail.component';
import {EventComponent} from './event/event.component';
import { TestComponent } from './test/test.component';

const appRoutes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'admin', loadChildren: './admin/admin.module#AdminModule'},
  { path: 'sanatcilar', component: ArtistListComponent },
  { path: 'sanatcilar/:id', component: ArtistDetailComponent },
  { path: 'mekanlar', component: VenueListComponent },
  { path: 'mekanlar/:id', component: VenueDetailComponent},
  { path: 'etkinlikler/:id', component: EventComponent },
  { path: 'test-path', component: TestComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
