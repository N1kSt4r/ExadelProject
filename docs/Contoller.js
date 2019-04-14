const userPage = true;
const userName = 'ThisUser';

class Controller {
  constructor() {
    this._gallery = new View();
    if (this._gallery.size() !== 0) {
      this._gallery.loadMore();
    } else {
      this._gallery.displayZeroPhoto();
    }
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
    if (userPage) {
      const button = document.querySelector('.user__zone__followbutton');
      button.innerHTML = 'Add photo';
      button.addEventListener('click', () => {
        document.body.appendChild(this._gallery.createAddForm());
      }, false);
    }
  }
}

const gallery = new Controller();
gallery.clickOnLoadMore();
gallery.clickOnPhoto();
gallery.clickOnFollowOrAddPhoto();