import { action, makeObservable, observable } from 'mobx';
import * as qs from 'qs';

type PrivateFields = '_params';

export default class QueryParamsStore {
  private _params: qs.ParsedQs = {};
  private _search: string = '';
  private _position: string = '';
  private _rootStore;

  constructor(rootStore: any) {
    this._rootStore = rootStore;
    makeObservable<QueryParamsStore, PrivateFields>(this, {
      _params: observable.ref,
      setSearch: action,
    });
  }

  getParam(
    key: string
  ): undefined | string | string[] | qs.ParsedQs | qs.ParsedQs[] {
    return this._params[key];
  }

  setSearch(search: string) {
    search = search.startsWith('?') ? search.slice(1) : search;
    if (this._search !== search) {
      this._search = search;
      this._params = qs.parse(search);
      if (this._rootStore.recipes.recipes.length !== 0) {
        // Проверка во избежание двойной загрузки в самом начале.
        this._rootStore.recipes.clearRecipes();
        this._rootStore.recipes.fetchRecipes();
        /* Такой подход вызывает предупреждение в первый раз
        при использовании поиска: Warning: Cannot update
        a component (`MainPage`) while rendering a different
        component (`App`). Я так понимаю, при анализе адреса
        и установки search перерендеривается App, а при
        изменении списка рецептов изменяется, но
        не перерендеривается MainPage. Но визуально всё
        работает. Почему это проблема и как её решить я что-то
        не понимаю.*/
      }
    }
  }
}
