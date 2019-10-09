// Set dynamic year
var year = new Date().getFullYear();
document.body.innerHTML = document.body.innerHTML.replace('{year}', year);

// Change favicon based on dark mode preference
var isDarkActive = window.matchMedia("(prefers-color-scheme: dark)").matches;
changeFavicon(isDarkActive);

window.matchMedia("(prefers-color-scheme: dark)").addListener(function(event) {
  isDarkActive = event.matches;
  changeFavicon(isDarkActive);
});

document.head = document.head || document.getElementsByTagName('head')[0];

function changeFavicon(state) {
  var lightIcon = '/assets/favicon-light.ico';
  var darkIcon = '/assets/favicon-dark.ico';

  var link = document.createElement('link'),
      oldLink = document.getElementById('dynamic-favicon');

  link.id = 'dynamic-favicon';
  link.rel = 'shortcut icon';
  link.href = state ? darkIcon : lightIcon;

  if (oldLink) {
    document.head.removeChild(oldLink);
  }
  document.head.appendChild(link);
}