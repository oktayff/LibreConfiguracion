import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  articuloActual: any;
  constructor(private http: HttpClient) { }

  getData(url) {
    return this.http.get('https://newsapi.org/v2/top-headlines?country=us&apiKey=4dd82e746e794e058e94394a0b1a735b');
  }
}
