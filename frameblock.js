setInterval(function block() {
   window.open = function() {  }
   var fs = []
   var iframes = document.getElementsByTagName("iframe")
   var frames = document.getElementsByTagName("frame")
   var links = document.getElementsByTagName("a")
   var yatags = document.getElementsByTagName("yatag")
   for(var i = 0; i < iframes.length; i++) { 
     fs.push(iframes[i]); iframes[i].parentElement.removeChild(iframes[i]);
     }
   for(var i = 0; i < frames.length; i++) {
     fs.push(frames[i]); frames[i].parentElement.removeChild(frames[i]);
     };
   for(var i = 0; i < links.length; i++) {
     if(links[i].getElementsByTagName("img").length) {
     fs.push(links[i]); links[i].parentElement.removeChild(links[i]);
        }
     };
    for(var i = 0; i < yatags.length; i++) {
       fs.push(yatags[i]); yatags[i].parentElement.removeChild(yatags[i]);
     };
     if(fs.length) { console.warn("frames blocked >> ", fs) }
  }, 50)