import { Choosse } from "../library/choosse/Choosse.min.js";

/*
new DropMenu({
  container: Node,
  listItems: [
    {
      name: '',                 // name by switch
      value: ,                  // default value by switch
      lable: ''                 // title by switch
      type: 'radio'             // 'radio', 'select'
      list: [             // only by 'select', list items
        {
          name: 'Русский',
          value: 'rus',
        },
        {
          name: 'English',
          value: 'eng',
        }
      ]
    }
  ]
})
*/
export class DropMenu {
  _isActive = false
  _dropMenuDisable = true

  constructor(params) {
    // layout
    this.$menu = document.createElement('div')
    this.$btnActive = document.createElement('button')
    this.$title = document.createElement('span')
    this.$dropMenu = document.createElement('div')
    this.$dropList = document.createElement('ul')

    this.$line1 = document.createElement('span')
    this.$line2 = document.createElement('span')
    this.$line3 = document.createElement('span')

    this.$menu.classList.add('drop-menu')
    this.$btnActive.classList.add('drop-menu__btn-header')
    this.$title.classList.add('drop-menu__title')
    this.$dropMenu.classList.add('drop-menu__menu')
    this.$dropList.classList.add('drop-menu__list')
    this.$btnActive.type = 'button'
    this.$dropList.tabIndex = '-1'
    // this.$title.textContent = 'Настройки'
    this.$line1.classList.add('drop-menu__line', 'drop-menu__line_1')
    this.$line2.classList.add('drop-menu__line', 'drop-menu__line_2')
    this.$line3.classList.add('drop-menu__line', 'drop-menu__line_3')

    this.$title.append(this.$line1, this.$line2, this.$line3)
    this.$btnActive.append(this.$title)
    this.$dropMenu.append(this.$dropList)
    this.$menu.append(this.$btnActive, this.$dropMenu)
    if ('container' in params) params.container.append(this.$menu)

    // data
    this.listSelect = []
    this.dropMenuDisable = this._dropMenuDisable

    // events
    this.$btnActive.addEventListener('click', () => {
      this.isActive = !this.isActive
      if (this.isActive) this.dropMenuDisable = false
    })

    this.$dropMenu.addEventListener('animationend', () => {
      if (!this.isActive) this.dropMenuDisable = true
    })

    this.$menu.addEventListener('click', event => {
      event._clickOnMenu = true
    })

    document.body.addEventListener('click', event => {
      if (!event._clickOnMenu && this.isActive) {
        this.isActive = false
      }
    })

    // create contant menu
    if ('listItems' in params) {
      for (const item of params.listItems) {
        this.$item = document.createElement('li')
        this.$item.classList.add('drop-menu__item')

        this.switch = new Switch({
          container:this.$item,
          options: item,
        })

        this.listSelect.push(this.switch)
        this.$dropList.append(this.$item)
      }
    }
  }

  get isActive() {
    return this._isActive;
  }

  set isActive(value) {
    this._isActive = value
    if (value) {
      this.$dropMenu.classList.add('is-open')
      this.$dropMenu.classList.remove('is-close')

    } else {
      this.$dropMenu.classList.remove('is-open')
      this.$dropMenu.classList.add('is-close')
    }
  }

  get dropMenuDisable() {
    return this._dropMenuDisable;
  }

  set dropMenuDisable(value) {
    this._dropMenuDisable = value;
    if (value) this.$dropMenu.classList.add('visually-hidden')
    else this.$dropMenu.classList.remove('visually-hidden')
}

};

class Switch {
  _value = false
  _disable = false

  constructor(params) {

    this.$box = document.createElement('div')
    this.$lable = document.createElement('div')

    this.$box.classList.add('switch')
    this.$lable.classList.add('switch__lable')

    switch (params.options.type) {
      case 'radio':
        this.$btnHeader = document.createElement('button')
        this.$btnHeader.classList.add('switch__button')
        this.$btnHeader.addEventListener('click', () => {
          this.value = !this.value
        })
        this.$box.append(this.$btnHeader)

        break;
        case 'select':
          this.select = new Choosse({
            container: this.$box,
            list: params.options.list,
          })
          console.log('this.select :>> ', this.select);
        this.$btnHeader = this.select.$btnHeader

        break;
    }


    this.value = this._value
    this.name = params.options.name
    this.value = params.options.value
    this.$lable.textContent = params.options.lable
    this.disable = this._disable

    this.$box.append(this.$lable)
    if ('container' in params) params.container.append(this.$box)
  }

  get value() {
    return this._value;
  }

  set value(value) {
    this._value = value;
    if (this.$btnHeader) {
      value ? this.$btnHeader.classList.add('is-selected') : this.$btnHeader.classList.remove('is-selected')
    }
  }

  get disable() {
    return this._disable;
  }

  set disable(value) {
    this._disable = value;
    if (this.$btnHeader) {
      if (value) {
        this.$btnHeader.disabled = true
        this.$box.classList.add('is-disable')
        this.$btnHeader.classList.add('is-disable')
      } else {
        this.$btnHeader.disabled = false
        this.$box.classList.remove('is-disable')
        this.$btnHeader.classList.remove('is-disable')
      }
    }
  }
}


