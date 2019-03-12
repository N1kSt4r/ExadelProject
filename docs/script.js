function generate() {
  const descriprions = ['Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maxime magnam libero similique.', 'Molestiae vel rem cumque reiciendis adipisci nesciunt perspiciatis aspernatur aliquam nemo incidunt laborum dolorum quae!', 'Maxime magnam libero similique, molestiae vel rem cumque reiciendis adipisci nesciunt perspiciatis.'];
  const photoLinks = ['./img/users.svg', './img/userM.svg', './img/userF.svg', './img/photo.svg'];
  const photoAuthors = ['Valentin Dytin', 'Vladimir Putin', 'Vladislav Nytin'];
  const hashtags = ['#sitejivi', '#helpPleaseWithCSS', '#testHashTag', '#razdvatri', '#goDota', '#IwantToEat'];
  const photoPosts = [];
  for (let i = 0; i < 20; i += 1) {
    photoPosts[i] = {};
    photoPosts[i].id = `${i + 1}`;
    photoPosts[i].descriprion = descriprions[Math.round(Math.random() * 100) % 3];
    photoPosts[i].photoLink = photoLinks[(Math.round(Math.random() * 100)) % 4];
    photoPosts[i].createdAt = new Date(`2018-02-${(Math.round(Math.random() * 100) % 18) + 10}T${(Math.round(Math.random() * 100) % 11) + 10}:${(Math.round(Math.random() * 100) % 49) + 10}:${(Math.round(Math.random() * 100) % 49) + 10}`);
    photoPosts[i].hashtags = [];
    for (let j = 0, n = Math.round(Math.random() * 100) % 3; j < n; j += 1) {
      photoPosts[i].hashtags[j] = hashtags[Math.round(Math.random() * 100) % hashtags.length];
    }
    photoPosts[i].likes = [];
    for (let j = 0, n = Math.round(Math.random() * 100) % 3; j < n; j += 1) {
      photoPosts[i].likes[j] = photoAuthors[Math.round(Math.random() * 100) % 3];
    }
    photoPosts[i].author = photoAuthors[Math.round(Math.random() * 100) % 3];
  }
  return photoPosts;
}

class Storage {
  constructor() {
    this._photoPosts = [];
    this._shown = { count: 0 };
    this.setAll(generate());
  }

  static validate(photoPost) {
    if (typeof (photoPost.id) !== typeof ('') || photoPost.id == null) {
      return false;
    }
    if (typeof (photoPost.descriprion) !== typeof ('') || photoPost.descriprion == null) {
      return false;
    }
    if (typeof (photoPost.photoLink) !== typeof ('') || photoPost.photoLink == null) {
      return false;
    }
    if (typeof (photoPost.author) !== typeof ('') || photoPost.author == null) {
      return false;
    }
    if ((typeof (photoPost.createdAt) !== typeof (new Date())
     && photoPost.createdAt !== 'invalid date')
     || photoPost.id == null) {
      return false;
    }
    if (typeof (photoPost.hashtags) !== typeof ([]) || photoPost.hashtags == null) {
      return false;
    }
    for (let i = 0; i < photoPost.hashtags.length; i += 1) {
      if (typeof (photoPost.hashtags[i]) !== typeof ('') || photoPost.hashtags[i] == null) {
        return false;
      }
    }
    if (typeof (photoPost.likes) !== typeof ([]) || photoPost.likes == null) {
      return false;
    }
    for (let i = 0; i < photoPost.likes.length; i += 1) {
      if (typeof (photoPost.likes[i]) !== typeof ('') || photoPost.likes[i] == null) {
        return false;
      }
    }
    return true;
  }

  setAll(photos) {
    this._photoPosts.splice(0, this._photoPosts.length);
    photos.forEach((photo) => {
      this.add(photo);
    });
    this._photoPosts.sort((l, r) => r.createdAt.getTime() - l.createdAt.getTime());
  }

  getPage(skip, top, filterConfig) {
    const skipt = skip || 0;
    let topt = top || 10;

    const result = [];
    let i = 0;
    for (i = skipt; topt !== 0 && i < this.size(); i += 1) {
      if (this.compare(filterConfig, this._photoPosts[i])) {
        result[result.length] = this._photoPosts[i];
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
    if (Storage.validate(photoPost)) {
      this._photoPosts[this.size()] = photoPost;
    }
  }

  remove(id) {
    let i = 0;
    for (; i < this._photoPosts.length; i += 1) {
      if (this._photoPosts[i].id === id.toString()) {
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
      let flag = true;
      for (let i = 0; i < editParams.hashtags.length; i += 1) {
        if (typeof ('') !== typeof (editParams.hashtags[i])) {
          flag = false;
        }
      }
      if (flag) {
        photoPost.hashtags = editParams.hashtags;
      }
    }
    if (editParams.descriprion !== undefined && typeof (editParams.descriprion) === typeof ('')) {
      photoPost.descriprion = editParams.descriprion;
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
    if (photoPost1.createdAt !== undefined && photoPost1.createdAt !== photoPost2.createdAt) {
      return false;
    }
    return true;
  }

  checkGalleryButton() {
    if (this._shown.count >= this.size()) {
      document.querySelector('.gallery__button').style.display = 'none';
    }
  }

  loadMore() {
    this.getPage(this._shown.count, 6, {}/* {hashtags: ['#iwanttoeat']} */).forEach((element) => {
      const temp = document.createElement('IMG');
      temp.className = 'gallery__photo';
      temp.src = element.photoLink;
      temp.id = element.id;
      document.getElementsByClassName('gallery')[0].appendChild(temp);
    });
    this.checkGalleryButton();
  }

  static createElement(nodeName, classes, attrs = []) {
    const element = document.createElement(nodeName);
    classes.forEach(className => element.classList.add(className));
    attrs.forEach(attr => element.setAttribute(attr[0], attr[1]));
    return element;
  }

  createImageForm(img) {
    const photoPost = this.get(img.id);
    const overlay = this.createElement('div', ['image-form-overlay', 'flex', 'transitable-opacity'], [['id', 'overlay']]);

    overlay.addEventListener('click', (evt) => {
      if (evt.target.className === 'image-form__image' || evt.target.className === 'overlay__likes') {
        return;
      }
      document.body.removeChild(overlay);
    }, false);

    const contentWrapper = this.createElement('div', ['image-form__content', 'transitable-opacity']);

    const imageContainer = this.createElement('div', ['image-form__imageCon']);
    const image = this.createElement('img', ['image-form__image'], [['src', img.src]]);
    const overlayLikes = this.createElement('div', ['overlay__likes']);
    const likesCount = this.createElement('div', ['likes']);
    likesCount.innerHTML = `${photoPost.likes.length} likes`;
    overlayLikes.appendChild(likesCount);
    imageContainer.appendChild(image);
    imageContainer.appendChild(overlayLikes);
    contentWrapper.appendChild(imageContainer);

    const imageInfo = this.createElement('div', ['image-form__info']);
    const imageAuthor = this.createElement('div', ['image-form__info__author']);
    const imageAuthorName = this.createElement('p', ['image-form__info__author__content']);
    imageAuthorName.innerHTML = photoPost.author;
    const imageAuthorDate = this.createElement('p', ['image-form__info__author__content']);
    [imageAuthorDate.innerHTML] = (`${photoPost.createdAt}`).split('G');
    imageAuthor.appendChild(imageAuthorName);
    imageAuthor.appendChild(imageAuthorDate);
    imageInfo.appendChild(imageAuthor);

    const imageDescription = this.createElement('p', ['image-form__info__description']);
    imageDescription.innerHTML = photoPost.descriprion;
    imageInfo.appendChild(imageDescription);

    if (photoPost.hashtags.length !== 0) {
      const imageTags = this.createElement('p', ['image-form__info__description']);
      for (let i = 0; i < photoPost.hashtags.length; i += 1) {
        imageTags.innerHTML += `${photoPost.hashtags[i]} `;
      }
      imageInfo.appendChild(imageTags);
    }

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
    this._photoPosts = [];
    this._shown.count = 0;
  }
}

const gallery = new Storage();

gallery.remove(2);
gallery.edit(3, { descriprion: 'Look it\'s really works!', hashtags: ['#IdidIT', '#WebIsPain'] });
if (gallery.size() !== 0) {
  gallery.loadMore();
} else {
  gallery.displayZeroPhoto();
}

document.querySelector('.posts').innerHTML = `${gallery.size()} posts`;

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
