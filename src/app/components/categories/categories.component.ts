import { Component } from '@angular/core';
import { Category } from '@classes/Category';
import { CategoryService } from '@services/category.service';
import { ActivatedRoute } from '@angular/router';
import { CategoriesRequest } from '@classes/QueryParams'
import { InfiniteScrollableComponent } from '../infinite-scrollable/infinite-scrollable.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent extends InfiniteScrollableComponent<Category> {
//Possibile implementazione a mano di virtual scrolling: ascolta evento ridimensionamento finestra e basati sul layout per definire quanti elementi vuoi nel buffer

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute
  ) {
    super(categoryService, prepareCategory)
  }

  ngOnInit() {
    const idSp : number = parseInt(this.route.snapshot.paramMap.get("idSp"));
    const query : CategoriesRequest = {
      idsSalesPoint: [idSp],
      start: 0,
      limit : 15
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