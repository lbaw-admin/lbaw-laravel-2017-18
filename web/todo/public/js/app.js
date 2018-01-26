let items = document.querySelectorAll('article.card input[type=checkbox]');
[].forEach.call(items, function(item) {
  item.addEventListener('change', itemChanged);
});

let itemCreators = document.querySelectorAll('article.card form.new_item');
[].forEach.call(itemCreators, function(creator) {
  creator.addEventListener('submit', itemCreated);
});

let cardCreator = document.querySelector('article.card form.new_card');
cardCreator.addEventListener('submit', cardCreated);

function encodeForAjax(data) {
  return Object.keys(data).map(function(k){
    return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
  }).join('&');
}

function itemChanged() {
  let request = new XMLHttpRequest();
  request.addEventListener('load', updateItem);
  request.open("post", "/api/item/" + this.value, true);
  request.setRequestHeader('X-CSRF-TOKEN', document.querySelector('meta[name="csrf-token"]').content);
  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  request.send(encodeForAjax({done: this.checked}));
}

function itemCreated(event) {
  event.preventDefault();
  let request = new XMLHttpRequest();
  request.addEventListener('load', addItem);
  request.open("put", "/api/cards/" + this.querySelector('input[name=card_id]').value, true);
  request.setRequestHeader('X-CSRF-TOKEN', document.querySelector('meta[name="csrf-token"]').content);
  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  request.send(encodeForAjax({description: this.querySelector('input[name=description]').value}));
}

function cardCreated(event) {
  event.preventDefault();
  let request = new XMLHttpRequest();
  request.addEventListener('load', addCard);
  request.open("put", "/api/cards", true);
  request.setRequestHeader('X-CSRF-TOKEN', document.querySelector('meta[name="csrf-token"]').content);
  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  request.send(encodeForAjax({name: this.querySelector('input[name=name]').value}));
}

function updateItem() {
  let item = JSON.parse(this.responseText);
  let element = document.querySelector('article.card input[type=checkbox][value="' + item.id + '"]');
  element.checked = item.done == "true";
}

function addItem() {
  if (this.status != 200) window.location = '/';
  console.log(this.status);
  let item = JSON.parse(this.responseText);
  let input = document.querySelector('article.card input[type=hidden][value="' + item.card_id + '"]');
  let form = input.parentNode;
  let ul = form.previousElementSibling;

  let new_item = document.createElement('li');
  new_item.innerHTML = `
    <label>
      <input value="${item.id}" type="checkbox"> ${item.description}
    </label>
  `;
  new_item.querySelector('input').addEventListener('change', itemChanged);

  form.querySelector('[type=text]').value="";
  ul.append(new_item);
}

function addCard() {
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
