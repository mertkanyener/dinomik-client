import { Page } from 'src/app/shared/page-model';
import { HttpResponse } from '@angular/common/http';
import {Injectable} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {Subject} from 'rxjs';
import {DomSanitizer} from '@angular/platform-browser';
import {Image} from './image.model';
import { Event } from './event.model';

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
      console.log('Image url : ', image.dataUrl);
      
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

  createNumberArray(n: number): Array<number> {
    const array = Array(n);
    for (let i = 1; i <= array.length; i++) {
      array[i - 1] = i;
    }
    return array;
  }

  transformObjectArray(objectArray: Array<any>, colSize: number ): Array<any> {
    const rowNum = Math.floor(objectArray.length / colSize + 1);
    const result: Array<Array<any>> = new Array(rowNum);
    let n = 0;
    for (let i = 0; i < result.length; i++) {
        result[i] = objectArray.slice(n, n + colSize);
        n += colSize;
    }
    return result;

  }

  pageResponseMapper(response: HttpResponse<any>): Page {
    const page = new Page();
    page.totalElements = response['totalElements'];
    page.totalPages = response['totalPages'];
    page.first = response['first'];
    page.last = response['last'];
    page.currentPage = response['number'];
    page.objects = response['content'];
    return page;
  }
}

