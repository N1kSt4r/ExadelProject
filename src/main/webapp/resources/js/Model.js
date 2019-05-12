let ID = 1;
class Photo {
  constructor(description, photoLink, date, hashtags, likes, author) {
    this.id = `${ID}`;
    ID += 1;
    this.description = description;
    this.photoLink = photoLink;
    this.createdAt = date;
    this.hashtags = hashtags.split(' ');
    this.likes = likes;
    this.author = author;
  }
}

function generate() {
  const descriptions = ['Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maxime magnam libero similique.',
    'Molestiae vel rem cumque reiciendis adipisci nesciunt perspiciatis aspernatur aliquam!',
    'Maxime magnam libero similique, molestiae vel rem cumque reiciendis adipisci nesciunt.'];
  const photoLinks = ['resources/img/users.svg', 'resources/img/userM.svg', 'resources/img/userF.svg', 'resources/img/photo.svg'];
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
      descriptions[Math.round(Math.random() * 100) % 3],
      photoLinks[(Math.round(Math.random() * 100)) % 4],
      new Date(`2018-02-${(Math.round(Math.random() * 100) % 18) + 10}T${(Math.round(Math.random() * 100) % 11) + 10}:${(Math.round(Math.random() * 100) % 49) + 10}:${(Math.round(Math.random() * 100) % 49) + 10}`),
      hashtagsC,
      likes,
      photoAuthors[Math.round(Math.random() * 100) % 3]
    );
  }
  localStorage.setItem('sitenameData', JSON.stringify(photoPosts));
}

class Model {
  constructor(data, searchRequest) {
    this._searchRequest = searchRequest || '';
    this._photoPosts = [];
    this._shown = { count: 0 };
    this.setAll(data);
    this._photoPosts.sort((l, r) => {
      const lValue = this.estimate(l);
      const rValue = this.estimate(r);
      if (lValue !== rValue) {
        return rValue - lValue;
      }
      return r.createdAt.getTime() - l.createdAt.getTime();
    });
  }

  shown() {
    return this._shown.count;
  }

  setAll(photos) {
    this._photoPosts = [];
    photos.forEach((photo) => {
      photo.createdAt = new Date(Date.parse(photo.createdAt));
      this.add(photo);
    });
  }

  getPage(skip, top) {
    const skipt = skip || 0;
    let topt = top || 10;
    const result = [];
    let i = 0;
    for (i = skipt; topt !== 0 && i < this.size(); i += 1) {
      if (this.estimate(this._photoPosts[i]) > 0) {
        result.push(this._photoPosts[i]);
        topt -= 1;
      }
    }
    this._shown.count = i;
    if (i + 1 < this.size() && this.estimate(this._photoPosts[i]) === 0) {
      this._shown.count = this.size();
    }
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
    this._photoPosts.push(photoPost);
    // this._photoPosts.sort((l, r) => r.createdAt.getTime() - l.createdAt.getTime());
    localStorage.setItem('sitenameData', JSON.stringify(this._photoPosts));
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
    localStorage.setItem('sitenameData', JSON.stringify(this._photoPosts));
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
    if (editParams.description !== undefined && typeof (editParams.description) !== 'string') {
      return false;
    }
    if (editParams.hashtags !== undefined) {
      photoPost.hashtags = editParams.hashtags;
    }
    if (editParams.description !== undefined) {
      photoPost.description = editParams.description;
    }
    localStorage.setItem('sitenameData', JSON.stringify(this._photoPosts));
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

  estimate(photoPost) {
    this._searchRequest = this._searchRequest.trim();
    if (this._searchRequest === '') {
      return 1;
    }

    const searchRequest = this._searchRequest.split(/[ ]+/);
    let value = 0;
    searchRequest.forEach((word) => {
      if (word[0] === '#') {
        word = word.substring(1).toLowerCase();
        for (let i = 0; i < photoPost.hashtags.length; i += 1) {
          if (photoPost.hashtags[i].toLowerCase() === word) {
            value += 1;
          }
        }
      } else {
        value += photoPost.author.includes(word) ? 1 : 0;
      }
    }, false);

    return value;
  }

  likePhotoPost(id) {
    const photo = this.get(id);
    if (photo) {
      const likeIndex = photo.likes.findIndex(like => like === localStorage.getItem('sitenameUser'));
      if (likeIndex !== -1) {
        photo.likes.splice(likeIndex, 1);
      } else {
        photo.likes.push(localStorage.getItem('sitenameUser'));
      }
    }
    return photo.likes.length;
  }
}
