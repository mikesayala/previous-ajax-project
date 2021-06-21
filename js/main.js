var $random = document.querySelector('.random');
var $row = document.querySelector('.main-row');
var $randomLink = document.querySelector('.link');
var $searchForm = document.querySelector('.search-form');
var $color = document.querySelector('.color-square');
var $border = document.querySelector('.border');
var $input = document.querySelector('.input');
var $favorite = document.querySelector('.favorite-link');
var $favoriteBtn = document.querySelector('.favorite-btn');
var $mainContainer = document.querySelector('.main-container');
var $faveRow = document.querySelector('#fave-row');
var $favoritesContainer = document.querySelector('.favorites-container');
var $mobileColor = document.querySelector('.mobile-color-square');
var $mobileBorder = document.querySelector('.mobile-border');
var $searchMobileForm = document.querySelector('.mobile-search');
function randDOMTree(imageSrc) {
  var columnFlex = document.createElement('div');
  columnFlex.className = 'column column-flex wallpaper';

  var imgOne = document.createElement('img');
  imgOne.setAttribute('src', imageSrc);
  imgOne.setAttribute('name', 'wallpaper');
  imgOne.className = 'wallpaper wallpaper-image';

  var save = document.createElement('button');
  save.className = 'save-button';
  save.innerText = 'Save';
  columnFlex.appendChild(save);

  columnFlex.appendChild(imgOne);

  return columnFlex;
}

function shuffle(array) {
  for (var i = 0; i < array.length; i++) {
    var randomPosition = Math.floor(Math.random() * array.length);
    var placeHolder = array[i];
    array[i] = array[randomPosition];
    array[randomPosition] = placeHolder;
  }
  return array;
}

function generateWallpaperList(wallpaperList) {
  for (var i = 0; i < 9; i++) {
    var imgElement = randDOMTree(wallpaperList[i].thumbs.large);
    $row.appendChild(imgElement);
  }
}

function fetchWallpaperList() {
  destroyChildren($row);
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://lfz-cors.herokuapp.com/?url=https://wallhaven.cc/api/v1/search?sorting=random&apikey=ZwadO7Fe1ydjJA9TqhYGiWxCsvOTeBox');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    var shuffledWallpapers = shuffle(xhr.response.data);
    generateWallpaperList(shuffledWallpapers);
  });
  xhr.send();
}

function destroyChildren(el) {
  while (el.firstChild) el.firstChild.remove();
}

window.addEventListener('load', function () {
  fetchWallpaperList();
});
// When i click the submit button after entering a search term
// that sends a request to the api to for a search query of the tagname

function generateSearch(searchTerm, color) {
  destroyChildren($row);
  var xhr = new XMLHttpRequest();
  var url = encodeURIComponent('https://wallhaven.cc/api/v1/search?colors=' + color + '&q=' + searchTerm + '&apikey=ZwadO7Fe1ydjJA9TqhYGiWxCsvOTeBox');
  xhr.open('GET', 'https://lfz-cors.herokuapp.com/?url=' + url);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    var shuffledWallpapers = shuffle(xhr.response.data);
    generateWallpaperList(shuffledWallpapers);
  });
  xhr.send();
}

function getSearchFormResults(event) {
  destroyChildren($row);
  event.preventDefault();
  generateSearch($searchForm.search.value, $input.value);
}

function mobileSearchFormResults(event) {
  destroyChildren($row);
  event.preventDefault();
  generateSearch($searchMobileForm.mobile.value, $input.value);
}

var clicked = false;
function toggleColor(event) {
  if (clicked === false) {
    clicked = true;
    $border.classList = 'border';
  } else {
    clicked = false;
    $border.classList = 'hidden';
  }
}

function mobileColor(event) {
  if (clicked === false) {
    clicked = true;
    $mobileBorder.classList = 'mobile-border';
  } else {
    clicked = false;
    $mobileBorder.classList = 'hidden';
  }
}

function chooseColor(event) {
  var dataValue = event.target.getAttribute('data-value');
  if (!event.target.matches('.color')) {
    return;
  }
  $input.value = dataValue;

  if (event.target.matches('.color') === clicked) {
    clicked = true;
    $border.classList = 'hidden';
  }
}

function mobileChooseColor(event) {
  var mobileDataValue = event.target.getAttribute('data-value');
  if (!event.target.matches('.mobile-color')) {
    return;
  }
  $input.value = mobileDataValue;

  if (event.target.matches('.mobile-color') === clicked) {
    clicked = true;
    $mobileBorder.classList = 'hidden';
  }
}

function submitWallpaper(event) {
  if (event.target.parentElement.matches('.column-flex')) {
    var parent = event.target.parentElement;
    var img = parent.querySelector('img');
    var srcImg = img.getAttribute('src');
    var object = {
      id: data.nextWallpaperId,
      imgSrc: srcImg
    };
    data.nextWallpaperId++;
    data.thumbs.unshift(object);
  }
}

function entryContentLoaded(event) {
  for (var i = 0; i < data.thumbs.length; i++) {
    var entryObjects = renderFavorites(data.thumbs[i]);
    $faveRow.append(entryObjects);
  }
}

function activate(row, button) {
  $faveRow.classList.toggle('view');
  $mainContainer.classList.toggle('hidden');
  $random.classList.toggle('hidden');
  $randomLink.classList.toggle('hidden');
  $searchForm.classList.toggle('hidden');
}

function deactivate(row, button) {
  $faveRow.classList.toggle('hidden');
  $mainContainer.classList.toggle('view');
}

function renderFavorites(object) {
  var columnFlux = document.createElement('div');
  columnFlux.className = 'column column-flex wallpaper';
  var imgOne = document.createElement('img');
  imgOne.setAttribute('src', object.imgSrc);
  imgOne.setAttribute('name', 'wallpaper');
  imgOne.className = 'wallpaper wallpaper-image';
  var $delete = document.createElement('button');
  $delete.className = 'delete-button';
  $delete.innerText = 'Delete';
  $delete.setAttribute('data-id', object.id);
  columnFlux.appendChild($delete);
  columnFlux.appendChild(imgOne);
  return columnFlux;
}

function toggleFavorites(event) {
  destroyChildren($faveRow);
  entryContentLoaded(event);
  activate($faveRow, $mainContainer);
  deactivate($faveRow, $mainContainer);
}

function deleteWallpaper(event) {
  var numId = parseInt(event.target.getAttribute('data-id'));
  for (var nextWallpaperId = 0; nextWallpaperId < data.thumbs.length; nextWallpaperId++) {
    if (numId === parseInt(data.thumbs[nextWallpaperId].id)) {
      data.thumbs.splice(nextWallpaperId, 1);
    }
  } if (event.target.matches('.delete-button')) {
    event.target.closest('div').remove();
  }
}

$favoritesContainer.addEventListener('click', deleteWallpaper);
document.addEventListener('DOMContentLoaded', entryContentLoaded);
$mainContainer.addEventListener('click', submitWallpaper);
$favoriteBtn.addEventListener('click', toggleFavorites);
$favorite.addEventListener('click', toggleFavorites);
$mobileBorder.addEventListener('click', chooseColor);
$mobileBorder.addEventListener('click', mobileChooseColor);
$border.addEventListener('click', chooseColor);
$color.addEventListener('click', toggleColor);
$mobileColor.addEventListener('click', mobileColor);
$searchMobileForm.addEventListener('submit', mobileSearchFormResults);
$searchForm.addEventListener('submit', getSearchFormResults);
$random.addEventListener('click', fetchWallpaperList);
$randomLink.addEventListener('click', fetchWallpaperList);
