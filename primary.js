/* 
 * To Title Case 2.0.1 – http://individed.com/code/to-title-case/
 * Copyright © 2008–2012 David Gouch. Licensed under the MIT License. 
 */

String.prototype.toTitleCase = function () {
  var smallWords = /^(a|an|and|as|at|but|by|en|for|if|in|of|on|or|the|to|vs?\.?|via)$/i;

  return this.replace(/([^\W_]+[^\s-]*) */g, function (match, p1, index, title) {
    if (index > 0 && index + p1.length !== title.length &&
      p1.search(smallWords) > -1 && title.charAt(index - 2) !== ":" && 
      title.charAt(index - 1).search(/[^\s-]/) < 0) {
      return match.toLowerCase();
    }

    if (p1.substr(1).search(/[A-Z]|\../) > -1) {
      return match;
    }

    return match.charAt(0).toUpperCase() + match.substr(1);
  });
};
// end title case, start WriteRight


function contextMenuClickHandler(info, tab) {
  console.log("item " + info.menuItemId + " was clicked");
  console.log("info: " + JSON.stringify(info));
  console.log("tab: " + JSON.stringify(tab));
  if ( info.menuItemId === "toTitleCase" )
  {
    //get the element, then grab the text and replace it this snippet with the appropriate case.
    chrome.tabs.getSelected(null, function(tab) {
      var replacement = info.selectionText.toTitleCase(); //.replace(/\n/g, "\r\n").replace(/\r\r/g, "\r");

      chrome.tabs.sendMessage(tab.id, {message: "setFocusedElementText", newSelectionText: replacement, originalSelectionText: info.selectionText}, function(response) {
        //do nothing right now
      })

    });
  }
  else if ( info.menuItemId === "getDefinition" )
  {
    //http://www.merriam-webster.com/dictionary/WORD
  }
  else if ( info.menuItemId === "getSynonyms" )
  {
    //http://www.merriam-webster.com/thesaurus/test
  }
  else if ( info.menuItemId === "getAntonyms" )
  {

  }
};

chrome.contextMenus.onClicked.addListener(contextMenuClickHandler);

// Set up context menu tree at install time.
chrome.runtime.onInstalled.addListener(function() {
  var editableId = chrome.contextMenus.create({
      "title": 'To Title Case',
      "contexts": ["editable"],
      "id": 'toTitleCase'
    });
  var getDefinition = chrome.contextMenus.create({
      "title": 'Get Definition',
      "contexts": ["editable", "selection"],
      "id": 'getDefinition'
    });

  var getSynonyms = chrome.contextMenus.create({
      "title": 'Get Synonyms',
      "contexts": ["editable", "selection"],
      "id": 'getSynonyms'
    });

  var getAntonyms = chrome.contextMenus.create({
      "title": 'Get Antonyms',
      "contexts": ["editable", "selection"],
      "id": 'getAntonyms'
    });
});
