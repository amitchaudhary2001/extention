chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.url) {
    fetch('http://localhost:5000/receive_url', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: message.url }),
    })
    .then(response => response.json())
    .then(data => {
      console.log(data.message); // Log the response message in the terminal
      if (data.result) {
        // Send the received result back to the popup script
        chrome.runtime.sendMessage({ result: data.result });
      }
    })
    .catch(error => {
      console.error(error);
    });
  }
});
