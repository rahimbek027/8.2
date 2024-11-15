var itemList = document.getElementById('item-list');
var itemForm = document.getElementById('item-form');
var nameInput = document.getElementById('name');
var descriptionInput = document.getElementById('description');
var items = JSON.parse(localStorage.getItem('items') || '[]');
// Ma'lumotlarni yangilab ko‘rsatish
function renderItems() {
    itemList.innerHTML = '';
    items.forEach(function (item) {
        var li = document.createElement('li');
        li.className = 'item';
        li.innerHTML = "\n        ".concat(item.name, ": ").concat(item.description, "\n        <span class=\"btn\" onclick=\"deleteItem(").concat(item.id, ")\">Delete</span>\n      ");
        itemList.appendChild(li);
    });
}
// Yangi element qo‘shish
function addItem(name, description) {
    var newItem = { id: Date.now(), name: name, description: description };
    items.push(newItem);
    localStorage.setItem('items', JSON.stringify(items));
    renderItems();
}
// Elementni o‘chirish
function deleteItem(id) {
    items = items.filter(function (item) { return item.id !== id; });
    localStorage.setItem('items', JSON.stringify(items));
    renderItems();
}
itemForm.addEventListener('submit', function (e) {
    e.preventDefault();
    addItem(nameInput.value, descriptionInput.value);
    nameInput.value = '';
    descriptionInput.value = '';
});
renderItems();
// deleteItem funksiyasini globalga qo'shish
window.deleteItem = deleteItem;
