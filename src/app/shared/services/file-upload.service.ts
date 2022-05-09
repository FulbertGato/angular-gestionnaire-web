import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {




  // API url
  baseApiUrl = "https://urchin-app-3onl3.ondigitalocean.app/api/media/upload"

  constructor(private http:HttpClient) { }

  // Returns an observable
  upload(file:File):Observable<any> {

      let formData = new FormData();
      formData.append('file', file, file.name);

      let body = {
        "key": "6d207e02198a847aa98d0a2a901485a5",
        "source": file,
        "action": "upload",
        "format": "json"
      }
      return this.http.post(this.baseApiUrl, formData,{'headers': {'Content-Type': 'multipart/form-data'}});
  }


}
