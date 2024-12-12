const axios = require('axios'); // Import axios for HTTP requests
const jwt = require('jsonwebtoken');
const Recommendation = require('../models/Recommendation'); // Import the model
const User = require('../models/User'); // Import the User model

exports.handleRecommendation = async (req, res) => {
  try {
    const data = req.body;
    console.log("Received data: ", data);

    // Assuming the username is passed directly in the request
    const username = req.body.username;
    if (!username) return res.status(400).json({ error: "Username is required" });

    // Find user by username in the User collection
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: "User not found" });

    const userId = user._id;

    // Transform the workouts array into the desired format
    const modifiedWorkouts = {};
    data.workouts.forEach((workout) => {
      const { name, sets, reps } = workout;
      modifiedWorkouts[`${name}_sets`] = sets;
      modifiedWorkouts[`${name}_reps`] = reps;
    });

    // Prepare the final data to be saved in MongoDB
    const userData = {
      userId,
      age: data.age,
      height: data.height,
      weight: data.weight,
      goal: data.goal,
      healthIssues: data.healthIssues,
      workouts: modifiedWorkouts,
      weeksFollowing: data.weeksFollowing,
    };

    // Get model output from Python API
    const pythonResponse = await axios.post('http://127.0.0.1:5001/predict', userData);
    const modelOutput = pythonResponse.data;
    console.log("Model Output: ", modelOutput);

    // Add recommended plan to userData
    userData.recommended_plan = modelOutput;

    // Save the data to MongoDB
    const newRecommendation = new Recommendation(userData);
    await newRecommendation.save();

    console.log("Recommendation saved: ", newRecommendation);

    // Respond to the client
    res.json({
      message: "Recommendation processed and saved successfully!",
      recommendation: newRecommendation,
    });
  } catch (err) {
    console.error("Error processing recommendation:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getRecommendations = async (req, res) => {
  const { username } = req.body;
  console.log(username);
  
  try {
    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find all recommendations for the user and sort by date
    const recommendations = await Recommendation.find({ userId: user._id }).sort({ date: -1 });
    res.json(recommendations);
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


