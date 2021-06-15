var $random = document.querySelector('.random');
var $row = document.querySelector('.main-row');
var $randomLink = document.querySelector('.link');
var $searchForm = document.querySelector('.search-form');
var $color = document.querySelector('.color-square');
var $border = document.querySelector('.border');
var $input = document.querySelector('.input');

function randDOMTree(data) {
  var imageSrc = data.thumbs.large;
  var columnFlex = document.createElement('div');
  columnFlex.className = 'column column-flex wallpaper';

  var imgOne = document.createElement('img');
  imgOne.setAttribute('src', imageSrc);
  imgOne.className = 'wallpaper';

  var domRow = document.createElement('div');
  domRow.className = 'row';
  imgOne.appendChild(domRow);
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
    var imgElement = randDOMTree(wallpaperList[i]);
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
  event.preventDefault();
  generateSearch($searchForm.search.value, $input.value);
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

window.addEventListener('click', chooseColor);
$color.addEventListener('click', toggleColor);
$searchForm.addEventListener('submit', getSearchFormResults);
$random.addEventListener('click', fetchWallpaperList);
$randomLink.addEventListener('click', fetchWallpaperList);
