/* eslint-disable no-param-reassign */
const userPage = true;
const userName = 'ThisUser';

let ID = 1;
class Photo {
  constructor(desctiption, photoLink, date, hashtags, likes, author) {
    this.id = `${ID}`;
    ID += 1;
    this.desctiption = desctiption;
    this.photoLink = photoLink;
    this.createdAt = date;
    this.hashtags = hashtags.split(' ');
    this.likes = likes;
    this.author = author;
  }
}

function generate() {
  const desctiptions = ['Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maxime magnam libero similique.',
    'Molestiae vel rem cumque reiciendis adipisci nesciunt perspiciatis aspernatur aliquam!',
    'Maxime magnam libero similique, molestiae vel rem cumque reiciendis adipisci nesciunt.'];
  const photoLinks = ['./img/users.svg', './img/userM.svg', './img/userF.svg', './img/photo.svg'];
  const photoAuthors = ['Valentin Dytin', 'Vladimir Putin', 'Vladislav Nytin'];
  const hashtags = ['sitejivi', 'helpPleaseWithCSS', 'testHashTag', 'razdvatri', 'goDota', 'IwantToEat'];
  const photoPosts = [];
  for (let i = 0; i < 20; i += 1) {
    let hashtagsC = '';
    for (let j = 0, n = Math.round(Math.random() * 100) % 3; j < n; j += 1) {
      hashtagsC += `${hashtags[Math.round(Math.random() * 100) % hashtags.length]} `;
    }
    const likes = [];
    for (let j = 0, n = Math.round(Math.random() * 100) % 3; j < n; j += 1) {
      likes[j] = photoAuthors[Math.round(Math.random() * 100) % 3];
    }
    photoPosts[i] = {};
    photoPosts[i] = new Photo(
      desctiptions[Math.round(Math.random() * 100) % 3],
      photoLinks[(Math.round(Math.random() * 100)) % 4],
      new Date(`2018-02-${(Math.round(Math.random() * 100) % 18) + 10}T${(Math.round(Math.random() * 100) % 11) + 10}:${(Math.round(Math.random() * 100) % 49) + 10}:${(Math.round(Math.random() * 100) % 49) + 10}`),
      hashtagsC,
      likes,
      photoAuthors[Math.round(Math.random() * 100) % 3]
    );
  }
  return photoPosts;
}

class Storage {
  constructor() {
    this._photoPosts = [];
    this._shown = { count: 0 };
    this.setAll(generate());
  }

  setAll(photos) {
    this._photoPosts.splice(0, this._photoPosts.length);
    photos.forEach((photo) => {
      this.add(photo);
    });
  }

  getPage(skip, top, filterConfig) {
    const skipt = skip || 0;
    let topt = top || 10;

    const result = [];
    let i = 0;
    for (i = skipt; topt !== 0 && i < this.size(); i += 1) {
      if (Storage.compare(filterConfig, this._photoPosts[i])) {
        result.push(this._photoPosts[i]);
        topt -= 1;
      }
    }
    this._shown.count = i;
    return result;
  }

  get(id) {
    for (let i = 0; i < this.size(); i += 1) {
      if (id.toString() === this._photoPosts[i].id) {
        return this._photoPosts[i];
      }
    }
    return null;
  }

  add(photoPost) {
    this._photoPosts[this.size()] = photoPost;
    this._photoPosts.sort((l, r) => r.createdAt.getTime() - l.createdAt.getTime());
    return true;
  }

  remove(id) {
    let i = 0;
    for (; i < this._photoPosts.length; i += 1) {
      if (this._photoPosts[i].id === `${id}`) {
        break;
      }
    }
    if (i < this._photoPosts.length) {
      this._photoPosts.splice(i, 1);
    }
  }

  edit(id, editParams) {
    const photoPost = this.get(id);
    if (!photoPost) {
      return false;
    }
    if (editParams.hashtags !== undefined && typeof (editParams.hashtags) === typeof ([])) {
      for (let i = 0; i < editParams.hashtags.length; i += 1) {
        if (typeof (editParams.hashtags[i]) !== 'string') {
          return false;
        }
      }
    }
    if (editParams.desctiption !== undefined && typeof (editParams.desctiption) !== 'string') {
      return false;
    }

    if (editParams.hashtags !== undefined) {
      photoPost.hashtags = editParams.hashtags;
    }
    if (editParams.desctiption !== undefined) {
      photoPost.desctiption = editParams.desctiption;
    }
    return true;
  }

  size() {
    return this._photoPosts.length;
  }

  static compare(photoPost1, photoPost2) {
    if (photoPost1 === undefined) {
      return true;
    }
    if (photoPost1.hashtags !== undefined) {
      for (let i = 0, flag = true; i < photoPost1.hashtags.length; i += 1) {
        for (let j = 0; j < photoPost2.hashtags.length; j += 1) {
          if (photoPost1.hashtags[i].toLowerCase()
            === photoPost2.hashtags[j].toLowerCase()) {
            flag = false;
          }
        }
        if (flag) {
          return false;
        }
      }
    }
    if (photoPost1.author !== undefined && photoPost1.author !== photoPost2.author) {
      return false;
    }
    if (photoPost1.createdAt !== undefined
      && Math.floor(photoPost1.createdAt.getTime() / 86400000)
      !== Math.floor(photoPost2.createdAt.getTime() / 86400000)) {
      return false;
    }
    return true;
  }

  checkGalleryButton() {
    if (this._shown.count >= this.size()) {
      document.querySelector('.gallery__button').style.display = 'none';
    }
  }

  loadMore(number) {
    number = number || 6;
    this.getPage(this._shown.count, number, {}).forEach((element) => {
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
    this.remove(img.id);
    const node = document.getElementById(img.id);
    document.querySelector('.gallery').removeChild(node);
    this._shown.count -= 1;
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
    const photo = this.get(img.id);
    let temp = document.querySelector('.image-form__info__description__area').value;
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

  createImageForm(img) {
    const photoPost = this.get(img.id);
    const overlay = Storage.createElement('div', ['image-form-overlay', 'flex', 'transitable-opacity'], [['id', 'overlay']]);

    overlay.addEventListener('click', (evt) => {
      if (evt.target.className.includes('deletebutton')) {
        this.deletePhotoPost(img);
        document.body.removeChild(overlay);
        return;
      }
      if (evt.target.className.includes('editbutton')) {
        Storage.editPhotoPost();
        return;
      }
      if (evt.target.className.includes('savebutton')) {
        this.saveChangesPhotoPost(img);
        return;
      }
      if (evt.target.className === 'image-form__image'
      || evt.target.className === 'overlay__likes'
      || evt.target.className.includes('image-form__info')) {
        return;
      }
      document.body.removeChild(overlay);
    }, false);

    const contentWrapper = Storage.createElement('div', ['image-form__content', 'transitable-opacity']);

    const imageContainer = Storage.createElement('div', ['image-form__imageCon']);
    const image = Storage.createElement('img', ['image-form__image'], [['src', img.src]]);
    const overlayLikes = Storage.createElement('div', ['overlay__likes']);
    const likesCount = Storage.createElement('div', ['likes']);
    likesCount.innerHTML = `${photoPost.likes.length} likes`;
    overlayLikes.appendChild(likesCount);
    imageContainer.appendChild(image);
    imageContainer.appendChild(overlayLikes);
    contentWrapper.appendChild(imageContainer);

    const imageInfo = Storage.createElement('div', ['image-form__info']);
    const imageAuthor = Storage.createElement('div', ['image-form__info__author']);
    const imageAuthorName = Storage.createElement('p', ['image-form__info__author__content']);
    imageAuthorName.innerHTML = photoPost.author;
    const imageAuthorDate = Storage.createElement('p', ['image-form__info__author__content']);
    [imageAuthorDate.innerHTML] = (`${photoPost.createdAt}`).split('G');
    imageAuthor.appendChild(imageAuthorName);
    imageAuthor.appendChild(imageAuthorDate);
    imageInfo.appendChild(imageAuthor);

    const imageDescription = Storage.createElement('p', ['image-form__info__description']);
    imageDescription.innerHTML = photoPost.desctiption;
    imageInfo.appendChild(imageDescription);

    const imageTags = Storage.createElement('p', ['image-form__info__tags']);
    for (let i = 0; i < photoPost.hashtags.length; i += 1) {
      if (photoPost.hashtags[i]) {
        imageTags.innerHTML += `#${photoPost.hashtags[i]} `;
      }
    }
    imageInfo.appendChild(imageTags);

    if (userPage) {
      const buttonContainer = Storage.createElement('div', ['flex', 'button-container']);
      buttonContainer.innerHTML = '<button class="image-form__info__description image-form__editbutton">edit</button>';
      buttonContainer.innerHTML += '<button class="image-form__info__description image-form__deletebutton">delete</button>';
      imageInfo.appendChild(buttonContainer);
    }

    contentWrapper.appendChild(imageInfo);
    overlay.appendChild(contentWrapper);

    setTimeout(() => {
      overlay.style.opacity = '1';
      contentWrapper.style.opacity = '1';
    }, 0);

    return overlay;
  }

  createAddForm() {
    const overlay = Storage.createElement('div', ['image-form-overlay', 'flex', 'transitable-opacity'], [['id', 'overlay']]);

    overlay.addEventListener('click', (evt) => {
      if (evt.target.className.includes('editbutton')) {
        if (document.querySelector('.add__form__link').value.length > 0
        && document.querySelector('.add__form__description').value.length > 0) {
          this.add(new Photo(
            document.querySelector('.add__form__description').value || '',
            document.querySelector('.add__form__link').value || '',
            new Date(),
            document.querySelector('.add__form__tags').value || '',
            [],
            userName
          ));
          this.reset();
          this.loadMore();
          document.querySelector('.posts').innerHTML = `${this.size()} posts`;
          document.body.removeChild(overlay);
          return;
        }
        // eslint-disable-next-line no-alert
        alert('incorrect data');
      }
      if (evt.target.className.includes('image-form__info')) {
        return;
      }
      document.body.removeChild(overlay);
    }, false);

    const contentWrapper = Storage.createElement('div', ['image-form__content', 'transitable-opacity']);

    const imageInfo = Storage.createElement('div', ['image-form__info']);
    imageInfo.innerHTML = '<textarea class="image-form__info__description__area add__form__description" maxlength="120" placeholder="description"></textarea>'
    + '<textarea class="image-form__info__tags__area add__form__tags" maxlength="120" placeholder="tags"></textarea>'
    + '<textarea class="image-form__info__tags__area add__form__link" maxlength="120" placeholder="link"></textarea>';

    const buttonContainer = Storage.createElement('div', ['flex', 'button-container']);
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

  reset() {
    const gallery = document.querySelector('.gallery');
    while (gallery.firstChild) {
      gallery.removeChild(gallery.firstChild);
    }
    this._shown.count = 0;
  }
}

const gallery = new Storage();

if (gallery.size() !== 0) {
  gallery.loadMore();
} else {
  gallery.displayZeroPhoto();
}

document.querySelector('.gallery__button').addEventListener('click', () => {
  gallery.loadMore();
}, false);

document.querySelector('.gallery').addEventListener('click', (event) => {
  if (event.target.nodeName !== 'IMG') {
    return;
  }
  const img = event.target;
  const form = gallery.createImageForm(img);
  document.body.appendChild(form);
}, false);

if (userPage) {
  const button = document.querySelector('.user__zone__followbutton');
  button.innerHTML = 'Add photo';
  button.addEventListener('click', () => {
    document.body.appendChild(gallery.createAddForm());
  }, false);
}
