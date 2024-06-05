export class PokeParams {
  pageNumber: number = 1;
  pageSize: number = 10;
  sort: string = '';
  name: string = '';
  generation: number | null = null;
  legendary: number | null = null;
  type: number | null = null;

  constructor(_params: PokeParams | null) {
    if (_params) {
      this.checkForNumber('pageNumber', _params['pageNumber']);
      this.checkForNumber('pageSize', _params['pageSize']);
      this.checkForNumber('generation', _params['generation']);
      this.checkForNumber('legendary', _params['legendary']);
      this.checkForNumber('type', _params['type']);

      this.checkForString('sort', _params['sort']);
      this.checkForString('name', _params['name']);
    }
  }

  private checkForString(param: 'sort' | 'name', value: any) {
    if (typeof value === 'string') {
      this[param] = value;
    }
  }

  private checkForNumber(
    param: 'pageNumber' | 'pageSize' | 'generation' | 'legendary' | 'type',
    value: any,
    keepZero = false
  ) {
    if (typeof value === 'number' || !Number.isNaN(+value) || value === null) {
      this[param] = +value;
    }
  }

  get getURLParams(): Record<string, any> {
    return {
      ...this,
      generation: this.generation || '',
      legendary: this.legendary || '',
      type: this.type || '',
    };
  }

  get getAPIParams(): Record<string, any> {
    return {
      "page[number]": this.pageNumber,
      "page[size]": this.pageSize,
      "sort": this.sort || undefined,
      "name": this.name || undefined,
      "filter[generation]": this.generation || undefined,
      "filter[legendary]": this.legendary || undefined,
      "filter[type]": this.type || undefined,
    };
  }
}
