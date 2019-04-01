import {Injectable} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {Subject} from 'rxjs';
import {DomSanitizer} from '@angular/platform-browser';
import {Image} from './image.model';

@Injectable()
export class UtilityService {

  tableFilter() : (data: any, filter:string) => boolean {
    let filterFn = function (data, filter) {
      return data.name.toLowerCase().trim().indexOf(filter) !== -1;
    };
    return filterFn;
  }

  applyFilter(value: string, dataSource: MatTableDataSource<any>) {
    dataSource.filter = value.trim().toLowerCase();
  }

  readImage(input: any, fileChanged: Subject<any>, sanitizer: DomSanitizer, image: Image){

    image.file = input.files[0];
    var reader: FileReader = new FileReader();


    reader.onloadend = (e) => {
      let newImage = new Image(sanitizer.bypassSecurityTrustUrl(reader.result.toString()), image.file);
      fileChanged.next(newImage);
      image.dataUrl = reader.result.toString();
    }
    reader.readAsDataURL(image.file);
  }










}
