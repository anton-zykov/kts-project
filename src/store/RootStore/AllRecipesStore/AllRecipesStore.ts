import { BASECOUNT } from 'config/constants';
import {
  makeObservable,
  observable,
  computed,
  action,
  runInAction,
} from 'mobx';
import { getRecipes, getRecipesProps } from 'services/recipes';
import { normalizeRecipe, RecipeApi, RecipeModel } from 'store/models';
import { Meta } from 'utils/types';

import RootStore from '../RootStore';

type PrivateFields = '_recipes' | '_meta' | '_maxRecipes';

export default class AllRecipesStore {
  private _recipes: RecipeModel[] = [];
  private _meta = Meta.initial;
  private _rootStore: RootStore;
  private _maxRecipes: number = 0;

  constructor(rootStore: RootStore) {
    this._rootStore = rootStore;
    makeObservable<AllRecipesStore, PrivateFields>(this, {
      _recipes: observable.ref,
      _meta: observable,
      _maxRecipes: observable,
      recipes: computed,
      meta: computed,
      maxRecipes: computed,
      clearRecipes: action,
      fetchRecipes: action,
    });
  }

  get recipes(): RecipeModel[] {
    return this._recipes;
  }

  get meta(): Meta {
    return this._meta;
  }

  get maxRecipes(): number {
    return this._maxRecipes;
  }

  clearRecipes() {
    this._recipes = [];
  }

  async fetchRecipes(): Promise<any> {
    this._meta = Meta.loading;
    try {
      const requestParams: getRecipesProps = {
        offset: this._recipes.length,
        count:
          this.recipes.length > 0
            ? BASECOUNT
            : Number(this._rootStore.query.getParam('count')),
        query: this._rootStore.query.getParam('search') ?? '',
        mealTypes: this._rootStore.query.ArrayOfMealTypes,
        random: this._rootStore.query.getParam('sort') ?? '',
      };
      const data = await getRecipes(requestParams);

      if (!data.hasOwnProperty('results'))
        throw new Error('Server did not respond with data.');

      runInAction(() => {
        this._meta = Meta.success;
        this._recipes = this._recipes.concat(
          data.results.map((r: RecipeApi): RecipeModel => normalizeRecipe(r))
        );
        this._maxRecipes = data.totalResults;
      });
    } catch (e: any) {
      alert(e.message);
      this._meta = Meta.error;
    }
  }
}
