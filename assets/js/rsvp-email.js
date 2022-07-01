$(document).ready(function() {
  $("#contact-button").off().on("click touchstart", function() {
    sendMail();
  });
});

/**
 * Send an email that is preformatted
 */
function sendMail(mainEmail, ccEmail) {
  const message_template = 
`Please list the first and last name of each person attending: 
  
Phone Number: 

Do you need any help with anything?: 
`;

  // Send templated email to the address
  var link = "mailto:" + mainEmail
           + "?Subject="+ encodeURIComponent("Wedding RSVP")
           + "&body=" + encodeURIComponent(message_template);

  // Send a copy of the email to the CC address
  if (ccEmail && ccEmail.length > 0){
    link = link + "&cc=" + ccEmail;
  }   
  
  window.location.href = link;
}