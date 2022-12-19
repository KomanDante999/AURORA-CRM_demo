import { logoSvg, iconAddClient } from "./icons.js";

export class Layout {
  constructor(container) {
    this.header = document.createElement('div')
    this.headerContainer = document.createElement('div')
    this.headerLogo = document.createElement('div')
    this.searchContainer = document.createElement('div')
    this.main = document.createElement('div')
    this.mainContainer = document.createElement('div')
    this.mainTitle = document.createElement('h1')
    this.mainSubtitle = document.createElement('h2')
    this.TableContainer = document.createElement('div')
    this.footer = document.createElement('div')
    this.footerContainer = document.createElement('div')
    this.btnAddClient = document.createElement('button')
    this.btnAddClientIcon = document.createElement('span')
    this.btnAddClientCaption = document.createElement('span')

    this.header.classList.add('header')
    this.headerContainer.classList.add('header__container', 'container')
    this.headerLogo.classList.add('header__logo')
    this.headerLogo.innerHTML = logoSvg
    this.searchContainer.classList.add('header__search')

    this.main.classList.add('main')
    this.mainContainer.classList.add('main__container', 'container')
    this.mainTitle.classList.add('main__title', 'visually-hidden')
    this.mainTitle.textContent = 'Аврора CRM- автоматизированная система управление взаимоотношениями с клиентами'
    this.mainSubtitle.classList.add('main__subtitle')
    this.mainSubtitle.textContent = 'Клиенты'
    this.TableContainer.classList.add('main__table')
    this.footer.classList.add('footer')
    this.footerContainer.classList.add('footer__container', 'container')
    this.btnAddClient.classList.add('footer__btn', 'btn-addclient', 'btn', 'btn-secondary')
    this.btnAddClientIcon.classList.add('btn-addclient__icon')
    this.btnAddClientIcon.innerHTML = iconAddClient
    this.btnAddClientCaption.classList.add('btn-addclient__caption')
    this.btnAddClientCaption.textContent = 'Добавить клиента'

    this.headerContainer.append(this.headerLogo, this.searchContainer)
    this.header.append(this.headerContainer)
    this.mainContainer.append(this.mainTitle, this.mainSubtitle, this.TableContainer)
    this.main.append(this.mainContainer)
    this.btnAddClient.append(this.btnAddClientIcon, this.btnAddClientCaption)
    this.footerContainer.append(this.btnAddClient)
    this.footer.append(this.footerContainer)
    container.append(this.header, this.main, this.footer)
  }
};
