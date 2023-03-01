import { recipe } from '@store/models';
import { makeObservable, observable, computed, action } from 'mobx';

type PrivateFields = '_recipe';

export default class OneRecipeStore {
  private _recipe: recipe | null = null;

  constructor() {
    makeObservable<OneRecipeStore, PrivateFields>(this, {
      _recipe: observable.ref,
      recipe: computed,
      setRecipe: action,
    });
  }

  get recipe(): recipe | null {
    return this._recipe;
  }

  setRecipe(updatedRecipe: recipe) {
    this._recipe = updatedRecipe;
  }

  destroy(): void {}
}
