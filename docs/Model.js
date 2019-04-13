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

class Model {
  constructor() {
    this._photoPosts = [];
    this._shown = { count: 0 };
    this.setAll(generate());
  }
  shown() {
    return this._shown.count;
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
      if (Model.compare(filterConfig, this._photoPosts[i])) {
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
}
