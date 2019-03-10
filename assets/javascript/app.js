

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
    var nextArrival = calculateNextArrival(firstTrainTime,frequency);
    // var diffTime = calculateMinutesAway(firstTrainTime);
    var minutesAway = testcalcMinutesAway(frequency,firstTrainTime);
    firebase.database().ref().push({
      TrainName: trainName,
      Destination: destination,
      FirstTrainTime : firstTrainTime,
      Frequency: frequency,
      NextArrival: nextArrival,
      MinutesAway: minutesAway
    //   DiffTime: diffTime

    });
    console.log("trainName....",trainName);
})

firebase.database().ref().on("child_added", function(childSnapshot) {
  var trainNameToAdd = childSnapshot.val().TrainName;
  var destinationToAdd = childSnapshot.val().Destination;
  var frequencyToAdd = childSnapshot.val().Frequency;
  var firstTrainTimeToAdd = childSnapshot.val().FirstTrainTime;
  var nextArrivalToAdd = childSnapshot.val().NextArrival;
//   var nextArrivalToAdd = childSnapshot.val().NextTrainTime;
    var minutesAwayToAdd = childSnapshot.val().MinuteAway;


  addRow(trainNameToAdd,destinationToAdd,frequencyToAdd,nextArrivalToAdd);
});

// Write table data from Firebase
  function addRow(newName,newDestination,newFrequency,newNextArrival) {
      var newRow = $("<tr>")
      $("#table-body").append(newRow);
      // Add Train Name to page
      var trainName = $("<td>");
      trainName.attr("class","trainName");
      $(newRow).append(trainName);
      $(trainName).text(newName);
      // Add Destination to page
      var destination = $("<td>");
      destination.attr("class","destination");
      $(newRow).append(destination);
      $(destination).text(newDestination);
      // Add Frequency to page
      var frequency = $("<td>");
      frequency.attr("class","frequency");
      $(newRow).append(frequency);
      $(frequency).text(newFrequency);
      // Add NextArrival
      var nextArrival = $("<td>");
      nextArrival.attr("class","nextArrival");
      $(newRow).append(nextArrival);
      $(nextArrival).text(newNextArrival);
      

  }




// **** MOMENT JS CODE ********
// Assumptions
function testcalcMinutesAway(frequency,firstTime){

    var tFrequency = parseInt(frequency);

    // Time is 3:30 AM
    // var firstTime = "03:30";

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
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

    return tMinutesTillTrain;

    // Next Train
    // var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    // console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

}

testcalcMinutesAway();





// // Next Train
// var nextTrain = moment().add(tMinutesTillTrain, "minutes");
// console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));



// **** NEW SHIT ****
function calculateNextArrival (firstTrainTime,frequency) {
    var firstTimeConverted = moment(firstTrainTime, "HH:mm").subtract(1, "years");
    var nextTime = firstTimeConverted.add(frequency,"m");
    var nextTimeConverted = moment(nextTime, "HH:mm");
    return nextTimeConverted.format("HH:mm A"); // ****** DOESN'T CONVER FROM 24-HR to AM/PM, DOCS SAID ADD a OR p AT END OF STRING
    // http://momentjs.com/docs/#/parsing/string-format/
}

// function calculateMinutesAway(firstTime) {
//     // var currentTime = moment();
//     var diffTime = moment().diff(moment(firstTime), "minutes");
//     return diffTime;

// }

