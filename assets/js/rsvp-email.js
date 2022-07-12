$(document).ready(function() {
  /**
   * Add a name field to the form
   */
  function addNameField(){
    numberNames++;
    $("#rsvp-info").append(`
      <div class="row">
          <label for="first-name"><b>Guest ${numberNames}</b>
      </div>
      <div class="row">
        <div class="name">
          <input class="first-name" id="${numberNames}" placeholder="First Name">
        </div>
        <div class="name">
          <input class="last-name" id="${numberNames}" placeholder="Last Name">
        </div>
      </div>`
    );
  }

  /**
   * Add a name field to the form
   */
  function addPhoneNumberField(){
    $("#rsvp-info").append(`
    <div class="row">
      <label for="phone-number"><b>Phone Number</b>
    </div>
    <div class="row">
      <input class="phone-number" type="tel" placeholder="123-456-7890">
    </div>
    `);
  }

  /**
   * Comment field to answer "Do you need help with anything?"
   */
  function addCommentField(){
    $("#rsvp-info").append(`
      <div class="row">
        <label for="help-response"><b>Do you need help with anything?</b>
      </div>
      <div class="row">
        <textarea placeholder="" id="help-response"></textarea>
      </div>
    `);
  }

  /**
   * Checkboxes to check yes or no
   */
  function addYesOrNo(){
    $("#rsvp-info").append(`
      <div class="row">
        <label><b>Will you be attending our wedding?</b></label>
      </div>
      <div class="row">
        <input type="radio" name="responseYes" value="Yes" id="responseYes">
        <label for="responseYes">Gladly Accepts</label>
      </div>
      <div class="row">
        <input type="radio" name="responseYes" value="No" id="responseNo">
        <label for="responseNo">Regretfully Declines</label>
      </div>
    `);
  }

  // Enter information to prefill
  let numberNames = 0;
  addNameField();
  addPhoneNumberField();
  addCommentField();
  addYesOrNo();

  // +1 Button functionality
  $("#addPersonButton").off().on("click", function() {
    addNameField();
  });

  // Phone Number Formatter
  $(".phone-number").off().on("input", function() {
    /**
     * Format the phone number based on the length of the input
     * @returns The formatted phone number string
     */
    function formatPhoneNumber(value){
      // Validation
      if (!value) {
        return value;
      }
      const phoneNumber = value.replace(/[^\d]/g, ''); // clean the input for any non-digit values.

      // Format phone number per length
      if (phoneNumber.length < 4) { // avoid weird behavior that occurs if you  format the area code too early
        return phoneNumber;
      }
      
      if (phoneNumber.length < 7) { // Return the formatted number (4 <= Phone number < 7)
        return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
      }

      // Return the formatted number (7 <= Phone number)
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
    }
    const formattedInputValue = formatPhoneNumber(this.value);
    this.value = formattedInputValue;
  });

  // Click event to send email
  $("#contact-button").off().on("click", function() {
    // Get information of RSVP Guests
    let firstNameFields = $(".first-name");
    let lastNameFields = $(".last-name");
    let phoneNumber = $(".phone-number");
    let guests = [];
    
    // Add Guest objects to the guest list
    let index = 0;
    for (const name of firstNameFields){
      if (name.value && name.value.length){
        guests.push({
          firstName: name.value, 
          lastName: lastNameFields[index].value
        });
      }

      index++;
    }

    // Add the phone number field to the first person
    if (guests.length){
      guests[0].phoneNumber = phoneNumber.val();
    }

    // Send Mail
    sendMail("blake.sweet16@gmail.com", "kaitlyncarr21@yahoo.com", guests);
  });
});

/**
 * Send an email that is preformatted
 * The message_template is very space sensitive (due to the multi-line strings)
 */
function sendMail(mainEmail, ccEmail, guests) {
  // Guest Names
  let message = `Guests Attending:
`;
  if (guests.length){
    let guestCount = 0;
    for (const guestNumber in guests){
      if (guestCount > 0){
        message += `
`;
      }
      message += `- ${guests[guestNumber].firstName} ${guests[guestNumber].lastName}`;
      guestCount++;
    }
    message += `

`;
  } else { // Add an Empty line incase they didn't complete the form
    message += `

`
  }

  // Attending Yes or No
  let attendanceResponse = "";
  if ($("#responseYes").prop('checked')) {
    attendanceResponse = "Gladly Accepts";
  } else if ($("#responseNo").prop('checked')){
    attendanceResponse = "Regretfully Declines";
  } else {
    attendanceResponse = "No Answer Provided";
  }

  message += `Attendance: `;
  if (attendanceResponse){
    message += attendanceResponse;
    message += `

`;
  } else { // Add an Empty line incase they didn't complete the form
    message += `


`
  }

  // Phone Number
  message += `Phone Number: `;
  if (guests.length){
    message += guests[0].phoneNumber;
    message += `

`;
  } else { // Add an Empty line incase they didn't complete the form
    message += `

`
  }

  // Do you need any help with anything?
  let helpComment = $("#help-response").val().trim() || "";
  message += `Do you need help with anything?: 
`;
  if (helpComment.length){
    message += helpComment;
    message += `

`;
  } else { // Add an Empty line incase they didn't complete the form
    message += `


`
  }

  // Send templated email to the address
  var link = "mailto:" + mainEmail
           + "?Subject="+ encodeURIComponent("Wedding RSVP")
           + "&body=" + encodeURIComponent(message);

  // Send a copy of the email to the CC address
  if (ccEmail && ccEmail.length > 0){
    link = link + "&cc=" + ccEmail;
  }   
  
  window.location.href = link;

  // Email.send({
  //   Host : "smtp.yourisp.com",
  //   Username : "username",
  //   Password : "password",
  //   To : 'them@website.com',
  //   From : "you@isp.com",
  //   Subject : "This is the subject",
  //   Body : "And this is the body"}).then( message => alert(message));
}