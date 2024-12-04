# RealTimeEventNotifierAPI

The RealTimeEventNotifierAPI is a Node.js-based event notification system that allows for the creation and management of events, real-time notifications via WebSocket, and logs completed events to a JSON file. The system uses `cron` to send notifications 5 minutes before an event starts and ensures that overlapping events are flagged.

## Features

- **Add Events:** Create events with title, description, and start time.
- **View Upcoming Events:** Retrieve a list of all upcoming events.
- **Real-Time Notifications:** Clients connected to the WebSocket server receive notifications 5 minutes before an event starts.
- **Event Logging:** Completed events are logged to a `events.json` file for historical tracking.
- **Overlapping Event Detection:** Flags events that have the same start time.


API Endpoints
1. POST /events
Create a new event.

Request Body
json
Copy code
{
    "title": "Event Title",
    "description": "Event Description",
    "time": "2024-12-10T15:00:00Z"
}
title: The title of the event (required).
description: A short description of the event (required).
time: The time of the event in ISO 8601 format (required).
Response
json
Copy code
{
    "message": "Event created successfully",
    "event": {
        "title": "Event Title",
        "description": "Event Description",
        "time": "2024-12-10T15:00:00Z",
        "notified": false,
        "overlaps": false
    }
}
2. GET /events
Get a list of all upcoming events.

Response
json
Copy code
[
    {
        "title": "Event Title",
        "description": "Event Description",
        "time": "2024-12-10T15:00:00Z",
        "notified": false,
        "overlaps": false
    }
]
WebSocket Server
The WebSocket server is running on port 8090. Once connected, clients will receive notifications 5 minutes before an event begins.

WebSocket Messages
On connection: Connected to WebSocket server
Before Event Starts: Event "Event Title" is about to start in 5 minutes. This event overlaps with another event. (if applicable).
Cron Jobs
The server runs a cron job every minute to check for upcoming events. If an event is about to start in 5 minutes, it sends a notification to all connected clients via WebSocket. Completed events are logged in a events.json file.

Event Logging
Completed events are logged in a file called events.json. Each log entry includes:

timestamp: The date and time the event was completed.
title: The title of the event.
description: The description of the event.
Example of the events.json log file:

json
Copy code
[
    {
        "timestamp": "2024-12-10T15:05:00Z",
        "title": "Event Title",
        "description": "Event Description"
    }
]
Technologies Used
Node.js: Backend runtime environment.
Express.js: Web framework for Node.js.
WebSocket: Real-time communication between clients and server.
node-cron: Scheduling cron jobs.
fs (File System): Reading and writing event logs to events.json.
