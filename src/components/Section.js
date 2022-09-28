export default class Section {
  constructor({
    items,
    renderer
  }, selector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  addItem(item) {
    this._container.prepend(this._renderer(item));
  }

  renderItems(items = this._items) {
    items.forEach((item) => this.addItem(item));
  }
}
