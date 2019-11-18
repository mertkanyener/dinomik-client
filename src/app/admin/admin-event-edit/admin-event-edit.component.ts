import { DomSanitizer } from '@angular/platform-browser';
import { UtilityService } from 'src/app/shared/utility.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EventHttpService } from 'src/app/event/event-http.service';
import { EventService } from 'src/app/event/event.service';
import { Subscription } from 'rxjs';
import { Image } from './../../shared/image.model';
import { FormGroup } from '@angular/forms';
import { Event } from 'src/app/shared/event.model';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-admin-event-edit',
  templateUrl: './admin-event-edit.component.html',
  styleUrls: ['./admin-event-edit.component.css']
})
export class AdminEventEditComponent implements OnInit, OnDestroy {

  editMode = false;
  id: number;
  event = new Event();
  form: FormGroup;
  image = new Image('', null);
  imageSubscription: Subscription;
  eventSubscription: Subscription;

  constructor(public eventService: EventService,
              public eventHttpService: EventHttpService,
              public route: ActivatedRoute,
              public router: Router,
              public utilService: UtilityService,
              public sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  private initForm() {
    let name = '';
    
  }

  ngOnDestroy() {

  }

  onCancel() {
    this.navigate();
  }

  navigate() {
    if (this.editMode) {
      this.router.navigate(['../../'], {relativeTo: this.route});
    } else {
      this.router.navigate(['../'], {relativeTo: this.route});
    }
  }

}
