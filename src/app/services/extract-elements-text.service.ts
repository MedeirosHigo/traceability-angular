import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TextFromImg, Traceability } from '../data/types';

@Injectable({
  providedIn: 'root',
})
export class ExtractElementsTextService {
  private URL: string =
    'https://tracker-backend-java-spring.onrender.com/api/traceability/trace';
  constructor(private http: HttpClient) { }

  public geExtractedElementsText(text: TextFromImg): Observable<Traceability> {
    return this.http.post<Traceability>(this.URL, text);
  }
}
