/*document.getElementsByClassName('gallery__photo')[0].style.backgroundColor = 'red';
var temp = document.createElement('img');
temp.className = 'gallery__photo';
temp.src = './img/userM.svg';
document.getElementsByClassName('gallery')[0].appendChild(temp);
alert('check');*/

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

function showAlert() {
  alert('alert');
}

function compare(photoPost1, photoPost2) {
  if (photoPost1.descriprion != null && photoPost1.descriprion != photoPost2.descriprion) 
    return false;
  if (photoPost1.author != null && photoPost1.author != photoPost2.author) 
    return false;
  if (photoPost1.createdAt != null && photoPost1.createdAt != photoPost2.createdAt) 
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
  for (i = skip; i < skip + top && i < gallery.length; ++i) {
    addPhotoPost(result, gallery[i]);
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
var photoLinks = ['./img/users.svg', './img/userM.svg', './img/userF.svg'];

var photoPosts = [];

for (i = 0; i < 20; ++i) {
  photoPosts[i] = {};
  photoPosts[i].id = i + 1 + '';
  photoPosts[i].descriprion = descriprions[Math.round(Math.random() * 100) % 3];
  photoPosts[i].photoLink = photoLinks[(Math.round(Math.random() * 100)) % 3];
  photoPosts[i].createdAt = new Date('2018-02-23T23:00:00');
  photoPosts[i].author = 'User Name';
  /*var temp = document.createElement('img');
  temp.className = 'gallery__photo';
  temp.src = photoPosts[i].photoLink;
  document.getElementsByClassName('gallery')[0].appendChild(temp);*/
};

getPhotoPosts(photoPosts, 0, 6).forEach(function(element) {
  var temp = document.createElement('img');
  temp.className = 'gallery__photo';
  temp.src = element.photoLink;
  document.getElementsByClassName('gallery')[0].appendChild(temp);
});

var shown = 6;
if (shown >= photoPosts.length) {
  document.getElementsByClassName('gallery__button')[0].style.display = 'none';
};

function loadMore() {
  getPhotoPosts(photoPosts, shown, 9).forEach(function(element) {
    var temp = document.createElement('img');
    temp.className = 'gallery__photo';
    temp.src = element.photoLink;
    document.getElementsByClassName('gallery')[0].appendChild(temp);
  });
  shown = shown + 9;
  if (shown >= photoPosts.length) {
    document.getElementsByClassName('gallery__button')[0].style.display = 'none';
  };
};




/*alert(validatePhotoPost(photoPosts[10]));*/
