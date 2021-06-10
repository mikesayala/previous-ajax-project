var $random = document.querySelector('.random');
var $row = document.querySelector('.main-row');
var $randomLink = document.querySelector('.link');
function randDOMTree(data) {
  var imageSrc = data.path;
  var columnFlex = document.createElement('div');
  columnFlex.className = 'column column-flex wallpaper';

  var imgOne = document.createElement('img');
  imgOne.setAttribute('src', imageSrc);
  imgOne.className = 'wallpaper';
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

$random.addEventListener('click', fetchWallpaperList);
$randomLink.addEventListener('click', fetchWallpaperList);
