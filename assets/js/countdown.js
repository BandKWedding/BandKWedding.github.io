
// Set the date we're counting down to
const countdownDate = "Aug 20, 2022 18:30:00";
var countDownDate = new Date(countdownDate).getTime();

// Update the count down every 1 second
var x = setInterval(function() {
  var now = new Date().getTime(); // Get today's date and time
  var distance = countDownDate - now; // Find the distance between now and the count down date
    
  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
  // Output the result in an element with id="demo"
  const timerDivID = 'countdownTimer';
  const timerDiv = document.getElementById(timerDivID);
  if (timerDiv){
    timerDiv.innerHTML = ` (${days} Days ${hours} Hours ${minutes} Minutes ${seconds} Seconds)`;
  }
    
  // If the count down is over, write some text 
  if (distance < 0) {
    clearInterval(x);
    document.getElementById(timerDivID).innerHTML = "CONGRATULATIONS BLAKE & KAITLYN";
  }
}, 1000);