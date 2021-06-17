/* exported data */
var data = {
  thumbs: []
};

window.addEventListener('beforeunload', storage);

function storage(event) {
  var wallpaperJSON = JSON.stringify(data);
  localStorage.setItem('wallpapers', wallpaperJSON);
}

var previousWallpaperJSON = localStorage.getItem('wallpapers');
if (previousWallpaperJSON !== null) {
  data = JSON.parse(previousWallpaperJSON);
}
