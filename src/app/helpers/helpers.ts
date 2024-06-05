import { AbstractControl } from '@angular/forms';
import { ActivatedRoute, Data } from '@angular/router';
import { Observable, Subject } from 'rxjs';;
import { startOfDay, endOfDay } from 'date-fns'

export class Helpers {
  public static loading = {
    toggle: (enable: boolean) => {
      const loading = document.getElementsByClassName('main-loading');
      if (loading[0] !== undefined) {
        if (enable) {
          loading[0].setAttribute('style', 'display: flex');
        } else {
          loading[0].setAttribute('style', 'display: none');
        }
      }
    },
    setText(text: string) {
      const loading = document.getElementsByClassName('main-loading-text');
      if (loading[0] !== undefined) {
        loading[0].textContent = text;
      }
    }
  }
  public static deviceInfo() {
    return {
      timeOpened: new Date(),
      timezone: new Date().getTimezoneOffset() / 60,

      hostname() {
        return window.location.hostname;
      },
      pathname() {
        return window.location.pathname;
      },
      referrer() {
        return document.referrer;
      },
      previousSites() {
        return history.length;
      },

      browserName() {
        return navigator.appName;
      },
      browserEngine() {
        return navigator.product;
      },
      browserVersion1a() {
        return navigator.appVersion;
      },
      browserVersion1b() {
        return navigator.userAgent;
      },
      browserLanguage() {
        return navigator.language;
      },
      browserOnline() {
        return navigator.onLine;
      },
      browserPlatform() {
        return navigator.platform;
      },
      javaEnabled() {
        return navigator.javaEnabled();
      },
      dataCookiesEnabled() {
        return navigator.cookieEnabled;
      },
      dataCookies1() {
        return document.cookie;
      },
      dataCookies2() {
        return decodeURIComponent(
          document.cookie.split(';')[0] === undefined
            ? ''
            : document.cookie.split(';')[0]
        );
      },
      dataStorage() {
        return localStorage;
      },

      sizeScreenW() {
        return screen.width;
      },
      sizeScreenH() {
        return screen.height;
      },
      sizeDocW() {
        return document.activeElement ? document.activeElement.clientWidth : 0;
      },
      sizeDocH() {
        return document.activeElement ? document.activeElement.clientHeight : 0;
      },
      sizeInW() {
        return innerWidth;
      },
      sizeInH() {
        return innerHeight;
      },
      sizeAvailW() {
        return screen.availWidth;
      },
      sizeAvailH() {
        return screen.availHeight;
      },
      scrColorDepth() {
        return screen.colorDepth;
      },
      scrPixelDepth() {
        return screen.pixelDepth;
      }
    };
  }
  /**
   * Substring a string with length and append ...
   * @param str Source string to sub
   * @param length Length to sub
   * @param substr Last index of string to sub, maybe space, ';', '/', '.',...
   * @example: subStringSmarter(item.newS_DESC, 110, ' ')
   */
  public static subStringSmarter(str: string, length: number, substr: string, appendStr = '...'): string {
    if (typeof str === 'string' && str.length === 0) return '';
    if (str.length > length) {
      str = str.substr(0, length);
      const t = str.replace(/^\s+|\s+$/g, '').lastIndexOf(substr);
      if (t < str.length) {
        str = str.substr(0, (t < 0 ? str.length : t)) + appendStr;
      }
    }
    return str;
  }
  /**
   * Get unique array value
   * @param array1
   * @param array2
   * @return array of any
   */
  public static removeDuplicateTwoArray(
    array1: any[],
    array2: any[],
    field: string
  ): any[] {
    const _result: any[] = [];
    const _arr = array1.length > array2.length ? array2 : array1;
    const _arr2 = array1.length > array2.length ? array1 : array2;

    _arr2.forEach((value, index) => {
      const _index = _arr.findIndex(t => t[field] != value[field]);
      if (_index < 0) {
        _result.push(value);
      }
    });

    return _result;
  }

  /**
   * Distinct array values
   * @param inputArray Array inputted
   * @param field Field to distinct, empty if over object
   * @returns array after distinct
   */
  public static distinctArray(inputArray: any[], field?: string) {
    const outputArray = [];

    if (typeof field === 'undefined' || field.length === 0) {
      for (let i = 0; i < inputArray.length; i++) {
        if (outputArray.indexOf(inputArray[i]) == -1) {
          outputArray.push(inputArray[i]);
        }
      }
    } else {
      if (field != undefined) {
        for (let i = 0; i < inputArray.length; i++) {
          if (
            outputArray.findIndex(t => t[field] == inputArray[i][field]) == -1
          ) {
            outputArray.push(inputArray[i]);
          }
        }
      }
    }

    return outputArray;
  }

  public static isNumberKey(evt: any) {
    const charCode = evt.which ? evt.which : evt.keyCode;
    if (charCode !== 43 && charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  public static validateNumber(number: any): boolean {
    if (typeof number === 'undefined' || number === 'null' || (typeof number === 'string' && number.length === 0)) return false;
    const pattern = new RegExp(/([a-z])|([A-Z])/);
    return pattern.test(number);
  }
  public static validateDate(value: any) {
    const regExp = new RegExp(
      // eslint-disable-next-line max-len
      /^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/
    );
    return regExp.test(value) ? false : true;
  }

  // some thing else ...
  /***
   * Need input params, return, description on method
   */
  public static scrollToTop(noAnimation: boolean = false) {
    if (noAnimation) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    var scrollStep = -window.scrollY / (300 / 100),
      scrollInterval = setInterval(function () {
        if (window.scrollY != 0) {
          window.scrollBy(0, scrollStep);
        }
        else clearInterval(scrollInterval);
      }, 10);
    //
  }

  /**
   * Get route child data
   * @param firstChild First child of module routing
   * @returns Data or null
   */
  public static getRouteChildData(firstChild: ActivatedRoute | null): null | Data {
    let child = firstChild;
    while (child) {
      if (child.firstChild) {
        child = child.firstChild;
      } else if (child.snapshot.data) {
        return child.snapshot.data;
      }
    }
    return null;
  }

  public static convertObjectToParams = (_obj: any) => {
    if (_obj) {
      let str = "";
      // tslint:disable-next-line:forin
      for (const key in _obj) {
        if (str !== "") {
          str += "&";
        }
        str += key + "=" + encodeURIComponent(_obj[key]);
      }
      return str;
    } else {
      return "";
    }
  }
  public static convertParamsToObject = (_string: string) => {
    // var search = location.search.substring(1);
    if (_string && _string.length > 0 && _string !== '/') {
      return JSON.parse(
        '{"' +
        decodeURI(_string)
          .replace(/"/g, '\\"')
          .replace(/&/g, '","')
          .replace(/=/g, '":"') +
        '"}'
      );
    }
    return undefined;
  }
  public static getParamString = () => {
    return window.location.search.replace(/\?/g, '') || '';
  }


  /**
   * Get value of query params
   * @param key Key of query
   */
  public static getQueryString = (key: string): string => {
    const { search } = window.location
    const params = new URLSearchParams(search)
    const value = params.get(key)
    return value ? value : ''
  }

  /**
   * Get current host like: https://localhost:8000/
   */
  public static getCurrentHost = (): string => window.location.protocol.concat('//').concat(window.location.host)


  /**
   * Get path with /
   * @param paths Array of path
   * @param prefix Key if prefix / is includes
   * @returns string with paths
   */
  public static JoinPaths = (paths: string[], prefix: boolean = false)
    : string => {
    const _pathMatches = paths.join('/');
    return prefix ? `/${_pathMatches}` : _pathMatches;
  }

  public static getCharNameBySpace(_text: string, length: number = 2) {
    if (!_text) return ``;
    const texts = _text.split(' ');
    let result = '';
    const _length = texts.length > length ? length : texts.length;
    for (let i = 0; i < _length; i++) {
      result += texts[i].charAt(0);
    }
    return result;
  }
  public static timer: any = {}
  public static debounceFunction(callBack: any, timeOut: number = 200) {
    if (this.timer)
      clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      callBack()
    }, timeOut)
  }
  public static getFirstErrorAbstract(_control: AbstractControl) {
    if (_control && _control.errors) {
      return Object.keys(_control.errors)[0] || '';
    }
    return '';
  }

  public static isWeekend(date: Date) {
    const day = date.getDay();
    return (day === 6 || day === 0);
  }
  public static getNextWork(d: Date, isDefaultTime: boolean = true, isTomorrow: boolean = false) {
    if (isDefaultTime) {
      d.setHours(9, 0, 0, 0)
    }
    d.setDate(d.getDate() + 1);
    if (isTomorrow) return d;
    if (d.getDay() == 0) d.setDate(d.getDate() + 1);
    else if (d.getDay() == 6) d.setDate(d.getDate() + 2);
    return d;
  }


  public static formatNumber(value: number, floatingNo = 2, thousandSign = ",", floatSign = ".") {
    if (value === null || value === undefined) return "";
    if (typeof value !== 'undefined' && value !== null && value.toString() !== "") {
      let _numberStr = value.toString();
      if (floatingNo && floatingNo > 0) {
        _numberStr = (+value).toFixed(floatingNo);
      } else if (floatingNo == -1) {
        _numberStr = (+value).toString();
        console.log('value:', value)
        console.log('_numberStr:', _numberStr)
      }
      else {
        _numberStr = Math.round(+value).toString();
      }
      let parts = _numberStr.toString().split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousandSign);
      return parts.join(floatSign);
    } else {
      return 0;
    }
  }

  public static focusInputById(_idInput: string, delay: number = 100) {
    const timeout = setTimeout(() => {
      const _input = document.getElementById(_idInput);
      if (_input) {
        _input.focus();
      }
      clearTimeout(timeout);
    }, delay);
  }

  // public static getTimezoneOffsetUTC(): string {
  //   let timezoneOffset = moment(new Date()).format('Z');
  //   return `UTC${timezoneOffset}`;
  // }

  public static timezone() {
    var offset = new Date().getTimezoneOffset();
    var minutes = Math.abs(offset);
    var hours = Math.floor(minutes / 60);
    var prefix = offset < 0 ? "+" : "-";
    return prefix + hours;
  }

  public static generateUUID() {
    var d = new Date().getTime();//Timestamp
    var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now() * 1000)) || 0;
    //Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16;
      if (d > 0) {
        r = (d + r) % 16 | 0;
        d = Math.floor(d / 16);
      } else {
        r = (d2 + r) % 16 | 0;
        d2 = Math.floor(d2 / 16);
      }
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
  }
  /**
   * Get page numbers by totalItems and item per page
   * @param itemPerpage item per page
   * @param numberOfItemsPerPage total items
   * @param page page index
   * @returns {pageSize: number, start: number, end: number}
   */
  public static getPageSize(totalItemsCount: number, numberOfItemsPerPage: number, page = 1) {
    const numberOfPages = Math.floor((totalItemsCount + numberOfItemsPerPage - 1) / numberOfItemsPerPage);
    const start = (page * numberOfItemsPerPage) - (numberOfItemsPerPage - 1);
    const end = Math.min(start + numberOfItemsPerPage - 1, totalItemsCount);

    return {
      pageSize: numberOfPages,
      start: start,
      end: end
    }
  }

  public static getFileExtensionByName(filename: string) {
    return filename.split('.').pop();
  }

  public static decodeString(value: string): string {
    return decodeURIComponent(value || '');
  }
  public static getDirectionSort(direction: string) {
    if (direction == 'ascend' || direction == 'descend') {
      return direction == 'ascend' ? 'asc' : 'desc'
    }
    return ''

  }
  public static isSafari = () => /^((?!chrome|android).)*safari/i.test(navigator.userAgent) || false;

  public static buildShortFileName(contractFiles: any[]) {
    contractFiles.forEach(file => {
      let fileName = (file.name || '').replace(/\.[^/.]+$/g, "");
      fileName = Helpers.subStringSmarter(fileName, 32, ' ', '..');
      const _extension = Helpers.getFileExtensionByName(file.name || '');
      file.shortName = `${fileName}.${_extension}`;
    });
    return contractFiles;
  }

  public static guidGenerator() {
    var S4 = function () {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
  }
}
