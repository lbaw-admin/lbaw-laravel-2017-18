function addEventListeners() {
  let items = document.querySelectorAll('article.card input[type=checkbox]');
  [].forEach.call(items, function(item) {
    item.addEventListener('change', sendItemChangeRequest);
  });

  let itemCreators = document.querySelectorAll('article.card form.new_item');
  [].forEach.call(itemCreators, function(creator) {
    creator.addEventListener('submit', sendCreateItemRequest);
  });

  let itemDeleters = document.querySelectorAll('article.card li a.delete');
  [].forEach.call(itemDeleters, function(deleter) {
    deleter.addEventListener('click', sendDeleteItemRequest);
  });

  let cardDeleters = document.querySelectorAll('article.card header a.delete');
  [].forEach.call(cardDeleters, function(deleter) {
    deleter.addEventListener('click', sendDeleteCardRequest);
  });

  let cardCreator = document.querySelector('article.card form.new_card');
  if (cardCreator != null)
    cardCreator.addEventListener('submit', sendCreateCardRequest);
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

function sendItemChangeRequest() {
  sendAjaxRequest('post', '/api/item/' + this.value, {done: this.checked}, itemUpdatedHandler);
}

function sendDeleteItemRequest() {
  let id = this.parentElement.querySelector('input').value;
  sendAjaxRequest('delete', '/api/item/' + id, null, itemDeletedHandler);
}

function sendCreateItemRequest(event) {
  event.preventDefault();
  let id = this.querySelector('input[name=card_id]').value;
  sendAjaxRequest('put', '/api/cards/' + id, {description: this.querySelector('input[name=description]').value}, itemAddedHandler);
}

function sendDeleteCardRequest(event) {
  let id = this.closest('article').querySelector('input[type=hidden]').value;
  sendAjaxRequest('delete', '/api/cards/' + id, null, cardDeletedHandler);
}

function sendCreateCardRequest(event) {
  event.preventDefault();
  let name = this.querySelector('input[name=name]').value;
  sendAjaxRequest('put', '/api/cards/', {name: name}, cardAddedHandler);
}

function itemUpdatedHandler() {
  let item = JSON.parse(this.responseText);
  let element = document.querySelector('article.card input[type=checkbox][value="' + item.id + '"]');
  element.checked = item.done == "true";
}

function itemAddedHandler() {
  if (this.status != 200) window.location = '/';
  let item = JSON.parse(this.responseText);
  let input = document.querySelector('article.card input[type=hidden][value="' + item.card_id + '"]');
  let form = input.parentNode;

  let new_item = document.createElement('li');
  new_item.innerHTML = `
    <label>
      <input value="${item.id}" type="checkbox"> <span>${item.description}</span><a href="#" class="delete">&#10761;</a>
    </label>
  `;

  new_item.querySelector('input').addEventListener('change', sendItemChangeRequest);
  new_item.querySelector('a.delete').addEventListener('click', sendDeleteItemRequest);

  form.querySelector('[type=text]').value="";
  form.previousElementSibling.append(new_item);
}

function itemDeletedHandler() {
  if (this.status != 200) window.location = '/';
  let item = JSON.parse(this.responseText);
  let element = document.querySelector('article.card input[type=checkbox][value="' + item.id + '"]');
  element.closest('li').remove();
}

function cardDeletedHandler() {
  //if (this.status != 200) window.location = '/';
  let card = JSON.parse(this.responseText);
  let article = document.querySelector('article.card input[type=hidden][value="' + card.id + '"]').closest('article');
  article.remove();
}

function cardAddedHandler() {
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
    <a href="#" class="delete">&#10761;</a>
  </header>
  <ul></ul>
  <form class="new_item">
    <input name="card_id" value="${card.id}" type="hidden">
    <input name="description" type="text">
  </form>`;

  form.querySelector('[type=text]').value="";
  section.insertBefore(new_card, article);

  let creator = new_card.querySelector('form.new_item');
  creator.addEventListener('submit', sendCreateItemRequest);

  let deleter = new_card.querySelector('header a.delete');
  deleter.addEventListener('click', sendDeleteCardRequest);

  new_card.querySelector('[type=text]').focus();
}

addEventListeners();
