import {Component, OnDestroy, OnInit} from '@angular/core';
import { Category } from '@classes/Category';
import {CategoryService} from '@services/category.service';
import {VirtualScrollService} from '../../virtual-scroll.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  // Subscriptions
  private categorySub : Observable<Category[]>;

  constructor(
    private categoryService: CategoryService,
    private scroll: VirtualScrollService, // Used in HTML
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const idSp : number = parseInt(this.route.snapshot.paramMap.get("idSp"));
    this.categorySub = this.getCategories(idSp);
  }

  public getCategories(idSp : number): Observable<Category[]> {
    return this.categoryService.getCategories([idSp]);
  }
}
