document.addEventListener('DOMContentLoaded', () => {
    // Use the correct Google Sheets API URL with your Spreadsheet ID
    const spreadsheetId = '2PACX-1vRsmYA-NbzJwdZzPVH5FwUSK-zKEJ0GKijpMBJs3DSA_w0EiO0x_WVIvQvaUidl6ax3xWyPAtZLdtVi'; // Your actual Spreadsheet ID
    const sheetUrl = `https://spreadsheets.google.com/feeds/list/${spreadsheetId}/od6/public/values?alt=json`;
  
    // Fetch data from Google Sheets
    fetch(sheetUrl)
      .then(response => response.json())  // Convert the response to JSON
      .then(data => {
        const rows = data.feed.entry;  // Extract rows from the JSON response
        const tableBody = document.getElementById('attendee-list');  // Table body to insert data into
        let yesCount = 0;
        let noCount = 0;
        let cakeCount = 0;
        let snacksCount = 0;
        let fruitCount = 0;
  
        // Clear the current table content before adding new data
        tableBody.innerHTML = '';
  
        // Loop through each row of the data and append it to the table
        rows.forEach(row => {
          const name = row.gsx$name.$t;
          const kindergarten = row.gsx$kindergarten.$t;
          const attendance = row.gsx$attendance.$t;
          const contribution = row.gsx$contribution.$t;
          const details = row.gsx$details.$t;
  
          // Append the row to the table
          const rowElement = document.createElement('tr');
          rowElement.innerHTML = `
            <td>${name}</td>
            <td>${kindergarten}</td>
            <td>${attendance}</td>
            <td>${contribution} ${details}</td>
          `;
          tableBody.appendChild(rowElement);
  
          // Count the attendance
          if (attendance === 'Ja') {
            yesCount++;
          } else {
            noCount++;
          }
  
          // Count contributions
          if (contribution === 'Kake' && cakeCount < 4) {
            cakeCount++;
          } else if (contribution === 'Snacks' && snacksCount < 4) {
            snacksCount++;
          } else if (contribution === 'Fruktsalat/Fruktfat' && fruitCount < 3) {
            fruitCount++;
          }
        });
  
        // Update the summary counts dynamically
        document.getElementById('yes-count').textContent = yesCount;
        document.getElementById('no-count').textContent = noCount;
        document.getElementById('contribution-count').textContent = cakeCount + snacksCount + fruitCount;
        document.getElementById('cake-count').textContent = cakeCount;
        document.getElementById('snacks-count').textContent = snacksCount;
        document.getElementById('fruit-count').textContent = fruitCount;
      })
      .catch(error => {
        console.error('Error fetching data from Google Sheets:', error);
      });
  });