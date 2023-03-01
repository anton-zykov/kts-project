import { recipe } from '@store/models';
import { makeObservable, observable, computed, action } from 'mobx';

type PrivateFields = '_recipes';

export default class RootStore {
  private _recipes: recipe[] = [];

  constructor() {
    makeObservable<RootStore, PrivateFields>(this, {
      _recipes: observable.ref,
      recipes: computed,
      setRecipes: action,
    });
  }

  get recipes(): recipe[] {
    return this._recipes;
  }

  setRecipes(updatedRecipes: recipe[]) {
    this._recipes = updatedRecipes;
  }
}
