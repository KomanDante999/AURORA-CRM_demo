import { GetRandomId } from "../library/servise-function.js";
import { Toollee } from "../library/toollee/toollee.min.js";
import { Choosse } from "../library/choosse/Choosse.min.js";
import { iconLoadSmall, iconContactDelete } from "./icons.js";
import { Validator } from "./Validation.js";
import { DropMenu } from "./Menu.js";
/*
new InputForm({
  container: node,
  typeForm: 'add',        // 'add', 'change', 'delete'
  btnCloseModal: none,    // button for close modal window (belongin to the modal window)
  clientData: {
    surname: '',
    name: '',
    lastName: '',
    contacts: [
      {
        type: 'Телефон',
        value: '+71234567890'
      },
      {
        type: 'Email',
        value: 'abc@xyz.com'
      },
      {
        type: 'Facebook',
        value: 'https://facebook.com/vasiliy-pupkin-the-best'
      }
    ],
  }
})
*/
export class InputForm {

  _clientData = {
    contacts: [],
  }
  _formValid = true
  _validationForm = true      // true - валидация включена
  _validAutoCorrect = true    // true - при валидации полей будет происходить автозамена и автоудаление неверных символов (если возможно), false - будет выводиться ошибка
  _validLang = 'rus'       // выбор языка валидации


  constructor(params) {
    //_______layout
    this.$container = document.createElement('div')
    // header
    this.$header = document.createElement('div')
    this.$menuContainer = document.createElement('div')
    this.$title = document.createElement('h2')
    // main
    this.$form = document.createElement('form')
    this.$sectionPerson = document.createElement('div')
    this.$sectionContacts = document.createElement('div')
    this.$containerContacts = document.createElement('div')
    this.$btnAddContact = document.createElement('button')
    this.$btnAddContactText = document.createElement('span')
    this.$btnAddContactIcon = document.createElement('span')
    // service
    this.$sectionService = document.createElement('div')
    this.$infoBox = document.createElement('div')
    this.$btnSubmit = document.createElement('button')
    this.$btnSubmitIcon = document.createElement('span')
    this.$btnSubmitContent = document.createElement('span')
    this.btnSupport = params.btnCloseModal

    //_______settings
    this.clientData = this._clientData
    this.inputs = []
    this.contacts = []
    if (params.clientData) this.clientData = params.clientData
    this.typeForm = params.typeForm

    this.$container.classList.add('input-form')

    // header----------------------------------------
    this.$header.classList.add('input-form__header')
    this.$menuContainer.classList.add('input-form__menu')
    this.$title.classList.add('input-form__title')
    this.$header.append(this.$menuContainer, this.$title)

    // menu
    this.menu = new DropMenu({
      container: this.$menuContainer,
      listItems: [
        {
          name: 'validationForm',
          value: this.validationForm,
          lable: 'Проверка формы ввода',
          type: 'radio',
        },
        {
          name: 'validAutoCorrect',
          value: this.validAutoCorrect,
          lable: 'Автоисправление при проверке',
          type: 'radio',
        },
        {
          name: 'validLang',
          value: this.validLang,
          lable: 'Язык проверки',
          type: 'select',
          castomClass: 'menu-choosse',
          list: [
            {
              name: 'Русский',
              value: 'rus',
            },
            {
              name: 'English',
              value: 'eng',
            },
            {
              name: 'Français',
              value: 'fra',
            },
            {
              name: 'Deutsch',
              value: 'deu',
            },
            {
              name: 'Español',
              value: 'esp',
            },
          ]
        },
      ]
    })

    for (const item of this.menu.listSelect) {
      if (item.$btnHeader) {
        item.$btnHeader.addEventListener('click', () => {
          this[item.name] = item.value
        })
      }
    }
    new Toollee({
      $target: this.menu.$btnActive,
      content: `Настройки валидации`,
      customClass: 'menu-toollee',
      block: false,
      arrowH: 25,
    })

    this.validAutoCorrect = this._validAutoCorrect
    this.validLang_validLang = this._validLang
    this.validationForm = this._validationForm

    switch (this.typeForm) {
      case 'add':
        this.$title.textContent = 'Новый клиент'
        break;
      case 'change':
        this.$title.textContent = 'Изменить данные'
        this.$titleId = document.createElement('p')
        this.$titleId.classList.add('input-form__title-id')
        // this.$titleId.textContent =
        this.$header.append(this.$titleId)
        break;
      case 'delete':
        this.$title.textContent = 'Удалить клиента'
        break;
      }
      this.$container.append(this.$header)

    // main---------------------------------------
    if (this.typeForm == 'add' || this.typeForm == 'change') {

      this.$form.classList.add('input-form__form')

      // personal data
      this.$sectionPerson.classList.add('input-form__section', 'input-form__section_person')

      for (const inputData of params.personalData) {
        this.inputPersonal = new CreateInputPers(this.$sectionPerson, inputData)
        this.inputs.push(this.inputPersonal)
      }

      this.$form.append(this.$sectionPerson)

      // contacts data
      this.$sectionContacts.classList.add('input-form__section', 'input-form__section_contacts')
      this.$containerContacts.classList.add('input-form__container-contacts')

      if (this.typeForm == 'change') {
        // list contacts create
      }

      this.$btnAddContact.classList.add('input-form__btn-addcontact')
      this.$btnAddContactIcon.classList.add('input-form__add-icon')
      this.$btnAddContactText.classList.add('input-form__add-text')
      this.$btnAddContact.type = 'button'
      this.$btnAddContactText.textContent = 'Добавить контакт'

      this.$btnAddContact.append(this.$btnAddContactIcon, this.$btnAddContactText)


      this.checkContainContacts()

      this.$btnAddContact.addEventListener('click', () => {
        if (this.$containerContacts.childNodes.length < 10) {
          this.contactGoup =  new CreateInputContact({
            container: this.$containerContacts,
            // contacts: [
            //   {
            //     type: 'Email',
            //     value: 'abc@xyez.com'
            //   }
            // ],
            })
          this.checkContainContacts()
          this.contactGoup.$btnDelete.addEventListener('click', () => {
            this.checkContainContacts()
            this.contactsUpdate()
          })
          this.contacts.push(this.contactGoup)
        }
      })

      this.$sectionContacts.append(this.$containerContacts, this.$btnAddContact)
      this.$form.append(this.$sectionContacts)
      this.$container.append(this.$form)
    }

    // service-----------------------------------------------------
    this.$sectionService.classList.add('input-form__section', 'input-form__section-service')
    this.$infoBox.classList.add('input-form__info-box')
    this.$btnSubmit.classList.add('input-form__submit-btn', 'btn', 'btn-primary')
    this.$btnSubmit.type = 'submit'
    this.$btnSubmitIcon.classList.add('input-form__submit-icon')
    this.$btnSubmitContent.classList.add('input-form__submit-content')
    this.btnSupport.classList.add('input-form__close-btn')

    switch (this.typeForm) {
      case 'add':
        this.$btnSubmitContent.textContent = 'Сохранить'
        this.btnSupport.textContent = 'Отмена'
        this.$infoBox.classList.add('is-invalid')
        this.$infoBox.classList.remove('is-delete')
        this.$infoBox.textContent = 'Поля не заполнены или заполнены не верно! Испарвьте ошибки!'

        break;
      case 'change':
        this.$btnSubmitContent.textContent = 'Сохранить'
        this.btnSupport.textContent = 'Удалить клиентамена'
        this.btnSupport.classList.add('delete')
        this.$infoBox.classList.add('is-invalid')
        this.$infoBox.classList.remove('is-delete')
        this.$infoBox.textContent = 'Поля не заполнены или заполнены не верно! Испарвьте ошибки!'

        break;
      case 'delete':
        this.$btnSubmitContent.textContent = 'Удалить'
        this.btnSupport.textContent = 'Отмена'
        this.$infoBox.classList.remove('is-invalid')
        this.$infoBox.classList.add('is-delete')
        this.$infoBox.textContent = 'Вы действительно хотите удалить данного клиента?'

        break;
      }

    this.$btnSubmit.append(this.$btnSubmitIcon, this.$btnSubmitContent)
    this.$sectionService.append(this.$infoBox, this.$btnSubmit)
    this.$form.append(this.$sectionService)
    params.container.append(this.$container)

    // submit
    this.formValid = this._formValid

    for (const input of this.inputs) {
      input.$input.addEventListener('input', () => {
        this.formValid = true
      })
    }
    for (const contact of this.contacts) {
      contact.$input.addEventListener('input', () => {
        this.formValid = true
      })
    }

    if (this.typeForm == 'add' || this.typeForm == 'change') {
      this.$form.addEventListener('submit', (e) => {
        e.preventDefault()
        if (this.validationForm) this.validationStart()
        this.checkContainContacts()
      } )
    }

  }

  checkContainContacts() {
    if (this.$containerContacts.childNodes.length > 0) {
      this.$sectionContacts.classList.add('is-contains')
      this.$containerContacts.classList.add('is-contains')
    }
    else {
      this.$sectionContacts.classList.remove('is-contains')
      this.$containerContacts.classList.remove('is-contains')
    }

    if (this.$containerContacts.childNodes.length >= 10) this.$btnAddContact.classList.add('visually-hidden')
    else this.$btnAddContact.classList.remove('visually-hidden')
  }

  validationStart() {
    for (const input of this.inputs) {
      input.validation({
        validAutoCorrect: this.validAutoCorrect,
        validLang_validLang: this.validLang_validLang
      })
    }
    for (const contact of this.contacts) {
      contact.validation()
    }
    if (this.inputs.find(item => item.valid === false)) this.formValid = false

  }

  clientDataUpdate() {
    for (const item of this.inputs) {
      this.clientData[item.name] = item.value
    }

    this.clientData.contacts = []
    for (const item of this.contacts) {
      let obj = {}
      obj.type = item.inputType
      obj.value = item.inputValue
      this.clientData.contacts.push(obj)
    }
    console.log('this.clientData :>> ', this.clientData);
  }

  contactsUpdate() {
    this.contacts.splice(this.contacts.findIndex(item => item.delete), 1)
  }

  get formValid() {
    return this._formValid
  }

  set formValid(value) {
    this._formVali = value
    value ? this.$infoBox.classList.add('visually-hidden') : this.$infoBox.classList.remove('visually-hidden')
  }

  get validAutoCorrect() {
    return this._validAutoCorrect;
  }

  set validAutoCorrect(value) {
    this._validAutoCorrect = value;
  }

  get validLang_validLang() {
    return this._validLang;
  }

  set validLang_validLang(value) {
    this._validLang = value;
  }

  get validationForm() {
    return this._validationForm;
  }

  set validationForm(value) {
    this._validationForm = value;
    if (value) {
      this.formValid = true
      for (const item of this.menu.listSelect) {
        if (item.name == 'validAutoCorrect' || item.name == 'validLang_validLang') item.disable = false
      }
    } else {
      for (const item of this.menu.listSelect) {
        if (item.name == 'validAutoCorrect' || item.name == 'validLang_validLang') item.disable = true
      }
    }
  }
};



// input personal data
class CreateInputPers {
_inputEmpty = true
_value = ''
_type = 'text'
_required = false

  constructor(container, options) {

    this.$inputGroup = document.createElement('div')
    this.$lable = document.createElement('lable')
    this.$message = document.createElement('div')
    this.$input = document.createElement('input')

    this.name = options.inputName
    this.value = this._value
    if (options.inputValue) this.value = options.inputValue
    this.type = this._type
    if (options.inputType) this.type = options.inputType
    this.required = this._required
    if (options.required) this.required = options.required

    this.$inputGroup.classList.add('input-form__group-persone')
    this.$lable.classList.add('input-form__lable-persone')
    this.$message.classList.add('input-form__message-persone')
    this.$input.classList.add('input-form__input-persone')
    this.$lableText = document.createElement('span')
    this.$lableIcon = document.createElement('span')
    this.$lableText.classList.add('input-form__lable-text')
    this.$lableIcon.classList.add('input-form__lable-icon')

    this.$input.name = this.name
    this.$input.type = this.type
    this.valid = true

    this.$lableText.textContent = options.lableText
    this.$lableIcon.textContent = options.lableIcon

    this.$input.addEventListener('input', () => {
      this.value = this.$input.value
      this.valid = true
    })
    this.$lable.addEventListener('click', () => {
      this.$input.focus()
    })

    this.$lable.append(this.$lableText, this.$lableIcon)
    this.$inputGroup.append(this.$lable, this.$input, this.$message)
    container.append(this.$inputGroup)
  }

  validation(params) {
    this.validator = new Validator({
      value: this.value.trim(),
      metod: 'empty',
      message: 'Поле обязательно к заполнению',
      required: this.required
    })

    this.invalidMessage = this.validator.message
    this.value = this.validator.value
    this.valid = this.validator.valid

    if (this.valid) {
      this.validator = new Validator({
        value: this.value.trim(),
        metod: 'name',
        message: 'Недопустимые символы',
        validAutoCorrect: params.validAutoCorrect,
        validLang_validLang: params.validLang_validLang
      })

      this.invalidMessage = this.validator.message
      this.value = this.validator.value
      this.valid = this.validator.valid
    }
  }

  set valid(value) {
    this._valid = value
    if (value) {
      this.$input.classList.remove('is-invalid')
      this.$message.classList.remove('is-invalid')
    }
    else {
      this.$input.classList.add('is-invalid')
      this.$message.classList.add('is-invalid')
    }
  }

  get valid() {
    return this._valid;
  }

  set value(value) {
    this._value = value
    this.$input.value = this._value
    if (value) this.$lable.classList.remove('is-empty')
    else this.$lable.classList.add('is-empty')
  }

  get value() {
    return this._value;
  }

  get invalidMessage() {
    return this._invalidMessage;
  }

  set invalidMessage(value) {
    this._invalidMessage = value;
    this.$message.textContent = value
  }

}

// input contact data

class CreateInputContact {
  _delete = false

  constructor(options) {
    this.delete = this._delete

    this.$inputGroup = document.createElement('div')
    this.$selectContainer = document.createElement('div')
    this.$input = document.createElement('input')
    this.$btnDelete = document.createElement('button')

    this.$inputGroup.classList.add('input-form__group-contact', 'contact-group')
    this.$selectContainer.classList.add('contact-group__select-container')
    this.$input.classList.add('contact-group__input')
    this.$btnDelete.classList.add('contact-group__btn-delete')

    this.choosse = new Choosse({
      container: this.$selectContainer,
      list: [
        {
          name: 'Телефон',
          value: 'tel',
        },
        {
          name: 'Доп. телефон',
          value: 'tel',
        },
        {
          name: 'Email',
          value: 'email',
        },
        {
          name: 'Vk',
          value: 'url',
        },
        {
          name: 'Facebook',
          value: 'url',
        },
      ],
      hideCurrentSelect: true,
      castomClass: 'contact-choosse',
      addItems: true,
    })
    this.choosse.selectedName = 'Телефон'

    if ('contacts' in options && options.contacts[0].type)this.choosse.selectedName = options.contacts[0].type

    this.inputType = this.choosse.selectedValue
    for (const select of this.choosse.listSelect) {
      select.$btnSelect.addEventListener('click', () => {
        this.inputType = this.choosse.selectedValue
        this.inputValue = ''
      })
    }

    if ('contacts' in options && options.contacts[0].value) this.inputValue = options.contacts[0].value

    this.$input.addEventListener('input', () => {
      this.inputValue = this.$input.value
    })

    this.$input.placeholder = 'Введите данные контакта'
    this.$btnDelete.innerHTML = iconContactDelete
    this.$btnDelete.type = 'button'
    new Toollee({
      $target: this.$btnDelete,
      content: `Удалить контакт`,
      customClass: 'contact-toollee',
      block: false,
    })
    this.$btnDelete.addEventListener('click', () => {
      this.delete = true
    })

    this.$inputGroup.append(this.$selectContainer, this.$input, this.$btnDelete)
    options.container.append(this.$inputGroup)
  }

  validation() {

    if (!this.inputValue) this.delete = true

    // this.validator = new Validator({
    //   value: this.inputValue.trim(),
    //   metod: 'empty',
    //   message: 'Поле обязательно к заполнению',
    //   required: this.required
    // })

    // this.invalidMessage = this.validator.message
    // this.value = this.validator.value
    // this.valid = this.validator.valid

  }


  get inputType() {
    return this._inputType
  }

  set inputType(value) {
    this._inputType = value
    if (this._inputType) this.$input.type = this._inputType
  }

  get inputValue() {
    return this._inputValue
  }

  set inputValue(value) {
    this._inputValue = value
    this.$input.value = this._inputValue
  }

  get delete() {
    return this._delete;
  }

  set delete(value) {
    this._delete = value;
    if (value) this.$inputGroup.remove()
  }
}


