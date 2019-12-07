import { Component, OnInit } from '@angular/core';
import { NewsService } from '../news.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {
  data: any;

  constructor(private newsService: NewsService, private router: Router) { }

  ngOnInit() {
    this.newsService.getData('https://newsapi.org/v2/top-headlines?country=us&apiKey=4dd82e746e794e058e94394a0b1a735b').subscribe(data => {
      console.log(data);
      this.data = data;
    });
  }

  irSinglePage(articulo) {
    this.newsService.articuloActual = articulo;
    this.router.navigate(['/news-single']);
  }

}
