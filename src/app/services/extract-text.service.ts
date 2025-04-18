import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TextFromImg } from '../data/types';

@Injectable({
  providedIn: 'root',
})
export class ExtractTextService {
  private URL: string =
    'https://service-tracker-python.onrender.com/extract-text';
  constructor(private http: HttpClient) { }
  public getExtracted(file: File): Observable<TextFromImg> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post<TextFromImg>(this.URL, formData);
  }
}
