// let id = new GetRandomId({
//   length: 6,     // length id in 1 to 10
//   prefix: '',
//   postfix: '',
// })
// id.idStr        // id in string type
// id.idNum        // id in number type

export class GetRandomId {
  _lenght = 5
  _prefix = ''
  _postfix = ''

  constructor(options = {}) {

    this.length = this._length
    this.prefix = this._prefix
    this.postfix = this._postfix
    if ('length' in options) this.length = options.length
    if ('prefix' in options) this.prefix = options.prefix
    if ('postfix' in options) this.postfix = options.postfix

    this.myArray = new Uint32Array(1);
    crypto.getRandomValues(this.myArray);
    this.id = String(this.myArray[0]).slice(0, this.length)

    this.idStr = this.prefix + this.id + this.postfix
    this.idNum = Number(this.id)

  }
}


// задержка выполнения функции
export function debounce(fn, ms) {
  let isCooldown = false;
  return function () {
    if (isCooldown) return;
    fn.apply(this, arguments);
    isCooldown = true;
    setTimeout(() => (isCooldown = false), ms);
  };
}


// сохранение данных в storage
export function saveStorage(array, keyName) {
  localStorage.setItem(keyName, JSON.stringify(array))
}

// восстановление данных из storage
export function restoredStorage(keyName) {
  let localData = localStorage.getItem(keyName);
  if (localData !== null && localData !== '') {
    return JSON.parse(localData);
  }
}
