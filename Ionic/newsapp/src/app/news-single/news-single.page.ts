import { Component, OnInit } from '@angular/core';
import { NewsService } from '../news.service';

@Component({
  selector: 'app-news-single',
  templateUrl: './news-single.page.html',
  styleUrls: ['./news-single.page.scss'],
})
export class NewsSinglePage implements OnInit {
  articulo;

  constructor(private newsService: NewsService) { }

  ngOnInit() {
    this.articulo = this.newsService.articuloActual;
    console.log(this.newsService.articuloActual);
  }

}
