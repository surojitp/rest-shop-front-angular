$(function () {
    $('#myTab a:first').tab('show');
    $('#myTab a').click(function (e) {
      e.preventDefault();
      $(this).tab('show');
    })
  })
  // $(document).ready(function() {
  //     //alert()
  //   $('.thumbnails').fancybox({
  //     openEffect  : 'none',
  //     closeEffect : 'none'
  //   });
    
  //   $('#myCarousel-2').carousel({
  //               interval: 2500
  //   });								
  // });