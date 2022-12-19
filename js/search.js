import { iconSaerchBlack } from "./icons.js";

export function createSearchForm() {
  const btnSearch = document.createElement('button');
  btnSearch.innerHTML = iconSaerchBlack;
  btnSearch.classList.add('search-form__btn-search');
  const input = document.createElement('input');
  input.classList.add('search-form__input');
  input.placeholder = 'Введите запрос';

  return {btnSearch, input}
}
