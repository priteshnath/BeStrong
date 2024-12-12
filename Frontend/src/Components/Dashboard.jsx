import React, { useEffect, useState } from 'react';
import HeaderSection from './HeaderSection';
import FooterSection from './FooterSection';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [expandedWeek, setExpandedWeek] = useState(null);
  const [username, setUsername] = useState(null);
  const [workoutHistory, setWorkoutHistory] = useState([]); // Ensure it's initialized as an empty array
  const [currentExercises, setCurrentExercises] = useState([]);

  const toggleWeek = (week) => {
    setExpandedWeek(expandedWeek === week ? null : week);
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.warn('No token found in localStorage');
        return;
      }

      try {
        // Decode username from JWT token
        const [, payload] = token.split('.');
        const decodedPayload = JSON.parse(
          atob(payload.replace(/-/g, '+').replace(/_/g, '/'))
        );
        const user = decodedPayload.username;
        setUsername(user);

        // Fetch recommendations from backend
        const response = await fetch(`http://localhost:5000/api/recommendations`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username: user }),
        });

        const data = await response.json();

        if (response.ok) {
          // Extract the latest week (last item in the sorted array)
          const latestWeek = data[data.length - 1];

          // Extract the rest of the weeks (all except the last item)
          const restOfTheData = data.slice(0, -1);
          console.log(restOfTheData);


          // Update the state
          setCurrentExercises(latestWeek ? latestWeek.exercises : []);
          setWorkoutHistory(restOfTheData || []); // Fallback to empty array if undefined
        } else {
          console.error('Failed to fetch recommendations:', data.message);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <HeaderSection />
      <div className="pt-20 p-8 bg-black text-white min-h-[91vh]">
        {/* Welcome Message */}
        <h1 className="text-4xl font-bold mb-6">Welcome, {username || 'Guest'}!</h1>

        {/* Dashboard Grid */}
        <div className="flex gap-6">
          {/* Workout History Column (30% width) */}
          <div className="w-[40%] bg-gray-800 p-6 rounded-lg shadow-lg space-y-4">
            <h2 className="text-2xl font-bold mb-4">Workout History</h2>
            {workoutHistory && workoutHistory.length > 0 ? (
              workoutHistory.map((week, index) => {
                // Use the submissionDate field for the date
                const formattedDate = week.submissionDate
                  ? new Date(week.submissionDate).toLocaleDateString()
                  : "N/A"; // Default to "N/A" if submissionDate is missing or invalid

                return (
                  <div key={index} className="border-b border-gray-700">
                    {/* Accordion Header */}
                    <button
                      className="w-full text-left py-2 text-lime-500 font-semibold hover:text-lime-400 transition-colors flex justify-between items-center"
                      onClick={() => toggleWeek(index)} // Toggle based on index
                    >
                      <span>Week of {formattedDate}</span>
                      <span>{expandedWeek === index ? '-' : '+'}</span>
                    </button>

                    {/* Accordion Body */}
                    {expandedWeek === index && (
                      <div className="ml-4 mt-2 text-gray-300">

                        {/* Display the Exercise Plan */}
                        <div className="mt-4">
                          <h3 className="font-semibold text-xl">Exercise Plan:</h3>
                          {week.recommended_plan ? (
                            <div className="space-y-4">
                            {Object.entries(week.recommended_plan).map(([exercise, value], i) => {
                              console.log(value); // To check how the values are being logged
                          
                              // Split exercise name (e.g. bicep_curls_reps) to a readable format
                              const exerciseName = exercise.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
                              
                              // Determine reps and sets from the value
                              // If value is just a number (reps), then the corresponding sets will also be derived from the same structure
                              const reps = typeof value === 'number' ? value : value.reps || "N/A";  // Default to "N/A" if reps are missing
                              const sets = typeof value === 'number' ? "N/A" : value.sets || "N/A"; // Default to "N/A" if sets are missing
                          
                              return (
                                <div key={i} className="flex justify-between">
                                  <span className="font-medium">{exerciseName}</span>
                                  <span>{reps} Reps, {sets} Sets</span>
                                </div>
                              );
                            })}
                          </div>
                          

                          ) : (
                            <p>No exercise plan available for this week.</p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="flex justify-center items-center text-gray-300">
                <p className="font-bold text-2xl m-10">No Workout History!!!</p>
              </div>
            )}
          </div>



          {/* Current Exercise Column (70% width) */}
          <div className="w-2/3 bg-gray-800 p-6 rounded-lg shadow-lg space-y-4">
            <h2 className="text-2xl font-bold mb-4">Current Week Exercises</h2>

            {currentExercises && currentExercises.length > 0 ? (
              currentExercises.map((exercise, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id={`exercise-${index}`}
                    className="w-5 h-5 text-lime-500 bg-gray-900 border-none rounded focus:ring-0"
                  />
                  <label
                    htmlFor={`exercise-${index}`}
                    className="text-lg font-medium text-gray-300"
                  >
                    {exercise}
                  </label>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center text-gray-300 space-y-4">
                <img
                  src="/Photos/Funny_Panda.jpg"
                  alt="No current exercises"
                  className="w-[20vw] h-auto"
                  loading="eager"
                />
                <p className="font-bold text-xl">No Current Exercises</p>
              </div>
            )}
          </div>
        </div>

        {/* Get Started Button */}
        <div className="flex justify-center mt-8">
          <Link
            to="/getstarted"
            className="bg-lime-500 text-black py-3 px-6 rounded-lg font-semibold hover:bg-lime-400 transition-colors"
          >
            Get Started
          </Link>
        </div>
      </div>
      <FooterSection />
    </>
  );
};

export default Dashboard;
