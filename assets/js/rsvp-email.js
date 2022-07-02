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

  // Enter information to prefill
  let numberNames = 0;
  addNameField();
  addPhoneNumberField();

  // +1 Button functionality
  $("#addPersonButton").off().on("click touchstart", function() {
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
  $("#contact-button").off().on("click touchstart", function() {
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
  let message_template = `Guests Attending:
`;
  if (guests.length){
    let guestCount = 0;
    for (const guestNumber in guests){
      if (guestCount > 0){
        message_template += `
`;
      }
      message_template += `- ${guests[guestNumber].firstName} ${guests[guestNumber].lastName}`;
      guestCount++;
    }
    message_template += `

`;
  } else { // Add an Empty line is they didn't complete the form
    message_template += `


`
  }

  // Phone Number
  message_template += `Phone Number: `;
  if (guests.length){
    message_template += guests[0].phoneNumber;
    message_template += `

`;
  } else { // Add an Empty line is they didn't complete the form
    message_template += `


`
  }
  

  // Do you need any help with anything?
  message_template += `Do you need help with anything?:
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