$(window).ready(function () {
  $('#twit').click(
    function(){
      var tweetOut = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(document.querySelector('.share').innerText)
      window.open(tweetOut, '_blank');
      return false;
     }
   )

    // TypeIt
  var instance = new TypeIt('.head .type', {
    speed: 70,
    // autoStart: false
  })
  $('#learn').addClass('animated fadeIn delay-4s')
  $('#explain').addClass('animated bounceInUp delay-5s')

  // Animation
  $('body').css("overflow-y","hidden")
  $('.form-link').css("display", "none")
  
  setTimeout(function() {$("body").css("overflow-y","auto")},5000)
  setTimeout(function() {$('.ti-cursor').css("display", "none")},5500)

  $('.open-form').click(function() {
    $("body").css("overflow-y","auto")
    // $('.form-link').css("display", "block")
  })
  
  var $form = $('#mc-embedded-subscribe-form')
  if ($form.length > 0) {
    $('form input[type="submit"]').bind('click', function (event) {
      if (event) event.preventDefault()
      register($form)
    })
  }


  $(document).ready(function(){
    $("#sign-up").on("click","a", function (event) {
      event.preventDefault();
  
      var id  = $(this).attr('href'),
        top = $(id).offset().top;
      $('body,html').animate({scrollTop: top}, 1500);
    });
  });
})

function register($form) {
  $('#mc-embedded-subscribe').val('Sending...');
  $.ajax({
    type: $form.attr('method'),
    url: $form.attr('action'),
    data: $form.serialize(),
    cache: false,
    dataType: 'json',
    contentType: 'application/json; charset=utf-8',
    error: function (err) { alert('Could not connect to the registration server. Please try again later.') },
    success: function (data) {
      $('#mc-embedded-subscribe').val('subscribe')
      if (data.result === 'success') {
        // Yeahhhh Success
        console.log(data.msg)
        $('#mce-EMAIL').css('borderColor', '#ffffff')
        $('#subscribe-result').css('color', 'white')
        $('#subscribe-result').html('<p>Thank you for subscribing. We have sent you a confirmation email.</p>')
        $('#mce-EMAIL').val('')
        setTimeout(function() {
          $('body').css("overflow-y","auto")
          $('.form-link').css("display", "block")
          window.scrollTo(0, 0)
        },3000)
        document.querySelector('#learn').style.display = "none";
        document.querySelector('#twit').style.display = "block";
        document.querySelector('#twit').style.marginTop = "35px";
        document.querySelector('.subscribe').classList.remove = "animated";
        $("#updates").removeClass('animated')
        
      } else {
        // Something went wrong, do something to notify the user.
        console.log(data.msg)
        $('#mce-EMAIL').css('borderColor', '#ff8282')
        $('#subscribe-result').css('color', '#ff8282')
        $('#subscribe-result').html('<p>' + data.msg.substring(4) + '</p>')
      }
    }
  })
};
