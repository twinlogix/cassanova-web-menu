import { Component, OnInit } from '@angular/core';
import { Category } from '../Category';
import {CategoryService} from '../category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  private categories: Category[];

  constructor(private categoryService: CategoryService) { }

  ngOnInit() { this.getCategories(); }

  getCategories(): void {
    this.categoryService.getCategories().subscribe( categories => this.categories = categories);
  }

}
