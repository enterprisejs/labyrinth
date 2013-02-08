'use strict'

var Doc = require('crdt').Doc
var A = new Doc()
var B = new Doc()

var as
(as = A.createStream())
  .pipe(B.createStream())
  .pipe(as)

var b_test = B.createSet("type","fooz");

B.on('create',function(row) {
  console.log("ROW " + JSON.stringify(row));
  var t = row.get("test");
  if(b_test.has(row)) {
    console.log("WOOHOO!");
    console.log("ALL OF " + JSON.stringify(b_test.toJSON()) )
  }
  console.log("TEST = " + t);
  if(t == "foo")
  {
    console.log("SETTIFY");
    row.set("test","bar")
  }
})

//var a_test = A.add({ id: 'id:1', test: "foo"});
var a_test = A.createSet("type", "fooz");
A.add({a: "a", test: "foo",type: "safe"});
A.add({a: "b", test: "foo",type: "fooz"});
A.add({a: "c", test: "foo",type: "fooz"});

a_test.on('update',function (row) {
  console.log("SETTED " + JSON.stringify(row));
});


