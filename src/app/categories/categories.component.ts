import { Component, OnInit } from '@angular/core';
import { Category } from '../Category';
import {CategoryService} from '../category.service';
import {VirtualScrollService} from '../virtual-scroll.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  private categories: Category[] = [];

  constructor(
    private categoryService: CategoryService,
    private scroll: VirtualScrollService /* Used in HTML */
  ) { }

  ngOnInit() { this.getCategories(); }

  getCategories(): void { this.categoryService.getCategories().subscribe( categories =>  this.categories = categories ); }

}
