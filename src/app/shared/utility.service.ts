import {Injectable} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {Subject} from 'rxjs';
import {DomSanitizer} from '@angular/platform-browser';
import {Image} from './image.model';

export interface Grid{
  smRows: number;
  mdRows: number;
  lgRows: number;
}


@Injectable()
export class UtilityService {

  tableFilter(): (data: any, filter:string) => boolean {
    const filterFn = function (data, filter) {
      return data.name.toLowerCase().trim().indexOf(filter) !== -1;
    };
    return filterFn;
  }

  applyFilter(value: string, dataSource: MatTableDataSource<any>) {
    dataSource.filter = value.trim().toLowerCase();
  }

  readImage(input: any, fileChanged: Subject<any>, sanitizer: DomSanitizer, image: Image){

    image.file = input.files[0];
    const reader: FileReader = new FileReader();

    reader.onloadend = (e) => {
      const newImage = new Image(sanitizer.bypassSecurityTrustUrl(reader.result.toString()), image.file);
      fileChanged.next(newImage);
      image.dataUrl = reader.result.toString();
    };
    reader.readAsDataURL(image.file);


  }

  calculateGrid(objectCount: number): Grid {
    const grid: Grid = {
      smRows: Math.floor(objectCount / 2 + 1),
      mdRows: Math.floor(objectCount / 3 + 1),
      lgRows: Math.floor(objectCount / 5 + 1)
    };

    return grid;
  }

  createArray(n: number): any[] {
    return Array(n);
  }

  transformObjectArray(objectArray: Array<any>, colSize: number, rowNum: number ): Array<any> {
    const result: Array<Array<any>> = new Array(rowNum);
    let n = 0;
    for (let i = 0; i < result.length; i++) {
        result[i] = objectArray.slice(n, n + colSize);
        n += colSize;
    }
    return result;

  }












}

