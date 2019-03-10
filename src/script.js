/*document.getElementsByClassName('gallery__photo')[0].style.backgroundColor = 'red';
var temp = document.createElement('img');
temp.className = 'gallery__photo';
temp.src = './img/userM.svg';
document.getElementsByClassName('gallery')[0].appendChild(temp);
alert('check');*/
var storage = (() => {
  function validatePhotoPost(photoPost) {
    if (typeof(photoPost.id) != typeof('') || photoPost.id == null) 
      return false;
    if (typeof(photoPost.descriprion) != typeof('') || photoPost.descriprion == null) 
      return false;
    if (typeof(photoPost.photoLink) != typeof('') || photoPost.photoLink == null) 
      return false;
    if (typeof(photoPost.author) != typeof('') || photoPost.author == null) 
      return false;
    if (typeof(photoPost.createdAt) != typeof(new Date()) || photoPost.id == null) 
      return false;
    return true;
  }

  function compare(photoPost1, photoPost2) {
    if (photoPost1 == undefined) {
      return true;
    }
    if (photoPost1.hashtags !== undefined) {
      for (i = 0, flag = true; i < photoPost1.hashtags.length; ++i) {
        for (j = 0; j < photoPost2.hashtags.length; ++j) {
          if (photoPost1.hashtags[i].toLowerCase
            == photoPost2.hashtags[j].toLowerCase) {
            flag = false;
          }
          if (flag) {
            return false;
          }
        }
      }
    }
    if (photoPost1.author !== undefined && photoPost1.author != photoPost2.author) 
      return false;
    if (photoPost1.createdAt !== undefined && photoPost1.createdAt != photoPost2.createdAt) 
      return false;
    return true;
  }
  
  function getPhotoPosts(gallery, skip, top, filterConfig) {
    if (skip === undefined) {
      skip = 0;
    }
    if (top === undefined) {
      top = 10;
    }
    result = [];
    for (i = skip; top != 0 && i < gallery.length; ++i) {
      if (compare(filterConfig, gallery[i])) {
        addPhotoPost(result, gallery[i]);
        --top;
      }
    }
    return result;
  }
  function getPhotoPost(gallery, id) {
    for (i = 0; i < gallery.length; ++i) {
      if (id == gallery[i].id) {
        return gallery[i];
      }
    }
    return null;
  }

  function addPhotoPost(gallery, photoPost) {
    if (validatePhotoPost(photoPost)) {
      gallery[gallery.length] = photoPost;
    }
  }

  function removePhotoPost(gallery, id) {
    var i = 0;
    for (; i < gallery.length; ++i) {
      if (gallery[i].id == id) {
        break;
      }
    }
    if (i < gallery.length) {
      gallery.splice(i, 1);
    }
  }


  var descriprions = ['Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maxime magnam libero similique.', 'Molestiae vel rem cumque reiciendis adipisci nesciunt perspiciatis aspernatur aliquam nemo incidunt laborum dolorum quae!', 'Maxime magnam libero similique, molestiae vel rem cumque reiciendis adipisci nesciunt perspiciatis.'];
  var photoLinks = ['./img/users.svg', './img/userM.svg', './img/userF.svg', './img/photo.svg'];
  var photoAuthors = ['Valentin Dytin', 'Vladimir Putin', 'Vladislav Nytin'];
  var hashtags = ['#sitejivi', '#helpPleaseWithCSS', '#testHashTag', '#razdvatri', '#goDota', '#IwantToEat'];

  var photoPosts = [];

  for (i = 0; i < 20; ++i) {
    photoPosts[i] = {};
    photoPosts[i].id = i + 1 + '';
    photoPosts[i].descriprion = descriprions[Math.round(Math.random() * 100) % 3];
    photoPosts[i].photoLink = photoLinks[(Math.round(Math.random() * 100)) % 4];
    photoPosts[i].createdAt = new Date('2018-02-23T23:00:00');
    photoPosts[i].hashtags = [];
    for (j = 0, n = Math.round(Math.random() * 100) % 3; j < n; ++j) {
      photoPosts[i].hashtags[j] = hashtags[Math.round(Math.random() * 100) % 3];
    }
    photoPosts[i].likes = [];
    for (j = 0, n = Math.round(Math.random() * 100) % 3; j < n; ++j) {
      photoPosts[i].likes[j] = photoAuthors[Math.round(Math.random() * 100) % 3];
    }
    photoPosts[i].author = photoAuthors[Math.round(Math.random() * 100) % 3];
  };

  getPhotoPosts(photoPosts, 0, 6).forEach((element) => {
    var temp = document.createElement('img');
    temp.className = 'gallery__photo';
    temp.src = element.photoLink;
    temp.id = element.id;
    document.getElementsByClassName('gallery')[0].appendChild(temp);
  });

  var shown = 6;
  if (shown >= photoPosts.length) {
    //first match
    document.querySelector('.gallery__button').style.display = 'none';
  };

  function loadMore() {
    getPhotoPosts(photoPosts, shown, 9/*,  {author: 'Valentin Dytin'}*/).forEach((element) => {
      var temp = document.createElement('IMG');
      temp.className = 'gallery__photo';
      temp.src = element.photoLink;
      temp.id = element.id;
      document.getElementsByClassName('gallery')[0].appendChild(temp);
    });
    shown = shown + 9;
    if (shown >= photoPosts.length) {
      document.getElementsByClassName('gallery__button')[0].style.display = 'none';
    };
  };

  document.querySelector('.gallery').addEventListener('click', (event) => {
    if (event.target.nodeName !== 'IMG') return;
    const img = event.target;

    const form = createImageForm(img);
    document.body.appendChild(form);
  });

  function createElement (nodeName, classes, attrs = []) {
    var element = document.createElement(nodeName);
    classes.forEach(className => element.classList.add(className));
    attrs.forEach(attr => element.setAttribute(attr[0], attr[1]));

    return element;
  }

  function createImageForm(img) {
    var photoPost = getPhotoPost(photoPosts, img.id);
    var overlay = createElement('div', ['image-form-overlay', 'flex', 'transitable-opacity'], [['id', 'overlay']]);
    
    overlay.addEventListener('click', (evt) => {
      //if (evt.target.id !== 'overlay') return;
      document.body.removeChild(overlay);
    }, false);

    var contentWrapper = createElement('div', ['image-form__content', 'transitable-opacity']);
    
    var image = createElement('img', ['image-form__image'], [['src', img.src]])
    contentWrapper.appendChild(image);
    
    var imageInfo = createElement('div', ['image-form__info']);

    var imageAuthor = createElement('div', ['image-form__info__author']);
    var imageAuthorName = createElement('p', ['image-form__info__author__content']);
    imageAuthorName.innerHTML = photoPost.author;
    var imageAuthorDate = createElement('p', ['image-form__info__author__content']);
    imageAuthorDate.innerHTML = (photoPost.createdAt + '').split('G')[0];
    imageAuthor.appendChild(imageAuthorName);
    imageAuthor.appendChild(imageAuthorDate);
    imageInfo.appendChild(imageAuthor);

    var imageDescription = createElement('p', ['image-form__info__description']);
    imageDescription.innerHTML = photoPost.descriprion
    imageInfo.appendChild(imageDescription);

    if (photoPost.hashtags.length != 0) {
      var imageTags = createElement('p', ['image-form__info__description']);
      for (i = 0; i < photoPost.hashtags.length;++i) {
        imageTags.innerHTML += photoPost.hashtags[i] + ' ';
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

  function descriptionWidth(string) {
    var length = 0;
    var words = string.split(' ');  
    var ans = '';
    words.forEach(word => {
      length = length + word.length;
      if (length > 40) {
        ans = ans + '<br>';
        length = 0;
      }
      ans = ans + word + ' ';
    });
    return ans;
  }

  return {
    validatePhotoPost, getPhotoPost, getPhotoPosts, removePhotoPost, loadMore
  }
})();

document.querySelector('.gallery__button').addEventListener('click', () => {
  storage.loadMore();
}, false);

/*alert(validatePhotoPost(photoPosts[10]));*/