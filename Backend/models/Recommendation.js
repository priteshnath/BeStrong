const mongoose = require('mongoose');

const RecommendationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  age: { type: String, required: true },
  height: { type: String, required: true },
  weight: { type: String, required: true },
  goal: { type: String, required: true },
  healthIssues: [{ type: String }],
  workouts: { type: Object, required: true },
  weeksFollowing: { type: String },
  submissionDate: { type: Date, default: Date.now },
  recommended_plan: { type: Object, required: true }, // This will store modelOutput
});

module.exports = mongoose.model('Recommendation', RecommendationSchema);
