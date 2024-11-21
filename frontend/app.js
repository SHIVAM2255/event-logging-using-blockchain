// Base URL for the API
const API_URL = 'https://event-logging-using-blockchain.onrender.com/api/events';

// Function to handle the POST request to create a new event
async function createEvent(eventData) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData),
    });

    if (!response.ok) {
      throw new Error('Failed to create event');
    }

    const data = await response.json();
    console.log('Event created:', data);
    alert('Event created successfully!');
  } catch (error) {
    console.error('Error creating event:', error);
    alert('Error creating event');
  }
}

// Function to handle the GET request to fetch events
async function fetchEvents() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch events');
    }

    const events = await response.json();
    displayEvents(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    alert('Error fetching events');
  }
}

// Function to display events in the list
function displayEvents(events) {
  const eventList = document.getElementById('eventList');
  eventList.innerHTML = ''; // Clear the list before rendering

  if (events.length === 0) {
    eventList.innerHTML = '<li>No events found</li>';
  } else {
    events.forEach(event => {
      const li = document.createElement('li');
      li.innerHTML = `
        <strong>Event Type:</strong> ${event.eventType} <br>
        <strong>Source App ID:</strong> ${event.sourceAppId} <br>
        <strong>Data Payload:</strong> ${JSON.stringify(event.dataPayload)} <br>
        <strong>Timestamp:</strong> ${new Date(event.timestamp).toLocaleString()} <br>
        <strong>Hash:</strong> ${event.hash} <br>
        <strong>Previous Hash:</strong> ${event.prevHash} <br><br>
      `;
      eventList.appendChild(li);
    });
  }
}

// Event listener for form submission (POST)
document.getElementById('eventForm').addEventListener('submit', function (e) {
  e.preventDefault(); // Prevent form submission and page reload

  const eventType = document.getElementById('eventType').value;
  const sourceAppId = document.getElementById('sourceAppId').value;
  const dataPayload = document.getElementById('dataPayload').value;

  try {
    const eventData = {
      eventType,
      sourceAppId,
      dataPayload: JSON.parse(dataPayload), // Parse the payload as JSON
    };

    createEvent(eventData); // Call the function to POST event data
  } catch (error) {
    alert('Invalid JSON in data payload');
  }
});

// Event listener for fetching events (GET)
document.getElementById('fetchEventsBtn').addEventListener('click', function () {
  fetchEvents(); // Call the function to GET events from the API
});
