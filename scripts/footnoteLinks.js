/*------------------------------------------------------------------------------
Function:       footnoteLinks()
Author:         Aaron Gustafson (aaron at easy-designs dot net)
Creation Date:  8 May 2005
Version:        1.3
Homepage:       http://www.easy-designs.net/code/footnoteLinks/
License:        Creative Commons Attribution-ShareAlike 2.0 License
                http://creativecommons.org/licenses/by-sa/2.0/
Note:           If you change or improve on this script, please let us know by 
                emailing the author (above) with a link to your demo page.
------------------------------------------------------------------------------*/
function footnoteLinks(containerID,targetID) {
  if (!document.getElementById || 
      !document.getElementsByTagName ||
      !document.createElement) return false;
  if (!document.getElementById(containerID) ||
      !document.getElementById(targetID)) return false;
  var container = document.getElementById(containerID);
  var target    = document.getElementById(targetID);
  var baseElems = document.getElementsByTagName('base');
  var baseURL = "";
  if (baseElems.length > 0) {
    baseURL = baseElems[baseElems.length-1].getAttribute('href');
    if (baseURL[baseURL.length-1] != '/') { baseURL += '/'; }
  }
  var h2        = document.createElement('h2');
  addClass(h2,'printOnly');
  var h2_txt    = document.createTextNode('Links');
  h2.appendChild(h2_txt);
  var coll = container.getElementsByTagName('*');
  var ol   = document.createElement('ol');
  addClass(ol,'printOnly');
  var myArr = [];
  var thisLink;
  var num = 1;
  for (var i=0; i<coll.length; i++) {
    var thisClass = coll[i].className;
    if ( (coll[i].getAttribute('href') ||
          coll[i].getAttribute('cite')) &&
          (thisClass == '' ||
           thisClass.indexOf('ignore') == -1)) { 
      thisLink = coll[i].getAttribute('href') ? coll[i].href : coll[i].cite;
      var urlSchemeExp = new RegExp('^[A-Za-z0-9.+-]+:');
      if (urlSchemeExp.test(thisLink) == false) {
        thisLink = baseURL + thisLink;
      }
      var note = document.createElement('sup');
      addClass(note,'printOnly');
      var note_txt;
      if (myArr[thisLink]) { 
        note_txt = document.createTextNode(myArr[thisLink]); 
      } 
      else { 
        var li     = document.createElement('li'); 
        var li_txt = document.createTextNode(thisLink); 
        li.appendChild(li_txt); 
        ol.appendChild(li); 
        myArr[thisLink] = num; 
        note_txt = document.createTextNode(num); 
        num++; 
      }
      note.appendChild(note_txt);
      if (coll[i].tagName.toLowerCase() == 'blockquote') {
        var lastChild = lastChildContainingText(coll[i]);
        lastChild.appendChild(note);
      } else {
        coll[i].parentNode.insertBefore(note, coll[i].nextSibling);
      }
    }
  }
  if (num > 1) {
    target.appendChild(h2);
    target.appendChild(ol);
  }
  addClass(document.getElementsByTagName('html')[0],'noted');
  return true;
}

