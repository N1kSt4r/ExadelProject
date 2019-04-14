let userPage = false;
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
    const button = document.querySelector('.user__zone__followbutton');
    //button.innerHTML = 'Add photo';
    button.addEventListener('click', () => {
      if (userPage) {
        document.body.appendChild(this._gallery.createAddForm());
      }
    }, false);
  }
  clickOnLogin() {
    document.querySelector('.header__userinfo__name').addEventListener('click', () => {
      if (localStorage.getItem('sitenameUser') !== null) {
        localStorage.removeItem('sitenameUser');
        userPage = false;
        return;
      }
      const loginForm = document.querySelector('.loginForm').content.cloneNode(true);
      document.body.appendChild(loginForm);
      
      setTimeout(() => {
        let opacityElems = document.getElementsByClassName('transitable-opacity');
        for (let i = 0; i < opacityElems.length; i += 1) {
          opacityElems[i].style.opacity = '1';
        }
      }, 0);

      document.getElementById('overlay').addEventListener('click', (evt) => {
        if (evt.target.className.includes('OK')) {
          let login = document.querySelector('.login-form__login');
          let pass = document.querySelector('.login-form__pass');
          if (login.value == 'check' && pass.value == '123') {
            userPage = true;
            localStorage.setItem('sitenameUser', login.value);
            document.querySelector('.user__zone__followbutton').innerHTML = 'Add photo';
            document.body.removeChild(document.getElementById('overlay'));
            return;
          } else {
            alert("Неправильный логин или пароль");
          }
        }
        if (evt.target.className.includes('login-form')) {
          return;
        }
        document.body.removeChild(document.getElementById('overlay'));
      }, false);
    }, false);

  }
}

const gallery = new Controller();
gallery.clickOnLoadMore();
gallery.clickOnPhoto();
gallery.clickOnFollowOrAddPhoto();
gallery.clickOnLogin();