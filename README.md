# hotel-room-reservation-system
📌 Overview
This project implements an optimized Hotel Room Reservation System designed to allocate rooms efficiently by minimizing the total travel time between booked rooms.
The solution adheres strictly to the business rules provided in the assessment and demonstrates structured problem-solving, optimization, and clean system design.

The application is deployed as a live web app and includes dynamic visualization of room occupancy.

🏢 Hotel Structure

Total Rooms: 97

Floors: 10

Floors 1–9: 10 rooms per floor (e.g., 101–110, 201–210)

Floor 10: 7 rooms (1001–1007)

Lift/Staircase: Located on the left side

Room Ordering: Left to right, nearest to farthest from the lift

⏱️ Travel Time Rules

Horizontal travel:

1 minute per adjacent room on the same floor

Vertical travel:

2 minutes per floor using lift/stairs

Total travel time:

Calculated between the first (closest) and last (farthest) room in a booking

📐 Data Modeling

Each room is represented with the following attributes:

Room ID

Floor number

Horizontal position (distance from lift)

Booking status

This design enables accurate and extensible travel-time calculations.

🧠 Booking Strategy

The booking engine follows a priority-based optimization approach:

1️⃣ Same Floor Priority

Attempts to allocate all requested rooms on a single floor

Evaluates all valid room combinations

Selects the combination with minimum travel time

2️⃣ Cross-Floor Optimization

Triggered if no single floor has enough rooms

Evaluates combinations across multiple floors

Chooses the globally optimal set with minimum total travel time

This ensures both business rule compliance and optimal efficiency.

⚙️ Optimization Notes

Maximum rooms per booking are limited to 5

Combination-based evaluation is feasible due to small bounded input

Search space is significantly reduced using priority constraints

✨ Features

Optimal room allocation based on travel time

Real-time visualization of hotel occupancy

Random occupancy generation for testing

Complete booking reset functionality

Display of total travel time after booking

🖥️ Tech Stack

Frontend: HTML, CSS, JavaScript

Deployment: Netlify

🔗 Live Demo

👉 https://kumari-vrishti-hotel-reservation.netlify.app

How to Run Locally
1. Download or clone the repository
2. Open index.html in any modern browser

📄 Conclusion

This project demonstrates a clear understanding of system design, optimization under constraints, and clean separation of concerns.
It reflects real-world engineering decision-making and aligns with expectations for mid-to-senior software development roles.
