import {
  makeObservable,
  observable,
  computed,
  action,
  runInAction,
} from 'mobx';
import { getSixRecipes } from 'services/recipes';
import { recipe } from 'store/models';

import { Meta } from './types';

type PrivateFields = '_recipes' | '_meta' | '_maxRecipes';

export default class AllRecipesStore {
  private _recipes: recipe[] = [];
  private _meta: Meta = Meta.initial;
  private _rootStore;
  private _maxRecipes: number = 0;

  constructor(rootStore: any) {
    // Какая-то сомнительная история с этим типом. Непонятно, как его правильно написать
    this._rootStore = rootStore;
    makeObservable<AllRecipesStore, PrivateFields>(this, {
      _recipes: observable.ref,
      _meta: observable.ref,
      _maxRecipes: observable.ref,
      recipes: computed,
      meta: computed,
      maxRecipes: computed,
      clearRecipes: action,
      fetchRecipes: action,
    });
  }

  get recipes(): recipe[] {
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
      const data = await getSixRecipes(
        this._recipes.length,
        this._rootStore.query.getParam('count'),
        this._rootStore.query.getParam('search')
      );
      runInAction(() => {
        this._meta = Meta.success;
        this._recipes = this._recipes.concat(data.results);
        this._maxRecipes = data.totalResults;
        this._rootStore.query.updateCountOnScroll(this._recipes.length);
      });
    } catch (e: any) {
      alert(e.message);
      this._meta = Meta.error;
    }
  }
}
