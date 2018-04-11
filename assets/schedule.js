    $( document ).ready(function() {
  // Initialize Firebase
    var config = {
        apiKey: "AIzaSyDHLz0RGh-DW--hzRQCtoQLFDJoQkY2BgM",
        authDomain: "train-schedule-c6fb8.firebaseapp.com",
        databaseURL: "https://train-schedule-c6fb8.firebaseio.com",
        projectId: "train-schedule-c6fb8",
        storageBucket: "",
        messagingSenderId: "126498102337"
    };
    firebase.initializeApp(config);
    
     var database = firebase.database();
    

    $("#trainInfoBtn").on("click", function(event) {
        event.preventDefault(); 
    
        
        var trainName = $("#name").val().trim();
        var destination = $("#dest").val().trim();
        var frequency = $("#freq").val().trim();
        var initialTime = moment($("#initialTime").val().trim(), "hh:mm").subtract(1, "years").format("X");
            
        var currentTime = moment();
        console.log("CURRENT TIME: " +  moment(currentTime).format("hh:mm"));
    
        console.log(trainName);
        console.log(destination);
        console.log(initialTime);
        console.log(frequency);
        console.log(currentTime);
    
        var newTrain = {
    
            train: trainName,
            trainDest: destination,
            trainArrival: initialTime,
            everyMin: frequency
        };
    
    
        database.ref().push(newTrain);
    
    }); 
    
    database.ref().on("child_added", function(childSnapshot) {
    
            console.log(childSnapshot.val());
          
            var trainName = childSnapshot.val().train;
            var destination =childSnapshot.val().trainDest;
            var initialTime = childSnapshot.val().trainArrival;
            var frequency = childSnapshot.val().everyMin;
    

           
            var trainTime = moment(initialTime).format("hh:mm");
           
            var difference =  moment().diff(moment(trainTime),"minutes");
   
            var trainRemain = difference % frequency;
            console.log(trainRemain);
    
      
            var minRemain = frequency - trainRemain;
            console.log(minRemain);
    
       
            var nextArrival = moment().add(minRemain, "minutes").format('hh:mm');
            console.log(nextArrival);
    
            $("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
                 frequency + "</td><td>" + nextArrival + "</td><td>" + minRemain + "</td></tr>");
    
    });
    });
    