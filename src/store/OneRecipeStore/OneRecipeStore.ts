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
import { notify } from 'utils/notify';
import { Meta } from 'utils/types';
import { ILocalStore } from 'utils/useLocalStore';

type PrivateFields = '_recipe' | '_meta' | '_index' | '_maxIndex';

export default class OneRecipeStore implements ILocalStore {
  private _recipe: RecipeModel | null = null;
  private _meta = Meta.initial;
  private _rootStore: RootStore;
  private _index: number | null = null;
  private _maxIndex: number = 0;

  constructor(id: number, rootStore: RootStore) {
    this._rootStore = rootStore;
    makeObservable<OneRecipeStore, PrivateFields>(this, {
      _recipe: observable,
      _meta: observable,
      _index: observable,
      _maxIndex: observable,
      recipe: computed,
      meta: computed,
      index: computed,
      maxIndex: computed,
      fetchRecipe: action,
    });
  }

  get recipe(): RecipeModel | null {
    return this._recipe;
  }

  get index(): number | null {
    return this._index;
  }

  get maxIndex(): number {
    return this._maxIndex;
  }

  get meta(): Meta {
    return this._meta;
  }

  async fetchRecipe(id: number): Promise<void> {
    this._meta = Meta.loading;
    const recipeIndex = this._rootStore.recipes.recipes.findIndex(
      (r) => r.id === id
    );

    if (recipeIndex !== -1) {
      this._recipe = this._rootStore.recipes.recipes[recipeIndex];
      this._index = recipeIndex;
      this._maxIndex = this._rootStore.recipes.recipes.length - 1;
      this._meta = Meta.success;
      return;
    }

    try {
      const data: RecipeApi = await getOneRecipe(
        id,
        this._rootStore.query.getParam('k') ?? ''
      );
      if (data) {
        runInAction(() => {
          this._recipe = normalizeRecipe(data);
          this._meta = Meta.success;
        });
      } else throw new Error('The server did not send any data.');
    } catch (e: any) {
      notify(e.message);
      this._meta = Meta.error;
      this._recipe = null;
    }
  }

  destroy(): void {
    this._recipe = null;
    this._meta = Meta.initial;
    this._index = null;
    this._maxIndex = 0;
  }
}
