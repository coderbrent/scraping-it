//client side js

$(function() {

  $("#getArticle").on("click", function() {
    $.ajax('/db', {
      method: "GET",
      type: "application/json"
    }).then(function(response) {
      console.log(response)
    })
  })


})