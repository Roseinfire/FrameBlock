var methods = new Array()
var times = 0
setInterval(function block() {
  methods.push({ tag: 'frame', filter: function(e) { return true } })
  methods.push({ tag: 'iframe', filter: function(e) { return true } })  
  methods.push({ tag: 'yatag', filter: function(e) { return true } })
  methods.push({ tag: 'a', filter: function(e) { 
    if(e.getElementsByTagName("img").length || e.getElementsByTagName("video").length) {
     return true
        }
  } })
  methods.push({ tag: document.all, filter: function(e) {
   var style = false;
   for(var i = 0; i < e.attributes.length; i++) {
    e.attributes[i].name == "style"; style=true; break
     }
   if(e.shadowRoot || ( (e.tag == "div") && !style && e.children.length==0) ) {
         return true
             } 
   } })
    times++; (function removeShadows() {
     if(times % 7 == 0) { 
      var body = document.body.cloneNode(99)
      var html = document.body.parentElement
      html.removeChild(document.body); html.appendChild(body)
        }
      })()
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
 }, 200)
