class Controller {
  constructor() {
    this._gallery = new View();
  }

  static isLogged() {
    return localStorage.getItem('sitenameUser') !== null;
  }

  clickOnLoadMore() {
    document.querySelector('.gallery__button').addEventListener('click', () => {
      this._gallery.loadMore();
    }, false);
  }

  clickOnPhoto() {
    document.querySelector('.gallery').addEventListener('click', (event) => {
      if (event.target.nodeName !== 'IMG') {
        return;
      }
      this._gallery.showPhoto(event.target);
    }, false);
  }

  clickOnFollowOrAddPhoto() {
    const button = document.querySelector('.user__zone__followbutton');
    // button.innerHTML = 'Add photo';

    button.addEventListener('click', () => {
      if (localStorage.getItem('sitenameUser') != null) {
        document.body.appendChild(this._gallery.createAddForm());
      }
    }, false);
  }

  clickOnLogin() {
    document.querySelector('.header__userinfo__name').addEventListener('click', () => {
      if (Controller.isLogged()) {
        localStorage.removeItem('sitenameUser');
        View.checkStatus();
      } else {
        View.createLoginForm();
      }
    }, false);
  }

  submitSearch() {
    document.querySelector('.header__search__form').addEventListener('submit', (event) => {
      //  '1997-12-20'
      alert(document.querySelector('.header__search').value.trim().split(/[ ]+/));
      event.preventDefault();
      this._gallery.forSearch(document.querySelector('.header__search').value.trim());
    }, false);
  }
}

const gallery = new Controller();
gallery.clickOnLoadMore();
gallery.clickOnPhoto();
gallery.clickOnFollowOrAddPhoto();
gallery.clickOnLogin();
gallery.submitSearch();
