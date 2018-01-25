let items = document.querySelectorAll('article.card input[type=checkbox]');
[].forEach.call(items, function(item) {
  item.addEventListener('change', itemChanged);
});

let itemCreators = document.querySelectorAll('article.card form');
[].forEach.call(itemCreators, function(creator) {
  creator.addEventListener('submit', itemCreated);
});

function encodeForAjax(data) {
  return Object.keys(data).map(function(k){
    return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
  }).join('&');
}

function itemChanged() {
  let request = new XMLHttpRequest();
  request.addEventListener('load', updateItem);
  request.open("post", "(/api/item/" + this.value, true);
  request.setRequestHeader('X-CSRF-TOKEN', document.querySelector('meta[name="csrf-token"]').content);
  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  request.send(encodeForAjax({done: this.checked}));
}

function itemCreated(event) {
  event.preventDefault();
  let request = new XMLHttpRequest();
  request.addEventListener('load', addItem);
  request.open("put", "/api/card/" + this.querySelector('input[name=card_id]').value, true);
  request.setRequestHeader('X-CSRF-TOKEN', document.querySelector('meta[name="csrf-token"]').content);
  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  request.send(encodeForAjax({description: this.querySelector('input[name=description]').value}));
}

function updateItem() {
  let item = JSON.parse(this.responseText);
  let element = document.querySelector('article.card input[type=checkbox][value="' + item.id + '"]');
  element.checked = item.done == "true";
}

function addItem() {
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
