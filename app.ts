interface Item {
    id: number;
    name: string;
    description: string;
  }
  
  const itemList = document.getElementById('item-list') as HTMLUListElement;
  const itemForm = document.getElementById('item-form') as HTMLFormElement;
  const nameInput = document.getElementById('name') as HTMLInputElement;
  const descriptionInput = document.getElementById('description') as HTMLInputElement;
  
  let items: Item[] = JSON.parse(localStorage.getItem('items') || '[]');
  
  
  function renderItems() {
    itemList.innerHTML = '';
    items.forEach((item) => {
      const li = document.createElement('li');
      li.className = 'item';
      li.innerHTML = `
        ${item.name}: ${item.description}
        <span class="btn" onclick="deleteItem(${item.id})">Delete</span>
      `;
      itemList.appendChild(li);
    });
  }
  
  
  function addItem(name: string, description: string) {
    const newItem: Item = { id: Date.now(), name, description };
    items.push(newItem);
    localStorage.setItem('items', JSON.stringify(items));
    renderItems();
  }
  
 
  function deleteItem(id: number) {
    items = items.filter((item) => item.id !== id);
    localStorage.setItem('items', JSON.stringify(items));
    renderItems();
  }
  
  itemForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addItem(nameInput.value, descriptionInput.value);
    nameInput.value = '';
    descriptionInput.value = '';
  });
  
  renderItems();
  
  
  (window as any).deleteItem = deleteItem;
  