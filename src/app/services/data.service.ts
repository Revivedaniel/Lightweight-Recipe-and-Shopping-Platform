import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  dialogChanges: Subject<boolean> = new Subject<boolean>();
  constructor() {}

  readJsonFile(file: File): Promise<any> {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();

      fileReader.onload = (event: any) => {
        try {
          const json = JSON.parse(event.target.result);
          resolve(json);
        } catch (error) {
          reject(error);
        }
      };

      fileReader.onerror = (error) => {
        reject(error);
      };

      fileReader.readAsText(file);
    });
  }

  downloadJson(data: any, fileName: string) {
    const fileData =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(data));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute('href', fileData);
    downloadAnchorNode.setAttribute('download', `${fileName}.json`);
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }
}
