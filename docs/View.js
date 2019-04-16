class View {
  constructor() {
    this._data = JSON.parse(localStorage.getItem('sitenameData'));
    this._gallery = new Model(this._data || []);
  }

  size() {
    return this._gallery.size();
  }

  checkGalleryButton() {
    if (this._gallery.shown() >= this.size()) {
      document.querySelector('.gallery__button').style.display = 'none';
    }
  }

  loadMore(number) {
    number = number || 6;
    this._gallery.getPage(this._gallery.shown(), number, {}).forEach((element) => {
      const temp = document.createElement('IMG');
      temp.className = 'gallery__photo';
      temp.src = element.photoLink;
      temp.id = element.id;
      document.getElementsByClassName('gallery')[0].appendChild(temp);
    });
    document.querySelector('.posts').innerHTML = `${this.size()} posts`;
    this.checkGalleryButton();
  }

  static createElement(nodeName, classes, attrs = []) {
    const element = document.createElement(nodeName);
    classes.forEach(className => element.classList.add(className));
    attrs.forEach(attr => element.setAttribute(attr[0], attr[1]));
    return element;
  }

  deletePhotoPost(img) {
    this._gallery.remove(img.id);
    const node = document.getElementById(img.id);
    document.querySelector('.gallery').removeChild(node);
    this._gallery._shown.count -= 1;
    this.loadMore(1);
  }

  static editPhotoPost() {
    let temp = document.querySelector('.image-form__info__description').innerHTML;
    document.querySelector('.image-form__info__description').outerHTML = '<textarea class="image-form__info__description__area" maxlength="120"></textarea>';
    document.querySelector('.image-form__info__description__area').value = temp;
    temp = document.querySelector('.image-form__info__tags').innerHTML;
    document.querySelector('.image-form__info__tags').outerHTML = '<textarea class="image-form__info__tags__area" maxlength="120"></textarea>';
    document.querySelector('.image-form__info__tags__area').value = temp.replace(/[#]/g, '');
    document.querySelector('.button-container').innerHTML = '<button class="image-form__info__description image-form__savebutton">save</button>';
  }

  saveChangesPhotoPost(img) {
    const photo = this._gallery.get(img.id);
    let temp = document.querySelector('.image-form__info__description__area').value;
    photo.description = temp;
    document.querySelector('.image-form__info__description__area').outerHTML = `<p class="image-form__info__description">${temp}</p>`;
    const tagsValue = document.querySelector('.image-form__info__tags__area').value;
    temp = (tagsValue || '').trim().split(/\s+/);
    let tags = '';
    if (tagsValue.length !== 0) {
      photo.hashtags = temp;
      for (let i = 0; i < temp.length; i += 1) {
        tags += `#${photo.hashtags[i]} `;
      }
    }
    document.querySelector('.image-form__info__tags__area').outerHTML = `<p class="image-form__info__tags">${tags}</p>`;
    const buttonContainer = document.querySelector('.button-container');
    buttonContainer.innerHTML = '<button class="image-form__info__description image-form__editbutton">edit</button>';
    buttonContainer.innerHTML += '<button class="image-form__info__description image-form__deletebutton">delete</button>';
  }

  showPhoto(img) {
    const photoPost = this._gallery.get(img.id);
    const popupWindow = document.querySelector('.viewImage').content.cloneNode(true);

    document.body.appendChild(popupWindow);
    document.body.querySelector('.likes').innerHTML = `${photoPost.likes.length} likes`;
    document.body.querySelector('.image-form__info__author__content__name').innerHTML = photoPost.author;
    [document.body.querySelector('.image-form__info__author__content__date').innerHTML] = (`${photoPost.createdAt}`).split('G');
    document.body.querySelector('.image-form__image').src = photoPost.photoLink;
    document.body.querySelector('.image-form__info__description').innerHTML = photoPost.description;

    const imageTags = document.body.querySelector('.image-form__info__tags');
    for (let i = 0; i < photoPost.hashtags.length; i += 1) {
      if (photoPost.hashtags[i]) {
        imageTags.innerHTML += `#${photoPost.hashtags[i]} `;
      }
    }

    if (!Controller.isLogged()) {
      document.querySelector('.button-container').style.display = 'none';
    }

    setTimeout(() => {
      const opacityElems = document.getElementsByClassName('transitable-opacity');
      for (let i = 0; i < opacityElems.length; i += 1) {
        opacityElems[i].style.opacity = '1';
      }
    }, 0);

    document.getElementById('overlay').addEventListener('click', (evt) => {
      if (evt.target.className.includes('deletebutton')) {
        this.deletePhotoPost(img);
        document.body.removeChild(document.getElementById('overlay'));
        return;
      }
      if (evt.target.className.includes('editbutton')) {
        View.editPhotoPost();
        return;
      }
      if (evt.target.className.includes('savebutton')) {
        this.saveChangesPhotoPost(img);
        localStorage.setItem('sitenameData', JSON.stringify(this._gallery._photoPosts));
        return;
      }
      if (evt.target.className === 'overlay__likes') {
        if (Controller.isLogged()) {
          this.likePhoto(img);
        }
        return;
      }
      if (evt.target.className === 'image-form__image'
        || evt.target.className.includes('image-form__info')) {
        return;
      }
      document.body.removeChild(document.getElementById('overlay'));
    }, false);
  }

  createAddForm() {
    const overlay = View.createElement('div', ['image-form-overlay', 'flex', 'transitable-opacity'], [['id', 'overlay']]);
    overlay.addEventListener('click', (evt) => {
      if (evt.target.className.includes('editbutton')) {
        if (document.querySelector('.add__form__link').value.length > 0
          && document.querySelector('.add__form__description').value.length > 0) {
          this._gallery.add(new Photo(document.querySelector('.add__form__description').value || '', document.querySelector('.add__form__link').value || '', new Date(), document.querySelector('.add__form__tags').value || '', [], localStorage.getItem('sitenameUser')));
          this.reset();
          this.loadMore();
          document.querySelector('.posts').innerHTML = `${this.size()} posts`;
          document.body.removeChild(overlay);
          return;
        }
        alert('incorrect data');
      }
      if (evt.target.className.includes('image-form__info')) {
        return;
      }
      document.body.removeChild(overlay);
    }, false);
    const contentWrapper = View.createElement('div', ['image-form__content', 'transitable-opacity']);
    const imageInfo = View.createElement('div', ['image-form__info']);
    imageInfo.innerHTML = '<textarea class="image-form__info__description__area add__form__description" maxlength="120" placeholder="description"></textarea>'
      + '<textarea class="image-form__info__tags__area add__form__tags" maxlength="120" placeholder="tags"></textarea>'
      + '<textarea class="image-form__info__tags__area add__form__link" maxlength="120" placeholder="link"></textarea>';
    const buttonContainer = View.createElement('div', ['flex', 'button-container']);
    buttonContainer.innerHTML = '<button class="image-form__info__description image-form__editbutton">Add</button>';
    imageInfo.appendChild(buttonContainer);
    contentWrapper.appendChild(imageInfo);
    overlay.appendChild(contentWrapper);
    setTimeout(() => {
      overlay.style.opacity = '1';
      contentWrapper.style.opacity = '1';
    }, 0);
    return overlay;
  }

  displayZeroPhoto() {
    const temp = document.createElement('p');
    temp.className = 'noPhotoMessage';
    temp.innerHTML = 'No photo found';
    document.getElementsByClassName('gallery')[0].appendChild(temp);
    this.checkGalleryButton();
  }

  static createLoginForm() {
    const loginForm = document.querySelector('.loginForm').content.cloneNode(true);
    document.body.appendChild(loginForm);

    setTimeout(() => {
      const opacityElems = document.getElementsByClassName('transitable-opacity');
      for (let i = 0; i < opacityElems.length; i += 1) {
        opacityElems[i].style.opacity = '1';
      }
    }, 0);

    document.getElementById('overlay').addEventListener('click', (evt) => {
      if (evt.target.className.includes('OK')) {
        const login = document.querySelector('.login-form__login');
        const pass = document.querySelector('.login-form__pass');
        if (login.value === 'check' && pass.value === '123') {
          localStorage.setItem('sitenameUser', login.value);
          View.checkStatus();
          document.body.removeChild(document.getElementById('overlay'));
          return;
        }
        alert('Неправильный логин или пароль');
      }
      if (evt.target.className.includes('login-form')) {
        return;
      }
      document.body.removeChild(document.getElementById('overlay'));
    }, false);
  }

  reset() {
    const gallery = document.querySelector('.gallery');
    while (gallery.firstChild) {
      gallery.removeChild(gallery.firstChild);
    }
    this._data = JSON.parse(localStorage.getItem('sitenameData'));
    this._gallery = new Model(this._data);
    this._gallery._shown.count = 0;
  }

  static checkStatus() {
    //  ./img/ico.svg
    document.querySelector('.user__zone__followbutton')
      .innerHTML = Controller.isLogged() ? 'Add photo' : 'Follow';
    document.querySelector('.header__userinfo__name')
      .innerHTML = Controller.isLogged() ? localStorage.getItem('sitenameUser') : 'Login';
  }

  likePhoto(img) {
    document.body.querySelector('.likes').innerHTML = `${this._gallery.likePhotoPost(img.id)} likes`;
    localStorage.setItem('sitenameData', JSON.stringify(this._gallery._photoPosts));
  }
}
