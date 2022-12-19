/*
let validator = new Validator({
  value: '',
  messange: '',            // users messange
  required: true/false,    //
})

Validator return:
validator.value       //true or false
validator.massange    // messange if not valid

Validator metods:
validator.emrty      // checking for emptiness


*/

export class Validator {

  constructor(params) {
    this.value = params.value
    this.valid = true
    this.message = ''
    this.required = false
    if ('message' in params) this.message = params.message
    if ('required' in params) this.required = params.required
    if ('validAutoCorrect' in params) this.validAutoCorrect = params.validAutoCorrect
    if ('validOnlyRus' in params) this.validOnlyRus = params.validOnlyRus

    switch (params.metod) {
      case 'empty':
        this.empty()
        break;
      case 'name':
        this.name()
        break;

      default:
        break;
    }

  }

  empty() {
    if (!this.value.trim() && this.required) {
      this.valid = false
      this.value = this.value.trim()
      if (!this.message) this.message = 'Поле не должно быть пустым!'
    } else {
      this.valid = true
      this.value = this.value.trim()
      this.message = ''
    }
  }

  name() {
    console.log('this.value 123 ', this.value);
  }

  get message() {
    return this._message;
  }

  set message(value) {
    this._message = value ;
  }

  get valid() {
    return this._valid;
  }

  set valid(value) {
    this._valid = value;
  }
};










export function validInputForm(dataForm) {
  let resultValidation = '';
  for (const objData of dataForm) {
      switch (objData.inputType) {
        case 'text':
          switch (objData.inputName) {
            case 'surname':
            case 'name':
              resultValidation = rulesByName(objData.inputValue);
              objData.inputValue = resultValidation.value;
              objData.inputValid = resultValidation.valid;
              objData.feedbackText = resultValidation.feedback;
            break;
            case 'middleName':
              resultValidation = rulesByMiddleName(objData.inputValue);
              objData.inputValue = resultValidation.value;
              objData.inputValid = resultValidation.valid;
              objData.feedbackText = resultValidation.feedback;
            break;
          }
        break;

        case 'tel':
          resultValidation = rulesByTel(objData.inputValue);
          objData.inputValue = resultValidation.value;
          objData.inputValid = resultValidation.valid;
          objData.feedbackText = resultValidation.feedback;
        break;

        case 'email':
          resultValidation = rulesByEmail(objData.inputValue);
          objData.inputValue = resultValidation.value;
          objData.inputValid = resultValidation.valid;
          objData.feedbackText = resultValidation.feedback;
        break;

        case 'url':
          resultValidation = rulesByUrl(objData.inputValue);
          objData.inputValue = resultValidation.value;
          objData.inputValid = resultValidation.valid;
          objData.feedbackText = resultValidation.feedback;
        break;
      }
    }
  return dataForm;
}

// правила обработки полей===============================

// фамилия имя
function rulesByName(value) {
  let valid = 0;
  let feedback = ''
  value = value.trim()
  // пустая строка
  if (!value) {
    valid = -1;
    feedback = 'Заполните это поле';
    return {value, valid, feedback,}
  }
  // только кириллица и " ", "-", "_"
  value = [...value]
  .filter(element => element.codePointAt(0) >= 1024 && element.codePointAt(0) <= 1105
  || element.codePointAt(0) === 32
  || element.codePointAt(0) === 45
  || element.codePointAt(0) === 95)
  .join('');
  // преобразование к правильному виду (одинарное имя)
  value = value.slice(0, 1).toLocaleUpperCase() + value.slice(1).toLocaleLowerCase()
  // преобразование к правильному двойному(тройному и т.д.) имени
  // символы "-", "_", " " интерпретируются как разделитель
  if (value.includes('-') || value.includes('_') || value.includes(' ')) {
    value = value
    .replace(/\-/g, ' ')
    .replace(/\_/g, ' ')
    .split(' ')
    .filter(str => str.trim().length > 0)
    .map(str => str.slice(0, 1).toLocaleUpperCase() + str.slice(1).toLocaleLowerCase())
    .join('-');
  }
  // пробелы между словами как ошибка
  // if (value.includes(' ')) {
  //   valid = -1;
  //   feedback = 'пробелы недопустимы';
  //   return {value, valid, feedback,}
  // }

  // УСПЕШНАЯ ВАЛИДАЦИЯ
  valid = 1;
  return {value, valid, feedback,}
}

// отчество--------------------------------------
function rulesByMiddleName(value) {
  let valid = 0;
  let feedback = ''
  value = value.trim()
  // пустая строка
  if (!value) {
    valid = -1;
    feedback = 'Заполните это поле';
    return {value, valid, feedback,}
  }

  // только кириллица и " ", "-", "_"
  value = [...value]
  .filter(element => element.codePointAt(0) >= 1024 && element.codePointAt(0) <= 1105
  || element.codePointAt(0) === 32
  || element.codePointAt(0) === 45
  || element.codePointAt(0) === 95)
  .join('');

  // преобразование к правильному виду (одинарное отчество)
  value = value.slice(0, 1).toLocaleUpperCase() + value.slice(1).toLocaleLowerCase()

  // преобразование к правильному двойному(тройному и т.д.) отчеству
  // символы "-", "_", " " интерпретируются как разделитель
  if (value.includes('-') || value.includes('_') || value.includes(' ')) {
    value = value
    .replace(/\-/g, ' ')
    .replace(/\_/g, ' ')
    .split(' ')
    .filter(str => str.trim().length > 0)
    .map(str => str.slice(0, 1).toLocaleUpperCase() + str.slice(1).toLocaleLowerCase())
    .join(' ');
  }

  // УСПЕШНАЯ ВАЛИДАЦИЯ
  valid = 1;
  return {value, valid, feedback,}
}

// telephone
function rulesByTel(value) {
  let valid = 0;
  let feedback = ''
  value = value.trim()
  // пустая строка
  if (!value) {
    valid = -1;
    feedback = 'Заполните это поле';
    return {value, valid, feedback,}
  }
  return {value, valid, feedback,}
}

// email
function rulesByEmail(value) {
  let valid = 0;
  let feedback = ''
  value = value.trim()
  // пустая строка
  if (!value) {
    valid = -1;
    feedback = 'Заполните это поле';
    return {value, valid, feedback,}
  }
  return {value, valid, feedback,}
}

// url
function rulesByUrl(value) {
  let valid = 0;
  let feedback = ''
  value = value.trim()
  // пустая строка
  if (!value) {
    valid = -1;
    feedback = 'Заполните это поле';
    return {value, valid, feedback,}
  }
  return {value, valid, feedback,}
}


