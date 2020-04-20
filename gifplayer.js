$(document).ready(function()
{
    $(".column#gif").hover(
        function()
        {
          var src = $(this).attr("src");
          $(this).attr("src", src.replace(/\.png$/i, ".gif"));
        },
        function()
        {
          var src = $(this).attr("src");
          $(this).attr("src", src.replace(/\.gif$/i, ".png"));
        });

    $(".column2#gif").hover(
      function()
      {
        var src = $(this).attr("src");
        $(this).attr("src", src.replace(/\.png$/i, ".gif"));
      },
      function()
      {
        var src = $(this).attr("src");
        $(this).attr("src", src.replace(/\.gif$/i, ".png"));
      });
        
        
});