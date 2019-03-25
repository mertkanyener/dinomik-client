import {SafeUrl} from "@angular/platform-browser";

export class Image {

  dataUrl: SafeUrl;
  file: File;

  constructor(dataUrl: SafeUrl, file: File) {
    this.dataUrl = dataUrl;
    this.file = file;
  }


}
