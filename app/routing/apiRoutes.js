//====================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// 

var friendsData = require("../data/friends");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/friends", function (req, res) {
    res.json(friendsData);
    var othersUserScores = [];
    var allScores = [];
    var othersScores;
    var subtractScores;
    var totalDifference = 0;
    var currentUserIndex = friendsData.length - 1;
    var currentUserScores = friendsData[currentUserIndex].scores;

    console.log(currentUserScores)

    //Get other user score info
    for (i = 0; i < currentUserIndex; i++) {
      othersScores = friendsData[i].scores;
      othersUserScores.push(othersScores) 
    }
    console.log(othersUserScores)


    for (i = 0; i < othersUserScores.length; i++) {
      var compareArray = [];
      var otherUsersResults = othersUserScores[i];

      for (j = 0; j < otherUsersResults.length; j++) {
        var subtractScores = Math.abs(currentUserScores[j]- otherUsersResults[j]);
        compareArray.push(subtractScores)
        totalDifference += compareArray[j];
        console.log(compareArray)
        
      }
      console.log("total difference: " + totalDifference)
 }


  });


  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------

  app.post("/api/friends", function (req, res) {
    // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
    // It will do this by sending out the value "true" have a table
    // req.body is available since we're using the body-parser middleware


    //   tableData.push(req.body);
    //   res.json(true);
    // }
    // else {
    //   waitListData.push(req.body);
    //   res.json(false);
    // }

  });

  // ---------------------------------------------------------------------------
  // I added this below code so you could clear out the table while working with the functionality.
  // Don"t worry about it!

  app.post("/api/clear", function () {
    // Empty out the arrays of data
    //   tableData = [];
    //   waitListData = [];

    // console.log(friendsData);
  });
};
