import { Layout } from "./Layout.js";
import { Table } from "./Table-create.js";
import { ModalWindow } from "./Modal-window.js";
import { InputForm } from "./Input-forms.js";
import { createData } from "./API-crm-server.js";
import { DropMenu } from "./Menu.js";



export class AppAurora {

  constructor(container, dataTable) {
    this.validationForm = this._validationForm
    this.validAutoCorrect = this._validAutoCorrect
    this.validOnlyRus = this._validOnlyRus

    this.layout = new Layout(container)



    // createData()

    this.table = new Table(this.layout.TableContainer, dataTable)

    this.layout.btnAddClient.addEventListener('click', () => {
      this.modalWindow = new ModalWindow(true)
      this.inputFormAdd = new InputForm({
        container: this.modalWindow.contant,
        typeForm: 'add',
        personalData: [
          {
            inputName: 'surname',
            lableText: 'Фамилия',
            lableIcon: '*',
            required: true,
            // inputValue: 'Petrosian',
            // inputType
          },
          {
            inputName: 'name',
            lableText: 'Имя',
            lableIcon: '*',
            required: true,
          },
          {
            inputName: 'lastName',
            lableText: 'Отчество',
          }
        ],
        contactsData: [],
        btnCloseModal: this.modalWindow.btnCloseBottom,
        validationForm: this.validationForm,
        validAutoCorrect: this.validAutoCorrect,
        validOnlyRus: this.validOnlyRus,
      })
      // this.modalWindow.contant.append(this.inputFormAdd.$container)
    })

  }

};

