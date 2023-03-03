import { getTenRecipes } from '@services/recipes';
import { recipe } from '@store/models';
import {
  makeObservable,
  observable,
  computed,
  action,
  runInAction,
} from 'mobx';

import { Meta } from './types';

type PrivateFields = '_recipes' | '_meta';

export default class AllRecipesStore {
  private _recipes: recipe[] = [];
  private _meta: Meta = Meta.initial;
  private _rootStore;

  constructor(rootStore: any) {
    // Какая-то сомнительная история с этим типом. Непонятно, как его правильно написать
    this._rootStore = rootStore;
    makeObservable<AllRecipesStore, PrivateFields>(this, {
      _recipes: observable.ref,
      _meta: observable,
      recipes: computed,
      meta: computed,
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

  clearRecipes() {
    this._recipes = [];
  }

  async fetchRecipes(): Promise<any> {
    this._meta = Meta.loading;

    try {
      const data = await getTenRecipes(
        this._recipes.length,
        this._rootStore.query.getParam('search')
      );
      runInAction(() => {
        this._meta = Meta.success;
        this._recipes = this._recipes.concat(data.results);
        return;
      });
    } catch (e: any) {
      alert(e.message);
      this._meta = Meta.error;
    }
  }
}