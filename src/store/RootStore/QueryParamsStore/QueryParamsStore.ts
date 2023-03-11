import { action, makeObservable, observable } from 'mobx';
import * as qs from 'qs';

import RootStore from '../RootStore';

type PrivateFields = '_params';

export default class QueryParamsStore {
  private _params: qs.ParsedQs = {};
  private _search: undefined | string;
  private _rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this._rootStore = rootStore;
    makeObservable<QueryParamsStore, PrivateFields>(this, {
      _params: observable.ref,
      setSearchCount: action,
      updateCountOnScroll: action,
    });
  }

  getParam(key: string): undefined | string {
    // _params.count всегда строка с числом, _params.search всегда строка или undefined.
    return this._params[key] === undefined
      ? undefined
      : String(this._params[key]);
  }

  updateCountOnScroll(newCount: number) {
    this._params.count = String(newCount);
  }

  setSearchCount(searchCount: string): void {
    searchCount = searchCount.startsWith('?')
      ? searchCount.slice(1)
      : searchCount;
    const newParams = qs.parse(searchCount);

    // Сработает только после первой загрузки страницы.
    if (this._params.count === undefined) {
      this._params.count =
        newParams.count === undefined ? '6' : String(newParams.count);
    }

    if (newParams.search !== this._params.search) {
      this._params.search =
        newParams.search === undefined ? undefined : String(newParams.search);
      if (this._rootStore.recipes.recipes.length !== 0) {
        // Проверка во избежание двойной загрузки в самом начале.
        this._rootStore.recipes.clearRecipes();
        this._rootStore.recipes.fetchRecipes();
      }
    }
  }
}
