class Controller {
  constructor() {
    this._gallery = new View();
    if (this._gallery.size() !== 0) {
      this._gallery.loadMore();
    } else {
      this._gallery.displayZeroPhoto();
    }
    View.checkStatus();
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
}

const gallery = new Controller();
gallery.clickOnLoadMore();
gallery.clickOnPhoto();
gallery.clickOnFollowOrAddPhoto();
gallery.clickOnLogin();