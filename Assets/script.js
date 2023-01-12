// Wraps all code that interacts with the DOM in a call to jQuery to ensure that the code isn't run until the browser has finished rendering all the elements in the html.//

$(document).ready(function () {
  //adds onclick for all save buttons. Uses the 'this' keyword to tell the function to bind it to the context of the save button user *actually* clicks, and not any others at that specific moment//
  $(".saveBtn").on("click", function () {
    //grabs the key (with an id of hour-XXX)associated with the parent element
    var time = $(this).parent().attr("id");
    //grabs the value (with a class of description)associated with the sibling element, since the key and value are data that go together (time and description)
    var eventDescription = $(this).siblings(".description").val();
    //sets key and value in local storage
    localStorage.setItem(time, eventDescription);
    //notifies user that this information has been saved
    $(".notification").addClass("show");
    setTimeout(function () {
      //removes notification after 3 seconds (3000 miliseconds)
      $(".notification").removeClass("show");
    }, 3000);
  });
  function hourChecker() {
    //a function to check our current time in relation to the block of time in the scheduler
    var currentHour = dayjs().hour();
    //for each class of time-block, run the following function
    $(".time-block").each(function () {
      //takes the hour of time-block, which is located as the attr id of whatever block we're currently on **uses 'this' keyword** and parses it from a string to an integer. Because the id is separated by a - (ie. hour-9, hour-10), we have to split the id at the - so that it only returns what comes to the right of it (in this case, the numbers 9, 10...)
      var blockHour = parseInt($(this).attr("id").split("-")[1]);
      if (blockHour < currentHour) {
        //if blockHour is earlier than currentHour make a class that shows it as "past". Else if blockHour is equal to the currentHour, remove that class and make a new class of "present". Else must mean that it is in the future. remove both previous classes to be safe, and add a class of "future"
        $(this).addClass("past");
      } else if (blockHour === currentHour) {
        $(this).removeClass("past");
        $(this).addClass("present");
      } else {
        $(this).removeClass("present");
        $(this).removeClass("past");
        $(this).addClass("future");
      }
    });
  }
  hourChecker();
  //this tells the hourChecker to refresh itself every minute (60 seconds/60000 miliseconds) so that the user doesn't need to reload the page to get accurate times
  setInterval(hourChecker, 60000);

  //gets key from local storage
  $("#hour-9 .description").val(localStorage.getItem("hour-9"));
  $("#hour-10 .description").val(localStorage.getItem("hour-10"));
  $("#hour-11 .description").val(localStorage.getItem("hour-11"));
  $("#hour-12 .description").val(localStorage.getItem("hour-12"));
  $("#hour-13 .description").val(localStorage.getItem("hour-13"));
  $("#hour-14 .description").val(localStorage.getItem("hour-14"));
  $("#hour-15 .description").val(localStorage.getItem("hour-15"));
  $("#hour-16 .description").val(localStorage.getItem("hour-16"));
  $("#hour-17 .description").val(localStorage.getItem("hour-17"));

  //gives today's date using dayjs
  const todaysDate = dayjs().format("dddd, MMM D, YYYY");
  $("#currentDay").html(todaysDate);
  console.log(todaysDate);
});
