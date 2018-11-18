(function(document) {
  
  //////////////////////////////////
  //  Customisable options
  //////////////////////////////////

  // Button text, e.g. "Accept", "I agree", etc.
  var buttonText = 'Accept';

  // Message, which informs the user about this website is using cookies
  var message = 'This website is using cookies. For more information, click here.';

  // URL (relative or absolute), to your cookies policy page
  var policyUrl = '/cookies.html';

  // Which word(s) in the above message should be replated by link to your cookies policy page (e.g. "click here")
  var triggerText = 'click here';
  
  //////////////////////////////////
  //  Do not change below this line
  //////////////////////////////////
  var cookieName = 'accept_cookies', 
      exists = false, 
      intervalId, 
      // this value correlates with the value of bottom property in .accept-cookies css class
      alertPosition = -100;

  // go, go, go
  if(!hasAccepted()) {
    showAlert();
  }

  /**
   * Whether the user has already agreed to cookies or not?
   * 
   * @returns boolean
   */
  function hasAccepted() {
    // get all cookies for this domain
    var cookiesStr = document.cookie;

    // if there are no cookies at all, obviously the user hasn't accepted anything
    if(!cookiesStr) {
      return exists;
    }

    // try to find out a cookie with name, defined in cookieName variable
    var cookies = cookiesStr.split(';');

    cookies.forEach(function(cookieSet) {
      var c = cookieSet.split('=');

      // of one exists, the user has already accepted our cookies policy
      if(c[0].trim() === cookieName) {
        exists = true;
      }
    });

    return exists;
  }

  /**
   * Display cookies alert
   * 
   * 1. Constructs the alert html.
   * 2. Adds the message and button text.
   * 3. Append to body.
   * 4. Add the button event listener.
   */
  function showAlert() {
    var html = '<div class="accept-cookies">' 
                  + '<div class="accept-cookies__text">' 
                    + getMessage()
                  + '</div>'
                  + '<div class="accept-cookies__action">' 
                    + '<button>'+buttonText+'</button>'
                  + '</div>'
                + '</div>';

    // append alert to DOM
    document.body.innerHTML += html;

    // add button click event listener
    document.getElementsByClassName('accept-cookies')[0].addEventListener('click', function() {
      acceptCookies();
    });

    // trigger the slideUp animation
    intervalId = setInterval(slideUp, 10);
  }

  /**
   * Constructs the message and link to cookies policy.
   * 
   * @returns string
   */
  function getMessage() {
    return message.replace(triggerText, '<a href="'+policyUrl+'">'+triggerText+'</a>');
  }

  /**
   * Accept button handler
   * 
   * 1. Sets the cookie with expiration date in 10 years.
   * 2. Removes the alert.
   */
  function acceptCookies() {
    document.cookie = cookieName + '=true; expires='+getExpirationDate()+'; path=/';
    removeAlert();
  }

  /**
   * Calculates the expiration date as 10 years from now
   * 
   * @return string Date in UTC
   */
  function getExpirationDate() {
    var date = new Date();
    date.setTime(date.getTime() + 315360000000);
    return date.toUTCString();
  }

  /**
   * Removes alert from body
   */
  function removeAlert() {
    // trigger slideDown animation
    intervalId = setInterval(function() {
      slideDown();

      // when alert is no more visible, remove it from DOM
      if(alertPosition === -100) {
        var alert = document.getElementsByClassName('accept-cookies')[0];

        if(alert) {
          alert.parentNode.removeChild(alert);
        }
      }
    }, 10);
  }

  /**
   * SlideUp animation - to show the alert
   */
  function slideUp() {

    var alert = document.getElementsByClassName('accept-cookies')[0];

    if (alertPosition === 0) {
        clearInterval(intervalId);
    } else {
      alertPosition++;
      alert.style.bottom = alertPosition+'px'; 
    }
  }

  /**
   * SlideDown animation - to hide the alert
   */
  function slideDown() {

    var alert = document.getElementsByClassName('accept-cookies')[0];

    if (alertPosition === -100) {
        clearInterval(intervalId);
    } else {
      alertPosition--; 
      alert.style.bottom = alertPosition+'px'; 
    }
  }

}(document));