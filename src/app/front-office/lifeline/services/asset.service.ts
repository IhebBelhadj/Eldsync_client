import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Asset } from '../models/asset';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AssetService {

  private lifelineUrl = environment.lifelineUrl;
  private clientSecret = '54C4EDB9B7A16E4A';


  private headers = new HttpHeaders({
    'Authorization': this.clientSecret,
  })

  constructor(private http: HttpClient) { }

  createAsset(file: File): Observable<{ string: string, asset: Asset }> {
    const formData = new FormData();
    formData.append('file', file);

    const headers = new HttpHeaders({
      'Authorization': this.clientSecret
    });

    return this.http.post<{ string: string, asset: Asset }>(this.lifelineUrl + '/media/upload', formData, { headers });
  }

  getAsset(link: string) {
    console.log('getAsset link:', this.lifelineUrl + link)
    return this.http.get(this.lifelineUrl + link, { headers: this.headers, responseType: 'blob' });
  }
}
