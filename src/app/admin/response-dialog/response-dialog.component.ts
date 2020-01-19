import { AdminHttpResponse } from './../../shared/admin-http-response.int';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-response-dialog',
  templateUrl: './response-dialog.component.html',
  styleUrls: ['./response-dialog.component.css']
})
export class ResponseDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ResponseDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: AdminHttpResponse) { }

  ngOnInit() {
  }



}
