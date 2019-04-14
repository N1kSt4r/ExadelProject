/* eslint-disable no-param-reassign */
const userPage = true;
const userName = 'ThisUser';

const gallery = new View();

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
  gallery.showPhoto(event.target);
}, false);

if (userPage) {
  const button = document.querySelector('.user__zone__followbutton');
  button.innerHTML = 'Add photo';
  button.addEventListener('click', () => {
    document.body.appendChild(gallery.createAddForm());
  }, false);
}
