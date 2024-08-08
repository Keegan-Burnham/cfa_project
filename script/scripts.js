
// function to take you to Add Funds Google Doc
function addFunds() {

    // checks if user knows credentials
    if(securityCheck()) {

        // takes user to add funds google doc
        window.open('https://docs.google.com/forms/d/1ncU4xWBl5k-_ws-xhCtN9hNVlD5S7NZ-4-VDeRoPB8o/edit?ts=66b2793d', '_blank');

    }

}

// function to take you to Subtract Funds Google Doc
function subtractFunds() {

    //checks if user knows credentials
    if (securityCheck()) {

        // takes user to subtract funds google doc
        window.open('https://docs.google.com/forms/d/1e5uzDHu-tw0Ipba9ptYfrHrJWUPr_uX96DjAkhe4eLA/edit?ts=66b272fc', '_blank');

    }

}

// function to check if a user knows credentials to make changes
function securityCheck() {

    const password = "Chicken"; // manually set password HERE!!!

    const userPassword = prompt("Enter the password to proceed:");

    if (userPassword !== password) {

        alert("Incorrect password.");
        return false;

    }

    return true;
}


async function fetchTitles() {

  const APIUrl = 'https://script.google.com/macros/s/AKfycbzemzCByJoL1U1r2gFLSjyL-VnSGmwF4TD9A-z86o06f1Z4CasV1mfyB6GyD0rY2K0Keg/exec?requestType=GetTitles'
  

  fetch(APIUrl)
    .then(response => response.text())
    .then(data => {
      const companyNames = data.split(',');

      const dropdown = document.getElementById('company-dropdown');
      dropdown.innerHTML = '';

      const defaultOption = document.createElement('option');
      defaultOption.textContent = 'Select a company';
      defaultOption.value = '';
      dropdown.appendChild(defaultOption)

      companyNames.forEach(companyName => {
        const option = document.createElement('option');
        option.textContent = companyName.trim();
        option.value = companyName.trim();
        dropdown.appendChild(option);
      });
    });
    

}


document.addEventListener('DOMContentLoaded', function() {
  // Get the dropdown element
  const dropdown = document.getElementById('company-dropdown');

  // Add event listener for the 'change' event
  dropdown.addEventListener('change', function(event) {
      // Get the selected value
      const companyTitle = event.target.value;

      // Call getCurrentTotal with the selected value
      getCurrentTotal(companyTitle);
  });

  function getCurrentTotal(companyTitle) {

    const APIUrl = `https://script.google.com/macros/s/AKfycbzemzCByJoL1U1r2gFLSjyL-VnSGmwF4TD9A-z86o06f1Z4CasV1mfyB6GyD0rY2K0Keg/exec?requestType=GetAmount&companyTitle=${encodeURIComponent(companyTitle)}`;
    
    // Fetch data from the web app
    fetch(APIUrl)
      .then(response => response.text()) // Convert the response to text
      .then(data => {
        // Parse the data as a number
        const numberValue = parseFloat(data);
        updateTotalFunds(numberValue);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
      return;
    }
    
    
    function updateTotalFunds(numberValue) {
      
      var totalDiv = document.getElementById('total')
      totalDiv.innerText = 'Total Funds: $' + numberValue.toFixed(2);
    
    }
});

document.addEventListener('DOMContentLoaded', fetchTitles)