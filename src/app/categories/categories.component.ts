import { Component, OnInit } from '@angular/core';
import { Category } from '../Category';
import {CategoryService} from '../category.service';
import {VirtualScrollService} from '../virtual-scroll.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  private categories: Category[] = [];
  private sp;
  private id;

  constructor(
    private categoryService: CategoryService,
    private scroll: VirtualScrollService, /* Used in HTML */
    private route: ActivatedRoute
  ) {
    route.queryParams.subscribe(e => {
      if (e.hasOwnProperty('sp')) {
        this.sp = e.sp;
        this.id = e.hasOwnProperty('id') ? e.id : undefined;
      }
    });
  }

  ngOnInit() { this.getCategories(); }

  getCategories(): void { this.categoryService.getCategories().subscribe( categories =>  this.categories = categories ); }

}
