class DataClient {

  constructor(dataClient) {
    this.id = dataClient.id
    this.surname = dataClient.perconalData.surname
    this.name = dataClient.perconalData.name
    this.middleName = dataClient.perconalData.middleName
    this.fullName = this.getFullName()
    this.dateCreation = dataClient.dateCreation
    this.dateChange = dataClient.dateChange
    this.contacts = []
    this.contactsMin = []

    if (dataClient.contactData) {
      this.contactData = dataClient.contactData.slice(0, 10)
      for (const item of this.contactData) {
        let contact = {
          name: item.name,
          type: item.type,
          value: item.value,
        }
        this.contacts.push(contact)
      }
    }

    this.contactsMin = this.contacts.slice(0, 4)
  }

  getFullName() {
    return `${this.surname} ${this.name} ${this.middleName}`
  }

  dateCreationStr() {
    const year  = this.dateCreation.getFullYear()
    let month  = this.dateCreation.getMonth() +1
    let day  = this.dateCreation.getDate()
    let hours = this.dateCreation.getHours()
    let minutes = this.dateCreation.getMinutes()
    if (month < 10) month = `0${month}`
    if (day < 10) day = `0${day}`
    if (hours < 10) hours = `0${hours}`
    if (minutes < 10) minutes = `0${minutes}`
    return `${day}.${month}.${year}  ${hours}:${minutes}`
  }

  dateChangeStr() {
    const year  = this.dateChange.getFullYear()
    let month  = this.dateChange.getMonth() +1
    let day  = this.dateChange.getDate()
    let hours = this.dateChange.getHours()
    let minutes = this.dateChange.getMinutes()
    if (month < 10) month = `0${month}`
    if (day < 10) day = `0${day}`
    if (hours < 10) hours = `0${hours}`
    if (minutes < 10) minutes = `0${minutes}`
    return `${day}.${month}.${year}  ${hours}:${minutes}`
  }
}


export class ListClients {
  _arrayClients = []
  _sortKey = ''
  _sortDir = true

  constructor(dataTable, currentSort) {

    for (const client of dataTable) {
      this._arrayClients.push(new DataClient(client))
    }
    this.sortKey = currentSort
  }

  sorted() {
    this._arrayClients.sort((a,b) => {
      if (this.sortDir ? a[this.sortKey] < b[this.sortKey] : a[this.sortKey] > b[this.sortKey]) return -1
    })
  }

  set sortKey(value) {
    this._sortKey = value
    if (value) this.sortDir = true
  }
  get sortKey() {
    return this._sortKey;
  }
  set sortDir(value) {
    this._sortDir = value
    this.sorted()
  }
  get sortDir() {
    return this._sortDir;
  }
}









