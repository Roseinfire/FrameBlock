var methods = new Array()
setInterval(function block() {
   var blocked = new Array()
   function remove(tag, filter=function() {}) {
      var things; (typeof tag == 'string') ? things = document.getElementsByTagName(tag) : things = tag
      for(var i = 0; i < things.length; i++) {
         if(filter(things[i])) { things[i].parentElement.removeChild(things[i]); blocked.push(things[i]) }
          }
      }
   for(var i = 0; i < methods.length; i++) {
      remove(methods[i].tag, methods[i].filter)
    }; if(blocked.length) { console.log("frames blocked > ", blocked) }
 }, 80)
  methods.push({ tag: 'frame', filter: function(e) { return true } })
  methods.push({ tag: 'iframe', filter: function(e) { return true } })  
  methods.push({ tag: 'yatag', filter: function(e) { return true } })
  methods.push({ tag: 'a', filter: function(e) { 
    if(e.getElementsByTagName("img").length || e.getElementsByTagName("video").length) {
     return true
        }
  } })
  methods.push({ tag: document.all, filter: function(e) { 
   if(e.shadowRoot) {
         return true     
             } 
   } })
