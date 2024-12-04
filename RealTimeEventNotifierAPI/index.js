const express = require("express");
const WebSocket = require("ws");
const cron = require("node-cron");
const fs = require("fs").promises;
const app = express();

const PORT = 3005;
const WS_PORT = 8090;

app.use(express.json());

// WebSocket Server
const wss = new WebSocket.Server({ port: WS_PORT });
let clients = [];

wss.on("connection", (ws) => {
    console.log("Client connected");
    clients.push(ws);
    ws.send("Connected to WebSocket server");

    ws.on("close", () => {
        clients = clients.filter(client => client !== ws);
    });
});

// Events Array
let events = [];

// POST /events - Add Event
app.post("/events", (req, res) => {
    const { title, description, time } = req.body;

    // Validation
    const eventTime = new Date(time);
    if (!title || !description || !time || eventTime <= new Date()) {
        return res.status(400).json({ message: "Invalid input or time in the past." });
    }

    // Check for overlapping events
    const overlaps = events.some(
        (event) => new Date(event.time).getTime() === eventTime.getTime()
    );

    const newEvent = {
        title,
        description,
        time,
        notified: false,
        overlaps,
    };

    events.push(newEvent);
    res.status(201).json({ message: "Event created successfully", event: newEvent });
});

// GET /events - Get All Upcoming Events
app.get("/events", (req, res) => {
    const upcomingEvents = events.filter((event) => new Date(event.time) > new Date());
    res.status(200).json(upcomingEvents);
});

// Cron Job - Notify 5 Minutes Before Event
cron.schedule("* * * * *", async () => {
    const now = new Date();

    for (let index = 0; index < events.length; index++) {
        const event = events[index];
        const eventTime = new Date(event.time);
        const timeDiff = (eventTime - now) / 1000 / 60;

        // Notify 5 minutes before
        if (timeDiff <= 5 && timeDiff > 0 && !event.notified) {
            clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(
                        `Event "${event.title}" is about to start in 5 minutes. ${
                            event.overlaps ? "This event overlaps with another event." : ""
                        }`
                    );
                }
            });
            event.notified = true;
        }

        // Log completed events
        if (timeDiff <= 0) {
            const completedEvent = events.splice(index, 1)[0];
            const logEntry = {
                timestamp: new Date().toISOString(),
                title: completedEvent.title,
                description: completedEvent.description,
            };

            try {
                const data = await fs.readFile("events.json", "utf-8");
                const logs = data ? JSON.parse(data) : [];
                logs.push(logEntry);
                await fs.writeFile("events.json", JSON.stringify(logs, null, 2));
                console.log("Event logged to events.json");
            } catch (err) {
                console.error("Error reading/writing events.json:", err);
            }
        }
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`API Server running on http://localhost:${PORT}`);
});
