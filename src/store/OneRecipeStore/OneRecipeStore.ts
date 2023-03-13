import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from 'mobx';
import { getOneRecipe } from 'services/recipes';
import { normalizeRecipe, RecipeApi, RecipeModel } from 'store/models';
import { RootStore } from 'store/RootStore';
import { Meta } from 'utils/types';
import { ILocalStore } from 'utils/useLocalStore';

type PrivateFields = '_recipe' | '_meta';

export default class OneRecipeStore implements ILocalStore {
  private _recipe: RecipeModel | null = null;
  private _meta: Meta = Meta.initial;
  private _rootStore: RootStore;
  private readonly _id: number;

  constructor(id: number, rootStore: RootStore) {
    this._rootStore = rootStore;
    this._id = id;
    makeObservable<OneRecipeStore, PrivateFields>(this, {
      _recipe: observable,
      _meta: observable,
      recipe: computed,
      meta: computed,
      fetchRecipe: action,
    });
  }

  get recipe(): RecipeModel | null {
    return this._recipe;
  }

  get meta(): Meta {
    return this._meta;
  }

  async fetchRecipe(): Promise<void> {
    this._meta = Meta.loading;
    // Сначала проверяем, есть ли рецепт в основном сторе. При переходе с главной так и будет.
    const recipeInGlobalStore = this._rootStore.recipes.recipes.find(
      (r) => r.id === this._id
    );

    if (recipeInGlobalStore) {
      this._recipe = recipeInGlobalStore;
    } else {
      try {
        const data: RecipeApi = await getOneRecipe(this._id);
        if (data) {
          runInAction(() => {
            this._recipe = normalizeRecipe(data);
            this._meta = Meta.success;
          });
        } else throw new Error('The server did not send any data.');
      } catch (e: any) {
        alert(e.message);
        this._meta = Meta.error;
      }
    }
  }

  destroy(): void {
    this._recipe = null;
    this._meta = Meta.initial;
  }
}
