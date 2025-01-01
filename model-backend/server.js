// server.js
const express = require('express');
const cors = require('cors');
const { spawn } = require('child_process');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Python process
let pythonProcess = null;

function initializePythonProcess() {
  const pythonScript = path.join(__dirname, 'predict.py');
  pythonProcess = spawn('python', [pythonScript]);

  pythonProcess.stdout.on('data', (data) => {
    console.log(`Python stdout: ${data}`);
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`Python stderr: ${data}`);
  });

  pythonProcess.on('close', (code) => {
    console.log(`Python process exited with code ${code}`);
    // Restart Python process if it crashes
    if (code !== 0) {
      setTimeout(initializePythonProcess, 5000);
    }
  });
}

// API endpoint for predictions
app.post('/predict', async (req, res) => {
  try {
    const { district, commodity, variety, month } = req.body;

    // Spawn a new Python process for this prediction
    const pythonPredict = spawn('python', ['predict.py'], {
      env: { ...process.env }
    });

    let dataString = '';

    // Send input data to Python process
    pythonPredict.stdin.write(JSON.stringify(req.body));
    pythonPredict.stdin.end();

    // Collect data from Python script
    pythonPredict.stdout.on('data', (data) => {
      dataString += data.toString();
    });

    // Handle prediction result
    pythonPredict.on('close', (code) => {
      if (code !== 0) {
        return res.status(500).json({ 
          success: false, 
          error: 'Error processing prediction' 
        });
      }
      try {
        const predictions = JSON.parse(dataString);
        res.json({ success: true, predictions });
      } catch (error) {
        res.status(500).json({ 
          success: false, 
          error: 'Error parsing prediction results' 
        });
      }
    });

  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Node.js server running on port ${PORT}`);
  initializePythonProcess();
});