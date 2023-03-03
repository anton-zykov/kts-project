import AllRecipesStore from './AllRecipesStore';
import QueryParamsStore from './QueryParamsStore';

export default class RootStore {
  readonly query;
  readonly recipes;

  constructor() {
    this.query = new QueryParamsStore(this);
    this.recipes = new AllRecipesStore(this);
  }
}
