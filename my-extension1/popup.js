// document.addEventListener("DOMContentLoaded", function () {
//   document.getElementById("sendUrlButton").addEventListener("click", function () {
//     chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//       const url = tabs[0].url;
//       chrome.runtime.sendMessage({ url: url });
//     });
//   });

//   // Listen for messages from the background script
//   chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
//     if (message.result) {
//       // Display the received result in the extension popup
//       const resultDisplay = document.getElementById('resultDisplay');
//       console.log(message.result.safe_percentage);
//       resultDisplay.textContent = `Result from a.py: ${message.result.safe_percentage}`;
//     }
//   });
// });



document.addEventListener("DOMContentLoaded", function () {
  var t = 0;
  var jsonData ;
  var blockButtons = [];
  console.log(t);
  function sendUrl() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const url = tabs[0].url;
      chrome.runtime.sendMessage({ url: url });
    });
  }
  sendUrl();

  function progress(data,id) {
    for (var key in data) {

    }
    var safePercentage = data[key];

    // Get the progress container element
    var progressContainer = document.createElement('div');
    progressContainer.className = 'progress-container';
    progressContainer.style.width = '530px';
    // Get the progress bar element
    var progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';

    // Set the width and background color based on the safe percentage
    progressBar.style.width = safePercentage + '%';
    progressBar.style.backgroundColor = safePercentage > 50 ? 'green' : 'red';

    // Set the percentage text
    progressBar.textContent = safePercentage + '%';

    // Append the progress bar to the progress container
    progressContainer.appendChild(progressBar);

    // Append the progress container to the body
    // document.body.appendChild(progressContainer);
    var safePercentageBlock = document.getElementById(id);
    safePercentageBlock.appendChild(progressContainer);
}


  document.getElementById("button0").addEventListener("click", function () {
    var contentBox = document.getElementById("contentBox");
    contentBox.style.display = 'block';
    var container = document.getElementById("container");
    container.style.display = 'none';
    var button1div = document.getElementById("button1div");
    button1div.style.display = 'block';
    // progress(data,id)
    
    console.log(t);
    
    
    // contentBox.innerHTML ="<pre>"+message.result+"</pre>";
    contentBox.innerHTML = '<p>This is the initial content.</p><button id="sendUrlButton">Send Current URL</button><p id="resultDisplay"></p>';
    document.getElementById("sendUrlButton").addEventListener("click", sendUrl);
  });
  // Access the iframe
  // document.getElementById("button1").addEventListener("click", function () {
  //   console.log(t);



  //   var contentBox = document.getElementById("contentBox");
  //   contentBox.style.display = 'none'
  //   var container = document.getElementById("container");
  //   container.style.display = 'none'
  //   var button1div = document.getElementById("button1div");
  //   button1div.style.display = 'block'




  //   fetch('data.json')
  //     .then(response => response.json())
  //     .then(data => {
  //       // contentBox.innerHTML = JSON.stringify(data, null, 2);
  //       button1div.innerHTML = "<p>Name: " + data.name + "</p>";
  //     })
  //     .catch(error => {
  //       console.error('Error loading JSON file:', error);
  //     });
  // });






// important 

  // document.getElementById("sendUrlButton").addEventListener("click", function () {
  //   chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  //     const url = tabs[0].url;
  //     chrome.runtime.sendMessage({ url: url });
  //   });
  // });




  // Function to send URL
function sendUrl() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const url = tabs[0].url;
    chrome.runtime.sendMessage({ url: url });
  });
}
function sendtextUrl() {
  if(t==2)
  {
    jsonData = {};
    blockButtons = []
    t=0;
  }
  const urlInput = document.getElementById("urlInput");
  const url = urlInput.value.trim();

  if (url) {
    chrome.runtime.sendMessage({ url: url });
  } else {
    alert("Please enter a valid URL.");
  }
}
document.getElementById("sendtextUrlButton").addEventListener("click", sendtextUrl);
// Event listener for the button click
document.getElementById("sendUrlButton").addEventListener("click", sendUrl);

// Event listener for the extension installation or update
chrome.runtime.onInstalled.addListener(function () {
  // Send URL on installation or update
  sendUrl();
});

// Event listener for page reload
window.addEventListener("beforeunload", function () {
  // Send URL on page reload
  sendUrl();
});


  
  





  // contentBox.innerHTML = "<p>Content for Button 2 has been displayed.</p>";
  var safe_percentage;
  // Listen for messages from the background script
  chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.result) {
      // Display the received result in the extension popup
      const resultDisplay = document.getElementById('resultDisplay');
      console.log(message.result.safe_percentage);
      resultDisplay.textContent = `Result from a.py: ${message.result.safe_percentage}`;
      safe_percentage = message.result.safe_percentage;
      progress({'safe_percentage':safe_percentage},'resultDisplay')
      console.log('safe_percentage')
      console.log(safe_percentage)
      jsonData = message.result;
      // contentBox.innerHTML = `Result from a.py: ${message.result.safe_percentage}`;


    }



     
    
    document.getElementById("button2").addEventListener("click", function () {
      console.log(t);
      // t=2;
      var container = document.getElementById("container");
      container.style.display = 'block'
      var button1div = document.getElementById("button1div");
      button1div.style.display = 'none'
      var contentBox = document.getElementById("contentBox");
      contentBox.style.display = 'none';
      // contentBox.innerHTML ="<pre>"+message.result+"</pre>";
      // contentBox.innerHTML = "<pre>" + JSON.stringify(message.result, null, 2) + "</pre>";
      // contentBox.innerHTML=

      // var jsonData = message.result;

      console.log("jsonData");
      console.log(jsonData);











      function progress(data,id) {
        for (var key in data) {

        }
        var safePercentage = data[key];

        // Get the progress container element
        var progressContainer = document.createElement('div');
        progressContainer.className = 'progress-container';
        progressContainer.style.width = '530px';
        // Get the progress bar element
        var progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';

        // Set the width and background color based on the safe percentage
        progressBar.style.width = safePercentage + '%';
        progressBar.style.backgroundColor = safePercentage > 50 ? 'green' : 'red';

        // Set the percentage text
        progressBar.textContent = safePercentage + '%';

        // Append the progress bar to the progress container
        progressContainer.appendChild(progressBar);

        // Append the progress container to the body
        // document.body.appendChild(progressContainer);
        var safePercentageBlock = document.getElementById(id);
        safePercentageBlock.appendChild(progressContainer);
    }

    



      for (var key in jsonData.last_analysis_results) {
    if (jsonData.last_analysis_results.hasOwnProperty(key)) {
        // Replace values based on conditions
        switch (jsonData.last_analysis_results[key]) {
            case 'clean':
                jsonData.last_analysis_results[key] = '\u2713---clean'; // Check mark in green
                break;
            case 'unrated':
                jsonData.last_analysis_results[key] = '\u2753---unrated'; // Question mark in black
                break;
            case 'suspicious':
                jsonData.last_analysis_results[key] = '\u2717---suspicious'; // Cross mark in red
                break;
            // Add more cases if needed for other values
        }
    }
}



      function toggleBlockVisibility(blockId) {
        var allBlocks = document.querySelectorAll('.block');
        allBlocks.forEach(function (block) {
            if (block.id === blockId) {
                block.style.display = block.style.display === 'none' || block.style.display === '' ? 'block' : 'none';
            } else {
                block.style.display = 'none';
            }
        });
        var allButtons = document.querySelectorAll('button');
        allButtons.forEach(function (btn) {
            btn.classList.remove("clickedButton");
        });

        // Add "clickedButton" class to the clicked button
        button.classList.add("clickedButton");
    }



      // Function to create a table from JSON data
      function createTable(data, containerId,) {
        if (containerId == "safePercentageBlock") {
            progress(data,containerId)

        }
        var container = document.getElementById(containerId);
        var table = document.createElement('table');
        var headingElement = document.createElement('h2');
        headingElement.textContent = containerId;
        container.appendChild(headingElement);
        // Create table body
        for (var key in data) {
            var row = table.insertRow();
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);

            cell1.textContent = key;
            if (typeof data[key] =='object') {
                cell2.textContent = JSON.stringify(data[key], null, 2);
            } else {
                cell2.textContent = data[key];
            }



        }


        container.appendChild(table);
    }


      function createVerticalTable(data, containerId) {
        var container = document.getElementById(containerId);
        var table = document.createElement('table');
        var headingElement = document.createElement('h2');
        headingElement.textContent = containerId;
        container.appendChild(headingElement);

        // Create table body
        for (var i = 0; i < data.length; i++) {
          for (var key in data[i]) {
            var row = table.insertRow();
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);

            cell1.textContent = key;
            cell2.textContent = data[i][key];
          }
        }

        container.appendChild(table);
      }


      // // Call the function with the provided JSON data for each block
      // createTable(jsonData.categories, 'categoriesBlock');
      // createVerticalTable(jsonData.crowdsourced_context, 'crowdsourcedContextBlock');
      // createTable(jsonData.last_analysis_results, 'lastAnalysisResultsBlock');
      // createTable({ 'last_final_url': jsonData.last_final_url }, 'lastFinalUrlBlock');
      // createTable({ 'safe_percentage': jsonData.safe_percentage }, 'safePercentageBlock');
      if (t == 0) {
        t = 2;
        
        for (var key in jsonData) {
          switch (key) {
            case 'categories':
              createTable(jsonData[key], 'categoriesBlock');
              blockButtons.push('categoriesBlock');
              break;
            case 'crowdsourced_context':
              createVerticalTable(jsonData[key], 'crowdsourcedContextBlock');
              blockButtons.push('crowdsourcedContextBlock');
              break;
            case 'last_analysis_results':
              createTable(jsonData[key], 'lastAnalysisResultsBlock');
              blockButtons.push('lastAnalysisResultsBlock');
              break;
            case 'last_final_url':
              createTable({ 'last_final_url': jsonData[key] }, 'lastFinalUrlBlock');
              blockButtons.push('lastFinalUrlBlock');
              break;
            case 'safe_percentage':
              createTable({ 'safe_percentage': jsonData[key] }, 'safePercentageBlock');
              blockButtons.push('safePercentageBlock');
              break;
              
            case 'prediction':
              createTable({ 'prediction': jsonData[key] }, 'prediction');
              blockButtons.push('prediction');
              break;
            // Add cases for additional blocks...
          }
        }

        // Create buttons for each block
        // var blockButtons = ['categoriesBlock', 'crowdsourcedContextBlock', 'lastAnalysisResultsBlock', 'lastFinalUrlBlock', 'safePercentageBlock'];
        // var blockButtons = ['categoriesBlock', 'lastAnalysisResultsBlock', 'lastFinalUrlBlock', 'safePercentageBlock'];
        blockButtons.forEach(function (blockId) {
          var button = document.createElement('button');
          button.textContent = 'Toggle ' + blockId;
          button.addEventListener('click', function () {
            toggleBlockVisibility(blockId);
            button.classList.toggle("clickedButton"); // Toggle the class
          });

          var existingDiv = document.getElementById("existingDiv");
          existingDiv.appendChild(button);
        });

      }








    });






  });



});
