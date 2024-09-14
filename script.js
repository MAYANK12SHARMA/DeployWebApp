document.addEventListener("DOMContentLoaded", function () {
  fetch("List_data.csv")
    .then((response) => response.text())
    .then((data) => {
      const rows = data.split("\n").slice(1, 11); // Skip header and get the first 10 rows
      const tableBody = document.querySelector("#studentTable tbody");

      rows.forEach((row) => {
        // Use a more advanced regular expression to handle quoted fields with commas
        const columnsname = row.match(/[^,\s]+(?:\s[^,\s]+)*(?=\s*,|\s*$)/g);
        console.log(columnsname[1]);
        const columns = row.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
        const tr = document.createElement("tr");

        if (columns && columns.length > 10) {
          // Extract and clean the required columns
          const selectedColumns = [
            columns[0].replace(/(^"|"$)/g, ""), // Rank
            columnsname[1].replace(/(^"|"$)/g, ""), // User Name
            columns[6].replace(/(^"|"$)/g, ""), // Milestone Earned
            columns[7].replace(/(^"|"$)/g, ""), // # of Skill Badges Completed
            columns[8].replace(/(^"|"$)/g, ""), // # of Arcade Games Completed
            columns[9].replace(/(^"|"$)/g, ""), // # of Trivia Games Completed
            columns[10].replace(/(^"|"$)/g, ""), // Total
          ];

          selectedColumns.forEach((column) => {
            const td = document.createElement("td");
            td.textContent = column.trim();
            tr.appendChild(td);
          });

          tableBody.appendChild(tr);
        }
      });
    })
    .catch((error) => console.error("Error reading CSV:", error));
});
function getDetails() {
  const profileID = document.getElementById("profileID").value;
  const resultDiv = document.getElementById("results");
  const content = document.getElementById("content");

  fetch("List_data.csv")
    .then((response) => response.text())
    .then((data) => {
      const rows = data.split("\n").slice(1); // Ignore the header row
      let found = false;

      rows.forEach((row) => {
        // Split the row by comma and trim spaces
        const columns = row.match(/[^,\s]+(?:\s[^,\s]+)*/g);

        if (columns && columns[3] === profileID) {
          content.innerHTML = `<p class="mayank"> Arcade Profile Summary of ${columns[1]}</p>`;
          resultDiv.innerHTML = `
                      <table class="summary_data">
                        <tr>
                          <th>User Rank</th>
                          <td>${columns[0]}</td>
                        </tr>
                        <tr>
                          <th>User Name</th>
                          <td>${columns[1]}</td>
                        </tr>
                        <tr>
                          <th>User Email</th>
                          <td>${columns[2]}</td>
                        </tr>
                        <tr>
                          <th>Profile URL Status</th>
                          <td>${columns[4]}</td>
                        </tr>
                        <tr>
                          <th>Access Code Redemption Status</th>
                          <td>${columns[5]}</td>
                        </tr>
                        <tr>
                          <th>Milestone Earned</th>
                          <td>${columns[6]}</td>
                        </tr>
                        <tr>
                          <th># of Skill Badges Completed</th>
                          <td>${columns[7]}</td>
                        </tr>
                        <tr>
                          <th># of Arcade Games Completed</th>
                          <td>${columns[8]}</td>
                        </tr>
                        <tr>
                          <th># of Arcade Trivia Completed</th>
                          <td>${columns[9]}</td>
                        </tr>
                        <tr>
                          <th>Total Completed</th>
                          <td>${columns[10]}</td>
                        </tr>
                      </table>
                    
                  
              `;
          found = true;
        }
      });

      if (!found) {
        resultDiv.innerHTML = `<p>No details found for Profile ID: ${profileID}</p>`;
      }
    })
    .catch((error) => {
      console.error("Error fetching or parsing the CSV file:", error);
      resultDiv.innerHTML = `<p>Error retrieving data. Please try again later.</p>`;
    });
}
