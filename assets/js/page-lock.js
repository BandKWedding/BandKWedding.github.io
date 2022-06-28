$(document).ready(function() {
  // List of invited names 
  const invited = [
    "Andrew",
    "Mackenzie",
    "Kristianna",
    "Greg",
    "Sarah",
    "Jeff",
    "Grace",
    "Olivia",
    "Wyatt",
    "Tom",
    "Andrea",
    "Allie",
    "Waverly",
    "Davis"
  ];

  // Build Modal
  $("#securityModal").modal({
    show: true,
    focus: true,
    keyboard: false,
    backdrop: 'static',
  })
  $("#securityModal").css("backdrop-filter", "blur(50px)"); // Blur around the modal
  
  // Submit person name
  $("#nameSubmit").off().on("click", function() {
    const firstName = $("#person-name").val();
    const foundName = invited.find(person => person.toUpperCase() === firstName.toUpperCase());
    if (foundName){
      $("#securityModal").modal("hide")
      $("#securityModal").css("backdrop-filter", ""); // Blur around the modal
    }
  });
  
});