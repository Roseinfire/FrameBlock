var methods = new Array()
setInterval(function block() {
      methods.push({ tag: 'frame', filter: function(e) { return e } })
      methods.push({ tag: 'iframe', filter: function(e) { return e } })  
      methods.push({ tag: 'yatag', filter: function(e) { return e } })
      methods.push({ tag: 'a', filter: function(e) { 
                  if(e.getElementsByTagName("img").length || e.getElementsByTagName("video").length) {
                        return e
                        }
                  } })
      methods.push({ tag: 'div', filter: function(e) {
                  e.parentElement.append(e.cloneNode(49))
                  return e
                  } })
      var blocked = new Array()
      function remove(tag, filter=function() { return true }) {
            var things; (typeof tag == 'string') ? things = document.getElementsByTagName(tag) : things = tag
            for(var i = 0; i < things.length; i++) {
                  if(filter(things[i])) { blocked.push(things[i]); things[i].parentElement.removeChild(things[i]); }
                  }
            }
      for(var i = 0; i < methods.length; i++) {
            remove(methods[i].tag, methods[i].filter)
            }; if(blocked.length) { console.log("frames blocked > ", blocked) }
      }, 500)
