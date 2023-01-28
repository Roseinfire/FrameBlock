function insert(where, element, before) {
 if(before) {
   where.insertBefore(element, before)
     }
   else {
     where.append(element)
      }
  }
var methods = new Array()
      methods.push({ tag: 'frame', filter: function(e) { return true } })
      methods.push({ tag: 'iframe', filter: function(e) { return true } })  
      methods.push({ tag: 'yatag', filter: function(e) { return true } })
      methods.push({ tag: 'a', filter: function(e) { 
                  if(e.getElementsByTagName("img").length || e.getElementsByTagName("video").length) {
                        return e
                        }
                  } })
      methods.push({ tag: 'div', filter: function(e) {
                if(!e.children.length) {
                  var hand = e.parentElement
                  var group = hand.children
                  var place = 0
                  while(place < group.length) {
                     if(group[place] == e) { break }
                     else { place++ }
                    }
                  hand.removeChild(e)
                  /* element removed from its group, so place+1 become just place */
                  insert(hand, e.cloneNode(29), group[place])
                  return false
                     }
                   } 
                })
setInterval(function block() {
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
