import { iconArrowDown, iconVk, iconFb, iconPhone, iconEmail, iconOther, iconBtnEdit, iconBtnCancel ,iconLoadMin } from "./icons.js";
import { ListClients } from "./List-clients.js";
import { Toollee } from "../library/toollee/toollee.min.js";

// вид заголовка таблицы
export let dataTableHead = [
  {
    name: 'id',
    sortable: true,
    params: {
      classList: ['table__head-cell', 'sortable', 'table__head-cell_id'],
      textContent: 'ID',
    },
    childs: [
      {
        tag: 'span',
        params: {
          classList: 'table__icon-sort',
          innerHTML: iconArrowDown,
        },
      },
    ],
  },
  {
    name: 'fullName',
    sortable: true,
    params: {
      classList: ['table__head-cell', 'sortable', 'table__head-cell_full-name'],
      textContent: 'Фамилия Имя Отчество',
    },
    childs: [
      {
        tag: 'span',
        params: {
          classList: 'table__icon-sort',
          innerHTML: iconArrowDown,
        },
      },
      {
        tag: 'span',
        params: {
          classList: 'table__type-sort',
          textContent: 'Я-А',
        },
      },
    ],
  },
  {
    name: 'dateCreation',
    sortable: true,
    params: {
      classList: ['table__head-cell', 'sortable', 'table__head-cell_create-date'],
      textContent: 'Дата и время создания',
    },
    childs: [
      {
        tag: 'span',
        params: {
          classList: 'table__icon-sort',
          innerHTML: iconArrowDown,
        },
      },
    ],
  },
  {
    name: 'dateChange',
    sortable: true,
    params: {
      classList: ['table__head-cell', 'sortable', 'table__head-cell_change-date'],
      textContent: 'Последние изменения',
    },
    childs: [
      {
        tag: 'span',
        params: {
          classList: 'table__icon-sort',
          innerHTML: iconArrowDown,
        },
      },
    ],
  },
  {
    name: 'contacts',
    sortable: false,
    params: {
      classList: ['table__head-cell', 'table__head-cell_contacts'],
      textContent: 'Контакты',
    },
  },
  {
    name: 'actions',
    sortable: false,
    params: {
      classList: ['table__head-cell', 'table__head-cell_actions'],
      textContent: 'Действия',
    },
  },
]

// создание ячейки заголовка таблицы ===========================
class CreateHeadCell {
  _sortDirect = false
  _sortActive = false
  _cellChilds = []

  constructor(options) {
    this.cell = document.createElement('th')

    this.name = options.name
    this.sortDirect = this._sortDirect
    this.sortable = options.sortable
    this.sortActive = this._sortActive

    if (options.params) {
      this.addAttributes(this.cell, options.params)
    }

    if (options.childs) {
      for (const child of options.childs) {
        this.cellChild = document.createElement(child.tag)
        this.addAttributes(this.cellChild, child.params)
        this.cell.append(this.cellChild)
        this._cellChilds.push(this.cellChild)
      }
    }

    if (this.sortable) {
      this.cell.addEventListener('click', () => {
        this.sortDirect = !this.sortDirect
      })
    }
  }

  addAttributes(targetNode, objParams) {
    for (const[key, value] of Object.entries(objParams)) {
      if (key == 'classList') {
        if (Array.isArray(value)) {
          for (const newClass of value) targetNode.classList.add(newClass)
        } else targetNode.classList.add(value)
      } else targetNode[key] = value
    }
  }

  set sortDirect(value) {
    this._sortDirect = value

    if (value) {
      this.cell.classList.add('sort-up')
      if (this._cellChilds.length > 0)
      for (const child of this._cellChilds) {
        child.classList.add('sort-up')
        if (child.textContent === 'Я-А') child.textContent = 'А-Я'

      }

    } else {
      this.cell.classList.remove('sort-up')
      if (this._cellChilds.length > 0)
      for (const child of this._cellChilds) {
        child.classList.remove('sort-up')
        if (child.textContent === 'А-Я') child.textContent = 'Я-А'
      }
    }
  }

  get sortDirect() {return this._sortDirect}

  set sortActive(value) {
    this._sortActive = value
    if (this._sortActive) {
      this.cell.classList.add('is-sorted')
    } else {
      this.cell.classList.remove('is-sorted')
    }
  }

  get sortActive() {return this._sortActive}

};

// elements by table body ===========================
class CreateCellContact {

  constructor(container, contacts) {
    this.list = document.createElement('ul')

    for (const contact of contacts) {

      this.item = document.createElement('li')
      this.link = document.createElement('a')
      this.tooltip = document.createElement('span')
      this.tooltipType = document.createElement('span')
      this.tooltipValue = document.createElement('span')

      container.classList.add('cell-contact')
      this.list.classList.add('cell-contact__list')
      this.item.classList.add('cell-contact__item')
      this.link.classList.add('cell-contact__link')
      this.tooltip.classList.add('tooltip-contact__wrap')
      this.tooltipType.classList.add('tooltip-contact__type')
      this.tooltipValue.classList.add('tooltip-contact__value')

      switch (contact.type) {
        case 'tel':
          this.link.innerHTML = iconPhone
          break;
        case 'email':
          this.link.innerHTML = iconEmail
          break;
        case 'vk':
          this.link.innerHTML = iconVk
          break;
        case 'facebook':
          this.link.innerHTML = iconFb
          break;
          default:
          this.link.innerHTML = iconOther
          break;
      }

      this.tooltipType.textContent = `${contact.name}:`
      this.tooltipValue.textContent = contact.value
      this.tooltip.append(this.tooltipType, this.tooltipValue)

      new Toollee({
        $target: this.link,
        content: this.tooltip,
        placement: 'top',
        // block: true,
        // trigger: 'click',
        arrowPos: 'center',
        // arrowOffset: 0,
        // arrowW: 0,
        // arrowH: 0,
        // margin: 10,
        // theme: 'blue',
        customClass: 'tooltip-contact',
      })
      this.item.append(this.link)
      this.list.append(this.item)
    }
    container.append(this.list)
  }
}

class CreateCellActive {

  constructor(container) {
    this.wrap = document.createElement('div')
    this.buttonChange = document.createElement('button')
    this.buttonDelete = document.createElement('button')
    this.iconChange = document.createElement('span')
    this.iconDelete = document.createElement('span')
    this.textChange = document.createElement('span')
    this.textDelete = document.createElement('span')

    this.wrap.classList.add('table__wrap-buttons')
    this.buttonChange.classList.add('table__button-change')
    this.buttonDelete.classList.add('table__button-delete')
    this.iconChange.classList.add('table__icon-change')
    this.iconDelete.classList.add('table__icon-delete')
    this.textChange.classList.add('table__text-change')
    this.textDelete.classList.add('table__text-delete')

    this.iconChange.innerHTML = iconBtnEdit
    this.iconDelete.innerHTML = iconBtnCancel
    this.textChange.innerHTML = 'Изменить'
    this.textDelete.innerHTML = 'Удалить'

    this.buttonChange.append(this.iconChange, this.textChange)
    this.buttonDelete.append(this.iconDelete, this.textDelete)

    this.buttonChange.addEventListener('click', () => {
      console.log('che :>> ', this.buttonChange);
    })
    this.buttonDelete.addEventListener('click', () => {

      console.log('del :>> ', this.buttonDelete);
    })

    this.wrap.append(this.buttonChange, this.buttonDelete)
    container.append(this.wrap)
  }
}


class CreateBodyRow {
  _visibleElem = 4

  constructor(container, dataHead, dataClient) {
    for (const cellHead of dataHead) {
      this.cell = document.createElement('td')
      this.cell.classList.add('table__body-cell')
      this.name = cellHead.name

      this.cell.classList.add('table__body-cell')

      switch (cellHead.name) {
        case 'id':
          this.cell.textContent = dataClient.id
          break;
        case 'fullName':
          this.cell.textContent = dataClient.fullName
          break;
        case 'dateCreation':
          this.cell.textContent = dataClient.dateCreationStr()
          break;
        case 'dateChange':
          this.cell.textContent = dataClient.dateChangeStr()
          break;
        case 'contacts':
          this.cell.classList.add('table__body-cell_contacts')
          if (dataClient.contacts.length > 0) {
            this.hiddenCells = dataClient.contacts.length - this._visibleElem
            this.createContactlist(this.cell, dataClient.contactsMin, dataClient.contacts, this.hiddenCells)
          }
          break;
          case 'actions':
            new CreateCellActive(this.cell)
            break;
      }
      container.append(this.cell)
    }
  }

  createContactlist(container, arrayMin, array, hiddenCells) {
    container.innerHTML = ''
    if (hiddenCells > 1) {
      this.listContacts = new CreateCellContact(container, arrayMin)
      this.btnUnwrap = document.createElement('button')
      this.btnUnwrap.classList.add('btn-unwrap')
      this.btnUnwrap.textContent = `+${hiddenCells}`
      new Toollee({
        $target: this.btnUnwrap,
        content: `Показать +${hiddenCells} контактов`,
        placement: 'top',
        // block: true,
        // trigger: 'click',
        arrowPos: 'center',
        // arrowOffset: 0,
        // arrowW: 0,
        // arrowH: 0,
        // margin: 10,
        // theme: 'blue',
        customClass: 'unwrap-toollee',
      })
      this.listContacts.list.append(this.btnUnwrap)

      this.btnUnwrap.addEventListener('click', () => {
        container.innerHTML = ''
        this.listContacts = new CreateCellContact(container, array)
      })
    } else new CreateCellContact(container, array)
  }
};

// создание таблицы ============================================
export class Table {
  _bodyRows = []
  _currentSort = ''
  _sortDirect = true

  constructor(container, dataTable) {
    // data
    this.dataHead = dataTable.dataHead
    this.headCells = []
    this.currentSort = dataTable.currentSort
    this.sortDirect = this._sortDirect
    this.dataClient = new ListClients(dataTable.dataBody, dataTable.currentSort)

    this.table = document.createElement('table')
    this.table.classList.add('table')

    // head table
    this.head = document.createElement('thead')
    this.headRow = document.createElement('tr')
    this.head.classList.add('table__head')
    this.headRow.classList.add('table__head-row')

    this.createHead()

    // body table
    this.body = document.createElement('tbody')
    this.body.classList.add('table__body')

    this.updateBody()


    this.head.append(this.headRow)
    this.table.append(this.head, this.body)
    container.append(this.table)
  }

  createHead() {
    if (this.dataHead.length > 0) {
      for (const cellObj of this.dataHead) {
        this.headCell = new CreateHeadCell(cellObj)
        if (this.currentSort == cellObj.name) {
          this.headCell.sortDirect = true
          this.headCell.sortActive = true
        }
        this.headCells.push(this.headCell)
        this.headRow.append(this.headCell.cell)
      }

      for (const headCell of this.headCells) {
        if (headCell.sortable) {
          headCell.cell.addEventListener('click', () => {
            if (headCell.name !== this.currentSort) {
              this.currentSort = headCell.name
              headCell.sortActive = true
            } else this.sortDirect = !this.sortDirect

          })
        }
      }
    }
  }

  updateBody() {
    let dataBody = []
    this.body.innerHTML = ''
    dataBody = this.dataClient._arrayClients

    if (dataBody.length > 0) {
      for (const client of dataBody) {
        this.row = document.createElement('tr')
        this.row.classList.add('table__body-row')
        new CreateBodyRow(this.row, this.headCells, client)
        this.body.append(this.row)
      }
    }
  }

  set currentSort(value) {
    this._currentSort = value
    for (const headCell of this.headCells) {
      headCell.sortDirect = false
      headCell.sortActive = false
      if (headCell.name == value) headCell.sortDirect = true
    }
    if (this.dataClient) {
      this.dataClient.sortKey = value
      this.updateBody()
    }
  }
  get currentSort() {
    return this._currentSort
  }

  set sortDirect(value) {
    this._sortDirect = value
    if (this.dataClient) {
      this.dataClient.sortDir = value
      this.updateBody()
    }
  }
  get sortDirect() {
    return this._sortDirect
  }

};





