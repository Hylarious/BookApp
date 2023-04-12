{
  ('use strict');

  class BookList {
    constructor() {
      const thisBooklist = this;
      thisBooklist.selectors = {
        booksList: '.books-list',
        filters: '.filters'
      };

      thisBooklist.favouriteBooks = [];
      thisBooklist.filters = [];
      thisBooklist.booksList = document.querySelector(thisBooklist.selectors.booksList);
      thisBooklist.filter = document.querySelector(thisBooklist.selectors.filters);
      thisBooklist.initEvents();
    }

    render() {
      for (let book of dataSource.books) {
        book.ratingBgc = this.determineRatingBgc(book.rating);
        book.ratingWidth = book.rating * 10;
        const generatedHtml = Handlebars.compile(document.querySelector('#template-book').innerHTML)(book);
        const html = utils.createDOMFromHTML(generatedHtml);
        this.booksList.appendChild(html);
      }
    }

    initEvents() {
      const thisBook = this;
      thisBook.booksList.addEventListener('dblclick', function(event) {
        event.preventDefault();
        const link = event.target.offsetParent;
        if (link.classList.contains('book__image')) {
          const coverId = link.getAttribute('data-id');
          if (!thisBook.favouriteBooks.includes(coverId)) {
            link.classList.add('favorite');
            thisBook.favouriteBooks.push(coverId);
          } else {
            link.classList.remove('favorite');
            thisBook.favouriteBooks.splice(thisBook.favouriteBooks.indexOf(coverId), 1);
          }
        }
      });

      thisBook.filter.addEventListener('click', function(event) {
        const name = event.target.getAttribute('name');
        const type = event.target.getAttribute('type');
        const tagName = event.target.tagName;

        if (name == 'filter' && type == 'checkbox' && tagName == 'INPUT') {
          if (event.target.checked) {
            thisBook.filters.push(event.target.value);
          } else {
            thisBook.filters.splice(thisBook.filters.indexOf(event.target.value), 1);
          }
        }
        thisBook.hideBooks(thisBook.filters);
      });
    }

    hideBooks(tags) {
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

    determineRatingBgc(rating) {
      if (rating < 6) {
        return 'background: linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%);';
      } else if (rating > 6 && rating <= 8) {
        return 'background: linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%);';
      } else if (rating > 8 && rating <= 9) {
        return 'background: linear-gradient(to bottom, #299a0b 0%, #299a0b 100%);';
      } else {
        return 'background: linear-gradient(to bottom, #ff0084 0%,#ff0084 100%);';
      }
    }
  }

  const bookList = new BookList();
  bookList.render();
}