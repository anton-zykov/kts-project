import { BASECOUNT } from 'config/constants';
import { action, computed, makeObservable, observable } from 'mobx';
import * as qs from 'qs';
import { MealType, mealTypes } from 'utils/types';

type PrivateFields = '_params';

export default class QueryParamsStore {
  private _params: qs.ParsedQs = {};

  constructor() {
    makeObservable<QueryParamsStore, PrivateFields>(this, {
      _params: observable.ref,
      ArrayOfMealTypes: computed,
      URLParams: computed,
      setCount: action,
      setSearch: action,
      setTypes: action,
      setSort: action,
      setSearchCount: action,
    });
  }

  getParam(key: string): undefined | string {
    // _params.count всегда строка с числом, _params.search, _params.mealType, _params.sort всегда строка или undefined.
    return this._params[key] === undefined
      ? undefined
      : String(this._params[key]);
  }

  get ArrayOfMealTypes(): MealType[] {
    if (!this._params.type) return [];
    else {
      const categoriesKeys = (this._params.type as string)
        .replaceAll(/\+/g, ' ')
        .split(',');
      return mealTypes.filter((mt) => categoriesKeys?.includes(mt.key));
    }
  }

  get URLParams(): string {
    return (
      '?' +
      [
        `count=${this._params.count}`,
        this._params.search ? `search=${this._params.search}` : null,
        this._params.type ? `type=${this._params.type}` : null,
        this._params.sort ? `sort=${this._params.sort}` : null,
      ]
        .filter((x) => x)
        .join('&')
    );
  }

  setCount(newCount: number): void {
    this._params.count = String(newCount);
  }

  setSearch(newSearch: string | undefined): void {
    this._params.search = newSearch;
  }

  setTypes(newTypes: MealType[]): void {
    this._params.type = newTypes
      .reduce((result: string, current) => result + ',' + current.key, '')
      .slice(1);
  }

  setSort(newSort: string | undefined): void {
    this._params.sort = newSort;
  }

  setSearchCount(searchCount: string): void {
    searchCount = searchCount.startsWith('?')
      ? searchCount.slice(1)
      : searchCount;

    const newParams = qs.parse(searchCount);

    this._params.count = newParams.count
      ? String(newParams.count)
      : String(BASECOUNT);

    this._params.type =
      newParams.type === undefined ? undefined : String(newParams.type);

    this._params.search =
      newParams.search === undefined ? undefined : String(newParams.search);

    this._params.sort =
      newParams.sort === undefined ? undefined : String(newParams.sort);

    this._params.k =
      newParams.k === undefined ? undefined : String(newParams.k);
  }
}
