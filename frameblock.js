 /* FrameBlock 1.2.2 */
 /* January, 30, Roseinfire 2023 */
 const trusted = ["www.google.com", "github.com", "lichess.org", "drive.google.com", "www.youtube.com", "en.wikipedia.org"]
 function includesDomain(list) {
       /* Check whether website is trusted or not */
       var res = "" // result like `****.com`
       var host = "" // host like `http://`
       var doc = document.URL // shortcut the document.URL
       var zone = 0 // how many symbols "/" are in `doc`
       for(var i = 0; i < doc.length; i++) { // let's read the `doc`
             if(doc[i] == "/") { zone++ } // count symbols "/"
             else if(zone < 1) { host += doc[i] } // build host
             else if(zone > 1 && zone < 3) { res += doc[i] } // build res
             }
       if(list.includes(res)) { return true } // if list includes result return true
       else { return false } // else false
       }
 function insert(where, element, before) {
       /*  Insert element before its following element.
       Whether following element `before` is not defined, then element is last in its group, and so just it appends */        
       if(before) { where.insertBefore(element, before) }
       else { where.append(element) }
       }
 var methods = new Array()   
 /* An array of objects like { tag: "", filter: function(e) { return } } 
 Elements list will be created by tag and every element of list goes through a filter as an argument. 
 Whether `filter` returns true, element deleting from its parent. */
 methods.push({ tag: 'div', filter: function(e) {
             /* Checking for shadow DOM,
             There are no methods to remove shadowRoot, however we can remove shadowRoot's parent element. 
             The idea is to remove element and carefully replace with its clone, therefore delete shadowRoot */
             if(!e.children.length) { // only empty divs are checking to increase the speed
             var hand = e.parentElement // let's remember parent element
             var group = hand.children // remember the group
             var place = 0 // define position where div is in group
             while(place < group.length) {
                   if(group[place] == e) { break } // position defined, and so `break`
                   else { place++ } // continue searching
                   } // the position will be defined in all cases, as we know that group contains all children `hand`
             hand.removeChild(e) // now remove original element and replace with its clone
             /* Element also removed from its group, so (place+1) become just (place) */
             insert(hand, e.cloneNode(29), group[place]) // inserting to original position
             return false // no need remove element
             }
       } 
 })
 methods.push({ tag: 'frame', filter: function(e) { return true } }) // Just remove all the frames
 methods.push({ tag: 'iframe', filter: function(e) { return true } }) // And iframes too
 methods.push({ tag: 'yatag', filter: function(e) { return true } }) // Removing a kind of banners
 methods.push({ tag: 'a', filter: function(e) { // And remove banners itself
       if(e.getElementsByTagName("img").length || e.getElementsByTagName("video").length) {
             /* Whether the link has a child image or video, it is a banner. */
             return true // removing
             }
       } 
 })
 methods.push({ tag: 'video', filter: function(e) {
       if(e.autoplay || e.playsinline || e.muted) { return true } // try remove autoplay
       } 
 })
function block() { // reading methods
 if(!includesDomain(trusted)) {
       var blocked = new Array() // and array of removed elements
       function remove(tag, filter=function() { return true }) { // remove elements by tag
             /* Function takes not only tag names but also an arrays */
             var things; (typeof tag == 'string') ? things = document.getElementsByTagName(tag) : things = tag
             for(var i = 0; i < things.length; i++) { // filtering items
                   /* Whether filter is true, remember element and remove */
                   if(filter(things[i])) { blocked.push(things[i]); things[i].parentElement.removeChild(things[i]); }
                   }
             }
       for(var i = 0; i < methods.length; i++) { // finally go through the all methods
             remove(methods[i].tag, methods[i].filter) // removing
             }; if(blocked.length) { console.log("frames blocked > ", blocked) } // and.. output the removed items
       }
 }; block(); setInterval(block, 900) // call and repeat every 900ms

