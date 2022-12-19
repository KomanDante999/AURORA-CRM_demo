import { iconBtnClose } from "./icons.js";

export class ModalWindow{
  constructor(btnDown){
    this.body = document.querySelector('body');
    this.modal = document.createElement('div')
    this.container = document.createElement('div')
    this.contant = document.createElement('div')
    this.btnCloseTop = document.createElement('button')
    this.btnCloseBottom = document.createElement('button')
    if (!btnDown) {
      this.btnCloseBottom.style.display = 'none'
    }

    this.body.classList.add('over-hidden')
    this.modal.classList.add('kd-modal', 'is-open')
    this.container.classList.add('kd-modal__container', 'is-open')
    this.contant.classList.add('kd-modal__contant')
    this.btnCloseTop.classList.add('kd-modal__btn-close_top')
    this.btnCloseBottom.classList.add('kd-modal__btn-close_bottom')

    this.btnCloseTop.innerHTML = iconBtnClose
    // this.btnCloseBottom.textContent = 'Отмена'

    this.btnCloseTop.addEventListener('click', () => {
      this.modal.classList.remove('is-open')
      this.modal.classList.add('is-close')
      this.container.classList.remove('is-open')
      this.container.classList.add('is-close')
      this.modal.addEventListener('animationend', () => {
        this.modal.remove()
        this.body.classList.remove('over-hidden')
      })
    })
    this.btnCloseBottom.addEventListener('click', () => {
      this.modal.classList.remove('is-open')
      this.modal.classList.add('is-close')
      this.container.classList.remove('is-open')
      this.container.classList.add('is-close')
      this.modal.addEventListener('animationend', () => {
        this.modal.remove()
        this.body.classList.remove('over-hidden')
      })
    })
    this.container.addEventListener('click', event => {
      event._clickOnModal = true
    })
    this.modal.addEventListener('click', event => {
      if (!event._clickOnModal) {
          this.modal.classList.remove('is-open')
          this.modal.classList.add('is-close')
          this.container.classList.remove('is-open')
          this.container.classList.add('is-close')
          this.modal.addEventListener('animationend', () => {
            this.modal.remove()
            this.body.classList.remove('over-hidden')
          })
      }
    })

    this.container.append(this.btnCloseTop, this.contant, this.btnCloseBottom)
    this.modal.append(this.container)
    this.body.append(this.modal)
  }
}


