function addEventListeners() {
  let items = document.querySelectorAll('article.card input[type=checkbox]');
  [].forEach.call(items, function(item) {
    item.addEventListener('change', itemChanged);
  });

  let itemCreators = document.querySelectorAll('article.card form.new_item');
  [].forEach.call(itemCreators, function(creator) {
    creator.addEventListener('submit', itemCreated);
  });

  let itemDeleters = document.querySelectorAll('article.card a.delete');
  [].forEach.call(itemDeleters, function(deleter) {
    deleter.addEventListener('click', itemDeleted);
  });

  let cardCreator = document.querySelector('article.card form.new_card');
  if (cardCreator != null)
    cardCreator.addEventListener('submit', cardCreated);
}

function encodeForAjax(data) {
  if (data == null) return null;
  return Object.keys(data).map(function(k){
    return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
  }).join('&');
}

function sendAjaxRequest(method, url, data, handler) {
  let request = new XMLHttpRequest();
  request.open(method, url, true);
  request.setRequestHeader('X-CSRF-TOKEN', document.querySelector('meta[name="csrf-token"]').content);
  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  request.addEventListener('load', handler);
  request.send(encodeForAjax(data));
}

function itemChanged() {
  sendAjaxRequest('post', '/api/item/' + this.value, {done: this.checked}, updateItemHandler);
}

function itemDeleted() {
  let id = this.parentElement.querySelector('input').value;
  sendAjaxRequest('delete', '/api/item/' + id, null, deleteItemHandler);
}

function itemCreated(event) {
  event.preventDefault();
  let id = this.querySelector('input[name=card_id]').value;
  sendAjaxRequest('put', '/api/cards/' + id, {description: this.querySelector('input[name=description]').value}, addItemHandler);
}

function cardCreated(event) {
  event.preventDefault();
  let name = this.querySelector('input[name=name]').value;
  sendAjaxRequest('put', '/api/cards/', {name: name}, addCardHandler);
}

function updateItemHandler() {
  let item = JSON.parse(this.responseText);
  let element = document.querySelector('article.card input[type=checkbox][value="' + item.id + '"]');
  element.checked = item.done == "true";
}

function addItemHandler() {
  if (this.status != 200) window.location = '/';
  let item = JSON.parse(this.responseText);
  let input = document.querySelector('article.card input[type=hidden][value="' + item.card_id + '"]');
  let form = input.parentNode;
  let ul = form.previousElementSibling;

  let new_item = document.createElement('li');
  new_item.innerHTML = `
    <label>
      <input value="${item.id}" type="checkbox"> <span>${item.description}</span><a href="#" class="delete">&#10761;</a>
    </label>
  `;

  new_item.querySelector('input').addEventListener('change', itemChanged);
  new_item.querySelector('a.delete').addEventListener('click', itemDeleted);

  form.querySelector('[type=text]').value="";
  ul.append(new_item);
}

function deleteItemHandler() {
  if (this.status != 200) window.location = '/';
  let item = JSON.parse(this.responseText);
  let element = document.querySelector('article.card input[type=checkbox][value="' + item.id + '"]');
  let li = element.parentElement.parentElement;
  li.remove();
}

function addCardHandler() {
  if (this.status != 200) window.location = '/';
  let card = JSON.parse(this.responseText);
  let form = document.querySelector('article.card form.new_card');
  let article = form.parentElement;
  let section = article.parentElement;

  let new_card = document.createElement('article');
  new_card.classList.add('card');
  new_card.innerHTML = `
  <header>
    <h2><a href="cards/${card.id}">${card.name}</a></h2>
  </header>
  <ul></ul>
  <form class="new_item">
    <input name="card_id" value="${card.id}" type="hidden">
    <input name="description" type="text">
  </form>`;

  form.querySelector('[type=text]').value="";
  section.insertBefore(new_card, article);

  let creator = new_card.querySelector('form.new_item');
  creator.addEventListener('submit', itemCreated);

  new_card.querySelector('[type=text]').focus();
}

addEventListeners();
