const books = [
  {
    id: 0,
    title: 'The Da Vinci Code',
    author: 'Dan Brown',
    about:
      'The Da Vinci Code follows "symbologist" Robert Langdon and cryptologist Sophie Neveu after a' +
      'murder in the Louvre Museum in Paris causes them to become involved in a battle between' +
      'the Priory of Sion and Opus Dei over the possibility of Jesus Christ ' +
      'and Mary Magdalene having had a child together.',
    bookCover:
      'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1361293878l/4248.jpg'
  },
  {
    id: 1,
    title: 'The Power of Habit',
    author: 'Charles Duhigg',
    about:
      'Why do we do develop habits? And how can we change them?We can always change. In The Power of Habit, ' +
      'award-winning New York Times business reporter Charles Duhigg translates cutting-edge behavioural' +
      ' science into practical self-improvement action, distilling advanced neuroscience into' +
      ' fascinating narratives of transformation.',
    bookCover:
      'https://tsp-books.com/upload/cache/__WIN2012_Images_H_9781847946249_440x675.jpg'
  },
  {
    id: 2,
    title: 'Sapiens: A Brief History of Humankind',
    author: 'Yuval Noah Harari',
    about:
      'In Sapiens, Dr Yuval Noah Harari spans the whole of human history, from the very first humans to' +
      ' walk the earth to the radical – and sometimes devastating – breakthroughs of the Cognitive,' +
      ' Agricultural and Scientific Revolutions. Drawing on insights from biology, anthropology,' +
      ' paleontology and economics, he explores how the currents of history have shaped our human' +
      ' societies, the animals and plants around us, and even our personalities.',
    bookCover:
      'https://images-na.ssl-images-amazon.com/images/I/713jIoMO3UL.jpg'
  }
];

if (!localStorage.getItem('books', JSON.stringify(books))) {
  localStorage.setItem('books', JSON.stringify(books));
}
