function doPopups() {
  if (!document.getElementsByTagName) return false;
  var links = document.getElementsByTagName("a");
  for (var i=0; i < links.length; i++) {
    if (links[i].className.match("popup")) {
      links[i].onclick = function() {
        window.open(this.href);
        return false;
      }
    }
  }
}
