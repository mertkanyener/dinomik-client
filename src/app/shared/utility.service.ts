import {Injectable} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {Subject} from 'rxjs';
import {DomSanitizer} from '@angular/platform-browser';

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

  readImage(input: any, fileChanged: Subject<any>, sanitizer: DomSanitizer, base64Image: string){

    var file: File = input.files[0];
    var reader: FileReader = new FileReader();

    reader.onloadend = (e) => {
      fileChanged.next(sanitizer.bypassSecurityTrustUrl(reader.result.toString()));
      base64Image = reader.result.toString();
    }
    reader.readAsDataURL(file);
  }









}
