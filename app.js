const root = document.getElementById('root');
let booksList = JSON.parse(localStorage.getItem('books'));

function createBookList() {
  const listContainer = document.createElement('div');
  listContainer.className = 'list-container';
  const list = document.createElement('ul');
  const addButton = document.createElement('button');
  list.className = 'books-list';
  list.innerHTML = 'My books:';
  listContainer.append(list);
  addButton.className = 'addButton';
  addButton.innerHTML = 'Add';
  listContainer.append(addButton);
  root.append(listContainer);

  for (let book of booksList) {
    const li = document.createElement('li');
    li.innerHTML = `<span>${book.title}</span>
      <button class="editButton">Edit</button>`;
    li.id = book.id;
    list.append(li);
  }

  list.onclick = function (e) {
    let field = e.target;
    if (field.tagName === 'SPAN') {
      field = e.target.parentNode;
    }
    if (field.tagName !== 'LI') {
      return;
    }
    const search = `?id=${field.id}`;
    const url = new URL(search, window.location.href);
    let isReload = location.hash !== '#preview' && location.search === search;

    url.hash = 'preview';
    location.href = url;

    if (isReload) {
      location.reload();
    }
  };
  const editBook = document.querySelectorAll('.editButton');

  editBook.forEach((item) => {
    item.onclick = function (e) {
      let fieldId = e.target.parentNode.id;
      const search = `?id=${fieldId}`;
      const isReload = search === location.search;
      const url = new URL(search, window.location.href);
      url.hash = 'edit';
      location.href = url;
      if (isReload) {
        location.reload();
      }
    };
  });
  addButton.onclick = function () {
    const url = new URL(window.location.href);
    url.hash = 'add';
    location.href = url;
    location.reload();
  };
}

createBookList();

function bookPreview(id) {
  const dataContainer = document.createElement('div');
  dataContainer.className = 'data-container';
  const bookPreview = document.createElement('div');
  const bookInfo = document.createElement('div');
  bookInfo.className = 'book-info';
  bookPreview.className = 'book-preview';
  const bookName = document.createElement('p');
  bookName.className = 'book-name';
  bookName.innerHTML = booksList[id].title;
  const bookAuthor = document.createElement('p');
  bookAuthor.className = 'book-author';
  bookAuthor.innerHTML = booksList[id].author;
  const bookPlot = document.createElement('p');
  bookPlot.innerHTML = booksList[id].about;
  const bookCover = document.createElement('img');
  bookCover.className = 'book-cover';
  bookCover.src = booksList[id].bookCover;
  bookCover.alt = 'pic';
  bookInfo.append(bookName, bookAuthor, bookPlot);
  bookPreview.append(bookCover, bookInfo);
  dataContainer.append(bookPreview);
  root.append(dataContainer);
}

function bookEdit(id) {
  const editForm = document.createElement('form');
  editForm.className = 'edit-form';
  const bookNameInput = document.createElement('input');
  bookNameInput.value = `${booksList[id].title}`;
  bookNameInput.type = 'text';
  bookNameInput.className = 'input';
  bookNameInput.required = true;
  const bookNameInputLabel = document.createElement('label');
  bookNameInputLabel.className = 'label';
  bookNameInputLabel.innerHTML = 'Title: ';
  const bookAuthorInput = bookNameInput.cloneNode(true);
  bookAuthorInput.value = `${booksList[id].author}`;
  const bookAuthorInputLabel = bookNameInputLabel.cloneNode(true);
  bookAuthorInputLabel.innerHTML = 'Author: ';
  const bookCoverInput = bookAuthorInput.cloneNode(true);
  bookCoverInput.value = `${booksList[id].bookCover}`;
  const bookCoverInputLabel = bookAuthorInputLabel.cloneNode(true);
  bookCoverInputLabel.innerHTML = 'Book cover: ';
  const bookPlotInput = document.createElement('textarea');
  bookPlotInput.className = 'textarea';
  bookPlotInput.required = true;
  bookPlotInput.value = `${booksList[id].about}`;
  const bookPlotInputLabel = bookCoverInputLabel.cloneNode(true);
  bookPlotInputLabel.innerHTML = 'About: ';

  editForm.append(
    bookNameInputLabel,
    bookNameInput,
    bookAuthorInputLabel,
    bookAuthorInput,
    bookCoverInputLabel,
    bookCoverInput,
    bookPlotInputLabel,
    bookPlotInput
  );
  const dataContainer = document.createElement('div');
  dataContainer.className = 'data-container';
  const buttonControl = document.createElement('div');
  buttonControl.className = 'button-control';
  const okButton = document.createElement('button');
  okButton.innerHTML = 'OK';
  const cancelButton = document.createElement('button');
  cancelButton.innerHTML = 'Cancel';
  buttonControl.append(okButton, cancelButton);
  dataContainer.append(editForm, buttonControl);
  root.append(dataContainer);
  cancelButton.onclick = function () {
    let isDiscarding = confirm('Discard changes?');
    if (isDiscarding) {
      window.history.back();
    }
  };

  for (let item of editForm.elements) {
    item.onchange = function () {
      if (!item.checkValidity()) {
        okButton.disabled = true;
        item.classList.add('error');
      } else {
        item.classList.remove('error');
      }
      for (let item1 of editForm.elements) {
        if (!item1.checkValidity()) {
          break;
        }
        okButton.disabled = false;
      }
    };
  }

  okButton.onclick = function () {
    let timer = 200;
    booksList[id].title = bookNameInput.value;
    booksList[id].author = bookAuthorInput.value;
    booksList[id].bookCover = bookCoverInput.value;
    booksList[id].about = bookPlotInput.value;
    localStorage.setItem('books', JSON.stringify(booksList));
    const url = new URL(`?id=${id}`, window.location.href);
    url.hash = 'preview';
    root.innerHTML = '';
    location.href = url;
    location.reload();
    bookPreview(id);
    setTimeout(alert('Book successfully updated'), timer);
  };
}

function addBook() {
  const dataContainer = document.createElement('div');
  dataContainer.className = 'data-container';
  const editForm = document.createElement('form');
  editForm.className = 'edit-form';
  const bookNameInput = document.createElement('input');
  bookNameInput.type = 'text';
  bookNameInput.className = 'input';
  bookNameInput.required = true;
  const bookNameInputLabel = document.createElement('label');
  bookNameInputLabel.className = 'label';
  bookNameInputLabel.innerHTML = 'Title: ';
  const bookAuthorInput = bookNameInput.cloneNode(true);
  const bookAuthorInputLabel = bookNameInputLabel.cloneNode(true);
  bookAuthorInputLabel.innerHTML = 'Author: ';
  const bookCoverInput = bookAuthorInput.cloneNode(true);
  const bookCoverInputLabel = bookAuthorInputLabel.cloneNode(true);
  bookCoverInputLabel.innerHTML = 'Book cover: ';
  const bookPlotInput = document.createElement('textarea');
  bookPlotInput.className = 'textarea';
  bookPlotInput.required = true;
  const bookPlotInputLabel = bookCoverInputLabel.cloneNode(true);
  bookPlotInputLabel.innerHTML = 'About: ';

  editForm.append(
    bookNameInputLabel,
    bookNameInput,
    bookAuthorInputLabel,
    bookAuthorInput,
    bookCoverInputLabel,
    bookCoverInput,
    bookPlotInputLabel,
    bookPlotInput
  );
  const buttonControl = document.createElement('div');
  buttonControl.className = 'button-control';
  const okButton = document.createElement('button');
  okButton.innerHTML = 'OK';
  const cancelButton = document.createElement('button');
  cancelButton.innerHTML = 'Cancel';
  buttonControl.append(okButton, cancelButton);
  dataContainer.append(editForm, buttonControl);
  root.append(dataContainer);
  cancelButton.onclick = function () {
    let isDiscarding = confirm('Discard changes?');
    if (isDiscarding) {
      window.history.back();
    }
  };

  okButton.disabled = true;

  for (let item of editForm.elements) {
    item.classList.add('error');
    item.onchange = function () {
      if (item.checkValidity()) {
        item.classList.remove('error');
      } else {
        item.classList.add('error');
        okButton.disabled = true;
      }
      for (let item1 of editForm.elements) {
        if (item1.checkValidity()) {
          okButton.disabled = false;
        } else {
          okButton.disabled = true;
          break;
        }
      }
    };
  }

  okButton.onclick = function () {
    let newBook = {};
    newBook.title = bookNameInput.value;
    newBook.author = bookAuthorInput.value;
    newBook.bookCover = bookCoverInput.value;
    newBook.about = bookPlotInput.value;
    newBook.id = booksList.length;
    booksList.push(newBook);
    localStorage.setItem('books', JSON.stringify(booksList));
    window.location.replace(window.location.pathname);
    createBookList();
  };
}

const dContainer = document.querySelector('.data-container');
if (window.location.hash === '#preview') {
  if (dContainer) {
    dContainer.innerHTML = '';
  }
  let id = window.location.search.split('?id=')[1];
  bookPreview(id);
} else if (window.location.hash === '#edit') {
  if (dContainer) {
    dContainer.innerHTML = '';
  }
  let id = window.location.search.split('?id=')[1];
  bookEdit(id);
} else if (window.location.hash === '#add') {
  if (dContainer) {
    dContainer.innerHTML = '';
  }
  addBook();
}
