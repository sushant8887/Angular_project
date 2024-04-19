import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FetchImageService {

  constructor(private http: HttpClient) {}

  GetUserProfileImage(imageReference: string): Observable<string> {
  // Construct the URL to fetch the image data
  const imageUrl = `${imageReference}`;

  const requestBody = { imageData: imageReference };

  // Make an HTTP request to fetch the image data
  return this.http.post(imageUrl, requestBody,{ responseType: 'text' });
}
}
