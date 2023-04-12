{
  ('use strict');

  const select = {
    booksList: '.books-list',
    filters: '.filters'

  };


  function render() {
    for (let book of dataSource.books) {

      book.ratingBgc = determineRatingBgc(book.rating);
      book.ratingWidth = book.rating * 10;
      console.log(book.ratingBgc, book.ratingWidth, book);
      const generatedHtml = Handlebars.compile(document.querySelector('#template-book').innerHTML)(book);
      const html = utils.createDOMFromHTML(generatedHtml);
      const bookContainer = document.querySelector(select.booksList);
      bookContainer.appendChild(html);
    }
  }

  function hidBooks(tags) {
    // console.log(tags);
    for (let book of dataSource.books) {
      let shouldBeHidden = false;
      for (let tag of tags) {
        if (!book.details[tag]) {
          shouldBeHidden = true;
          break;
        }
      }
      if (shouldBeHidden) {
        document.querySelector('[data-id="' + book.id + '"]').classList.add('hidden');
      } else {
        document.querySelector('[data-id="' + book.id + '"]').classList.remove('hidden');
      }
    }
  }

  function initAction() {
    let favouriteBooks = [];
    let filters = [];
    let booksList = document.querySelector(select.booksList);
    const filter = document.querySelector(select.filters);

    booksList.addEventListener('dblclick', function(event) {
      event.preventDefault();
      const link = event.target.offsetParent;
      if (link.classList.contains('book__image')) {
        const coverId = link.getAttribute('data-id');
        if (!favouriteBooks.includes(coverId)) {
          link.classList.add('favorite');
          favouriteBooks.push(coverId);
        } else {
          link.classList.remove('favorite');
          favouriteBooks.splice(favouriteBooks.indexOf(coverId), 1);
        }
      }
    });
    filter.addEventListener('click', function(event) {
      // console.log(event.target);
      const name = event.target.getAttribute('name');
      const type = event.target.getAttribute('type');
      const tagName = event.target.tagName;
      // console.log(name, type, tagName);
      if (name == 'filter' && type == 'checkbox' && tagName == 'INPUT') {

        if (event.target.checked) {
          filters.push(event.target.value);
        } else {
          filters.splice(filters.indexOf(event.target.value), 1);
        }
      }
      // console.log(filters);
      hidBooks(filters);
    });


  }

  function determineRatingBgc(rating) {
    if (rating < 6) {
      return 'background: linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%);';
    } else if (rating > 6 && rating <= 8) {
      return 'background: linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%);';
    } else if (rating > 8 && rating <= 9) {
      return 'background: linear-gradient(to bottom, #299a0b 0%, #299a0b 100%);';
    } else
      return 'background: linear-gradient(to bottom, #ff0084 0%,#ff0084 100%);';
  }




  render();
  initAction();
}