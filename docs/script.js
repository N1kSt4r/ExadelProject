var functions = (() => {
  var photoPosts = [];
  var shown = {count: 0};

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
    if (typeof(photoPost.hashtags) != typeof([]) || photoPost.hashtags == null) {
      return false;
    } else {
      for (i = 0; i < photoPost.hashtags.length; ++i) {
        if (typeof(photoPost.hashtags[i]) != typeof('') || photoPost.hashtags[i] == null) 
          return false;
      }
    }
    if (typeof(photoPost.likes) != typeof([]) || photoPost.likes == null) {
      return false;
    } else {
      for (i = 0; i < photoPost.likes.length; ++i) {
        if (typeof(photoPost.likes[i]) != typeof('') || photoPost.likes[i] == null) 
          return false;
      }
    }
    return true;
  }
  function setPhotoPosts() {
    photoPosts.splice(0, photoPosts.length);
    var descriprions = ['Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maxime magnam libero similique.', 'Molestiae vel rem cumque reiciendis adipisci nesciunt perspiciatis aspernatur aliquam nemo incidunt laborum dolorum quae!', 'Maxime magnam libero similique, molestiae vel rem cumque reiciendis adipisci nesciunt perspiciatis.'];
    var photoLinks = ['./img/users.svg', './img/userM.svg', './img/userF.svg', './img/photo.svg'];
    var photoAuthors = ['Valentin Dytin', 'Vladimir Putin', 'Vladislav Nytin'];
    var hashtags = ['#sitejivi', '#helpPleaseWithCSS', '#testHashTag', '#razdvatri', '#goDota', '#IwantToEat'];


    for (i = 0; i < 20; ++i) {
      photoPosts[i] = {};
      photoPosts[i].id = i + 1 + '';
      photoPosts[i].descriprion = descriprions[Math.round(Math.random() * 100) % 3];
      photoPosts[i].photoLink = photoLinks[(Math.round(Math.random() * 100)) % 4];
      photoPosts[i].createdAt = new Date('2018-02-23T23:00:00');
      photoPosts[i].hashtags = [];
      for (j = 0, n = Math.round(Math.random() * 100) % 3; j < n; ++j) {
        photoPosts[i].hashtags[j] = hashtags[Math.round(Math.random() * 100) % hashtags.length];
      }
      photoPosts[i].likes = [];
      for (j = 0, n = Math.round(Math.random() * 100) % 3; j < n; ++j) {
        photoPosts[i].likes[j] = photoAuthors[Math.round(Math.random() * 100) % 3];
      }
      photoPosts[i].author = photoAuthors[Math.round(Math.random() * 100) % 3];
    };
  }
  function getPhotoPosts(skip, top, filterConfig, shown) {
    if (skip === undefined) {
      skip = 0;
    }
    if (top === undefined) {
      top = 10;
    }
    result = [];
    var i = 0;
    for (i = skip; top != 0 && i < photoPosts.length; ++i) {
      if (compare(filterConfig, photoPosts[i])) {
        result[result.length] = photoPosts[i];
        --top;
      }
    }
    if (shown !== undefined) {
      shown.count = i;
    }
    return result;
  }
  function getPhotoPost(id) {
    for (i = 0; i < photoPosts.length; ++i) {
      if (id == photoPosts[i].id) {
        return photoPosts[i];
      }
    }
    return null;
  }
  function addPhotoPost(photoPost) {
    if (validatePhotoPost(photoPost)) {
      photoPosts[photoPosts.length] = photoPost;
    }
  }
  function removePhotoPost(id) {
    var i = 0;
    for (; i < photoPosts.length; ++i) {
      if (photoPosts[i].id == id) {
        break;
      }
    }
    console.log(photoPosts[2].id);
    if (i < photoPosts.length) {
      photoPosts.splice(i, 1);
    }
  }
  function editPhotoPost(id, editParams) {
    var photoPost = getPhotoPost(id);
    if (editParams.hashtags !== undefined && typeof(editParams.hashtags) == typeof([])) {
      flag = true;
      for (i = 0; i < editParams.hashtags.length; ++i) {
        if (typeof('') != typeof(editParams.hashtags[i])) {
          flag = false;
        }
      }
      if (flag) {
        photoPost.hashtags = editParams.hashtags;
      }
    }
    if (editParams.descriprion !== undefined && typeof(editParams.descriprion) == typeof('')) 
      photoPost.descriprion = editParams.descriprion;
    console.log(validatePhotoPost(photoPost));
  }
  function sizePhotoPosts() {
    return photoPosts.length;
  }
  function compare(photoPost1, photoPost2) {
    if (photoPost1 == undefined) {
      return true;
    }
    if (photoPost1.hashtags !== undefined) {
      for (i = 0, flag = true; i < photoPost1.hashtags.length; ++i) {
        for (j = 0; j < photoPost2.hashtags.length; ++j) {
          if (photoPost1.hashtags[i].toLowerCase()
            == photoPost2.hashtags[j].toLowerCase()) {
            flag = false;
          }
        }
        if (flag) {
          return false;
        }
      }
    }
    if (photoPost1.author !== undefined && photoPost1.author != photoPost2.author) 
      return false;
    if (photoPost1.createdAt !== undefined && photoPost1.createdAt != photoPost2.createdAt) 
      return false;
    return true;
  }
  function checkGalleryButton() {
    if (shown.count >= photoPosts.length) {
      document.querySelector('.gallery__button').style.display = 'none';
    };
  }
  function loadMore() {
    getPhotoPosts(shown.count, 6, {}/* {hashtags: ['#iwanttoeat']}*/, shown).forEach((element) => {
      var temp = document.createElement('IMG');
      temp.className = 'gallery__photo';
      temp.src = element.photoLink;
      temp.id = element.id;
      document.getElementsByClassName('gallery')[0].appendChild(temp);
    });
    checkGalleryButton();
  }
  function createElement (nodeName, classes, attrs = []) {
    var element = document.createElement(nodeName);
    classes.forEach(className => element.classList.add(className));
    attrs.forEach(attr => element.setAttribute(attr[0], attr[1]));
    return element;
  }
  function createImageForm(img) {
    var photoPost = getPhotoPost(img.id);
    var overlay = createElement('div', ['image-form-overlay', 'flex', 'transitable-opacity'], [['id', 'overlay']]);
    
    overlay.addEventListener('click', (evt) => {
      if (evt.target.className === 'image-form__image' || evt.target.className === 'overlay__likes') return;
      document.body.removeChild(overlay);
    }, false);

    var contentWrapper = createElement('div', ['image-form__content', 'transitable-opacity']);
    
    var imageContainer = createElement('div', ['image-form__imageCon']);
    var image = createElement('img', ['image-form__image'], [['src', img.src]]);
    var overlayLikes = createElement('div', ['overlay__likes']);
    var likesCount = createElement('div', ['likes']);
    likesCount.innerHTML =  photoPost.likes.length + ' likes';
    overlayLikes.appendChild(likesCount);
    imageContainer.appendChild(image);
    imageContainer.appendChild(overlayLikes)
    contentWrapper.appendChild(imageContainer);
    
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
  function displayZeroPhoto() {
    var temp = document.createElement('IMG');
    temp.className = 'gallery__photo';
    temp.src = './img/Just.png';
    document.getElementsByClassName('gallery')[0].appendChild(temp);
    temp = document.createElement('IMG');
    temp.className = 'gallery__photo';
    temp.src = './img/do.png';
    document.getElementsByClassName('gallery')[0].appendChild(temp);
    temp = document.createElement('IMG');
    temp.className = 'gallery__photo';
    temp.src = './img/it.png';
    document.getElementsByClassName('gallery')[0].appendChild(temp);
    checkGalleryButton();
  }

  return {
    validatePhotoPost, getPhotoPost, getPhotoPosts, removePhotoPost, addPhotoPost, loadMore, createImageForm, setPhotoPosts, photoPosts, sizePhotoPosts, checkGalleryButton, displayZeroPhoto, editPhotoPost
  }
})();

functions.setPhotoPosts();
functions.removePhotoPost(2);
functions.editPhotoPost(3, {descriprion: 'Look it\'s really works!', hashtags: ['#IdidIT', '#WebIsPain']});
if (functions.sizePhotoPosts() != 0) {
  functions.loadMore();
} else {
  functions.displayZeroPhoto();
}

document.querySelector(".posts").innerHTML = functions.sizePhotoPosts() + ' posts';

document.querySelector('.gallery__button').addEventListener('click', () => {
  functions.loadMore();
}, false);

document.querySelector('.gallery').addEventListener('click', (event) => {
  if (event.target.nodeName !== 'IMG') return;
  const img = event.target;
  console.log(img.id);
  const form = functions.createImageForm(img);
  document.body.appendChild(form);
}, false);
