Carsly 

A personalized vehicle maintenance reminder app that predicts when a car needs servicing based on manual input — mileage, driving habits, and logged service history — without requiring any OBD hardware.

Built as part of an MSc dissertation investigating whether personalized maintenance reminders improve perceived usefulness and behavioral intent compared to fixed, one-size-fits-all reminders.


**Features**
Register multiple cars, each with its own mileage, journey type (city / mixed / highway), and estimated weekly mileage
Personalized maintenance gauges for 9 common service items (oil change, tire rotation, brake pads, battery, filters, coolant, wiper blades, timing belt, spark plugs) — colour-coded on-track / due-soon / overdue
Log completed services, which become the new baseline for future predictions on that specific item
Fuel & bill tracking, scoped per car
Budget tracking with monthly/annual limits and spend-vs-budget progress
Editable car details after registration
Persists locally via localStorage — no backend required


** How the personalization works**

Each maintenance item has a baseline interval (e.g. an oil change every 5,000 miles / 6 months). That baseline is adjusted using:

Journey type — city/stop-start driving shortens the interval, highway driving extends it
Weekly mileage — used to project forward from the last logged service (or registration, if nothing's been logged yet) toward an estimated due date
Whichever comes first — mileage or time — determines the status, mirroring how real manufacturer service intervals work ("5,000 miles or 6 months, whichever comes first")

** Tech stack**
React (Create React App)
Plain CSS (no framework)
localStorage for persistence — no backend, no database
Jest for unit testing the core calculation logic

Academic context

This project was built as the technical deliverable for an MSc dissertation comparing personalized vs. non-personalized maintenance reminder systems. See the accompanying report for the full research question, methodology, user study design, and results.
