

// ****** FIREBASE CODE ***********
// Initialize Firebase
var config = {
    apiKey: "AIzaSyDAERu2OhTJmiBgZIAnXk7lHWAaSAY28Zk",
    authDomain: "trainscheduler-1c731.firebaseapp.com",
    databaseURL: "https://trainscheduler-1c731.firebaseio.com",
    projectId: "trainscheduler-1c731",
    storageBucket: "trainscheduler-1c731.appspot.com",
    messagingSenderId: "130724070717"
};
firebase.initializeApp(config);

$("#submit-button").on("click", function(e) {
    e.preventDefault();
    var name = $("#employee-name").val();
    var role = $("#role").val();
    var startDate = $("#start-date").val();
    var monthlyRate = $("#monthly-rate").val();
  //   console.log(name);
    firebase.database().ref().push({
      Name: name,
      Role: role,
      StartDate : startDate,
      // MonthsWorked: monthsWorked,
      MonthlyRate: monthlyRate,
      // TotalBilled: totalBilled
    });
})

var newName = firebase.database().ref().on("child_added", function(childSnapshot) {
  var nameToAdd = childSnapshot.val().Name;
  console.log(nameToAdd);
  addName((nameToAdd));
});
// console.log(newRecord);

// function writeRowToPage() {
  function addName(name) {
      var newRow = $("<tr>")
      $("#table-body").append(newRow);
      var newName = $("<td>");
      newName.attr("class","name");
      // var counter = 0;
      // newName.attr("id",parseInt(counter)+1);
      $(newRow).append(newName);
      $(newName).text(name);
  }



  
// **** MOMENT JS CODE ********
// Assumptions
var tFrequency = 17;

// Time is 3:30 AM
var firstTime = "03:00";

// First Time (pushed back 1 year to make sure it comes before current time)
var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
console.log("firstTime...",firstTimeConverted);

// Current Time
var nextTime = "19:12";
var currentTime = moment(nextTime,"HH:mm");
console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

// Difference between the times
var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
console.log("DIFFERENCE IN TIME: " + diffTime);

// Time apart (remainder)
var tRemainder = diffTime % tFrequency;
console.log(tRemainder);

// Minute Until Train
var tMinutesTillTrain = tFrequency - tRemainder;
console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

// Next Train
var nextTrain = moment().add(tMinutesTillTrain, "minutes");
console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));





// **** FUNCTIONS TO ADD ****
// function addRow()

