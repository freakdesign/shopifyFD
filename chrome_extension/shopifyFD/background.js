chrome.browserAction.onClicked.addListener(function(tab) {
  /* 
  No tabs or host permissions needed!
  */
  chrome.tabs.executeScript({
    code: 'var shopifyFD = document.createElement("script");shopifyFD.type = "text/javascript";shopifyFD.src = "//rawgithub.com/freakdesign/shopifyFD/master/shopifyFD.min.js";document.body.appendChild(shopifyFD);'
  });
});