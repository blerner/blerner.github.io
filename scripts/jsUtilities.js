/*------------------------------------------------------------------------------
Filename:       jsUtilities Library
Author:         Aaron Gustafson (aaron at easy-designs dot net)
                unless otherwise noted
Creation Date:  4 June 2005
Version:        2.1
Homepage:       http://www.easy-designs.net/code/jsUtilities/
License:        Creative Commons Attribution-ShareAlike 2.0 License
                http://creativecommons.org/licenses/by-sa/2.0/
Note:           If you change or improve on this script, please let us know by 
                emailing the author (above) with a link to your demo page.
------------------------------------------------------------------------------*/
// ---------------------------------------------------------------------
//                      array.push (if unsupported)
// ---------------------------------------------------------------------
if(Array.prototype.push == null) {
  Array.prototype.push = function(item) {
    this[this.length] = item;
    return this.length;
  };
};
// ---------------------------------------------------------------------
//                             addClass()
//                 appends the specified class to the object
// ---------------------------------------------------------------------
function addClass(elem, theClass) {
  if (elem.className != '') {
    elem.className += ' ' + theClass;
  } else {
    elem.className = theClass;
  }
}

// ---------------------------------------------------------------------
//                      dict()  (not jsUtilities)
//          defines a hash with keys given an array of terms
// ---------------------------------------------------------------------
function dict(terms) {
  var d = [];
  for (var i = 0; i < terms.length; i++) {
    d[terms[i]] = terms[i];
  }
  return d;
}

// ---------------------------------------------------------------------
//                      lastChildContainingText()
//  finds the last block-level text-containing element within an object
// ---------------------------------------------------------------------
function lastChildContainingText(curElem) {
  var testChild = curElem.lastChild;
  var contentCntnr = dict(['p', 'li', 'dd']);
  while (testChild.nodeType != 1) {
    testChild = testChild.previousSibling;
  } 
  var tag = testChild.tagName.toLowerCase();
  if (contentCntnr[tag]) {
    testChild = lastChildContainingText(testChild);
  }
  return testChild;
}

