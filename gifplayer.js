$(document).ready(function () {
  $(".column#gif").hover(
    function () {
      let src = $(this).attr("src");
      $(this).attr("src", src.replace(/\.png$/i, ".gif"));
    },
    function () {
      let src = $(this).attr("src");
      $(this).attr("src", src.replace(/\.gif$/i, ".png"));
    });

  $(".column2#gif").hover(
    function () {
      let src = $(this).attr("src");
      $(this).attr("src", src.replace(/\.png$/i, ".gif"));
    },
    function () {
      let src = $(this).attr("src");
      $(this).attr("src", src.replace(/\.gif$/i, ".png"));
    });


});

//this is git test