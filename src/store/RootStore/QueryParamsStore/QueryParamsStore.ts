import { action, makeObservable, observable } from 'mobx';
import * as qs from 'qs';

type PrivateFields = '_params' | '_count';

export default class QueryParamsStore {
  private _params: qs.ParsedQs = {};
  private _search: string = '';
  private _count: number = 0;
  private _rootStore;

  constructor(rootStore: any) {
    this._rootStore = rootStore;
    makeObservable<QueryParamsStore, PrivateFields>(this, {
      _params: observable.ref,
      _count: observable.ref,
      setSearchCount: action,
      updateCountOnScroll: action,
    });
  }

  getParam(
    key: string
  ): undefined | string | string[] | qs.ParsedQs | qs.ParsedQs[] {
    return this._params[key];
  }

  updateCountOnScroll(newCount: number) {
    this._count = newCount;
  }

  setSearchCount(searchCount: string): void {
    searchCount = searchCount.startsWith('?')
      ? searchCount.slice(1)
      : searchCount;
    this._params = qs.parse(searchCount);
    // Эти проверки нужны для случаев, когда страница перезагружается без указания параметров.
    if (this._params.search === undefined || this._params.count === undefined) {
      if (this._params.count === undefined) {
        this._params.count = '6';
        const url = new URL(window.location.href);
        url.searchParams.set('count', '6');
        window.history.pushState(null, '', url.toString());
      }
      if (this._params.search === undefined) {
        this._params.search = '';
        const url = new URL(window.location.href);
        url.searchParams.set('search', '');
        window.history.pushState(null, '', url.toString());
      }
      return;
    }
    if (Number(this._params.count) !== this._count) {
      this._count = Number(this._params.count);
    }
    if (String(this._params.search) !== this._search) {
      this._search = String(this._params.search);
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
