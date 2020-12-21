import { Component } from '@angular/core';
import { Category } from '@classes/Category';
import { CategoryService } from '@services/category.service';
import { ActivatedRoute } from '@angular/router';
import { CategoriesRequest, Channel } from '@classes/QueryParams'
import { InfiniteScrollableComponent } from '../infinite-scrollable/infinite-scrollable.component';
import { ROUTE_PARAMS } from '@app/enums/route-params';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent extends InfiniteScrollableComponent<Category> {
  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute
  ) {
    super(categoryService, prepareCategory)
  }

  ngOnInit() {
    const idSp : number = parseInt(this.route.snapshot.paramMap.get(ROUTE_PARAMS.ID_SP));
    const query : CategoriesRequest = {
      idsSalesPoint: [idSp],
      start: 0,
      limit : 15,
      enabledForChannels: [Channel.RISTO, Channel.SALE, Channel.SELF_ORDER, Channel.KIOSK],
      itemListVisibility: true
    }
    this.setQuery(query);
    this.getItems();
  }
}

function prepareCategory(cat : Category) : Category {
  let res = cat;
  res.imageUrl = res.imageUrl ?? "/assets/default.png"
  return res;
}
