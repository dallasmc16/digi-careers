const express = require('express');
const fs = require('fs');
const app = express();

// Let's say you're using EJS templates...
app.set('view engine', 'ejs');

// Read the JSON file once and store it in memory
let jobData = [];
fs.readFile('output.json', 'utf8', (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }
  jobData = JSON.parse(data);

  // Dynamic route for jobs
  app.get('/jobs/:jobInternalUrl', (req, res) => {
    // req.params.jobInternalUrl contains the value from the URL
    const externalUrl = req.params.jobInternalUrl;
    const job = jobData.find(job => job.jobInternal_url === externalUrl);
    if (!job) {
      return res.status(404).send('Job not found');
    }
    // Render a view (EJS template) and pass the job data to it
    res.render('job-detail', { jobBusiness: jobBusiness });
  });
});

// Root route handler
app.get('/', (req, res) => {
  // Handle the root route (e.g., render an index page or redirect)
  // For now, let's send a simple message:
  res.send('Welcome to the job portal!');
});

app.listen(5500, () => {
  console.log(`Express is running on port 5500`);
});
