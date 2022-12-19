export class CreateElement{

  constructor(options, parent){
    this.element = document.createElement(options.tag)
    for (const[key, value] of Object.entries(options.params)) {
      if (key == 'classList') {
        if (Array.isArray(value)) {
          for (const newClass of value) this.element.classList.add(newClass)
        } else this.element.classList.add(value)
      } else this.element[key] = value
    }

    if (parent) parent.append(this.element)

    if (options.childs) {
      for (const child of options.childs) {
        let childOptions = {
          tag: child.tag,
          params: child.params,
        }
        new CreateElement(childOptions, this.element)
      }
    }

  }

}

