

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

$("#submitButton").on("click", function(e) {
    e.preventDefault();
    var trainName = $("#trainNameInput").val();
    var destination = $("#destinationInput").val();
    var firstTrainTime = $("#firstTrainTimeInput").val();
    var frequency = $("#frequencyInput").val();
    firebase.database().ref().push({
      TrainName: trainName,
      Destination: destination,
      FirstTrainTime : firstTrainTime,
      Frequency: frequency,
    });
    console.log("trainName....",trainName);
})

var newTrain = firebase.database().ref().on("child_added", function(childSnapshot) {
  var trainNameToAdd = childSnapshot.val().TrainName;

  addRow(trainNameToAdd);
});

// function writeRowToPage() {
  function addRow(name) {
      var newRow = $("<tr>")
      $("#table-body").append(newRow);

      var trainName = $("<td>");
      trainName.attr("class","trainName");
      $(newRow).append(trainName);
      $(trainName).text(name);
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

