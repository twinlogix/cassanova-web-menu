import {Component, OnDestroy, OnInit} from '@angular/core';
import { Category } from '@classes/Category';
import {CategoryService} from '@services/category.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CategoriesRequest } from '@classes/QueryParams'
import { map } from 'rxjs/operators';

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
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const idSp : number = parseInt(this.route.snapshot.paramMap.get("idSp"));
    this.categorySub = this.getCategories({ idsSalesPoint : [idSp]});
  }

  public getCategories(params : CategoriesRequest): Observable<Category[]> {
    return this.categoryService.getCategories(params).pipe(
      map(res => res.map((cat : Category) => this.prepareCategory(cat)))
    );
  }

  private prepareCategory(cat : Category) : Category {
    let res = cat;
    res.imageUrl = res.imageUrl ?? "/assets/default.png"
    return res;
  }

}
