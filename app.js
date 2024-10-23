import fetch from "node-fetch";
import "dotenv/config";

const { BOOKS_URL, EVENTS_URL } = process.env;
async function pingBackend() {
  try {
    const booksResponse = await fetch(BOOKS_URL);
    const eventsResponse = await fetch(EVENTS_URL);

    if (booksResponse.ok) {
      console.log("Books is online.");
    } else {
      console.error("Books returned an error:", booksResponse.status);
    }

    if (eventsResponse.ok) {
      console.log("Events is online.");
    } else {
      console.error("Events returned an error:", eventsResponse.status);
    }
  } catch (error) {
    console.error("Error pinging backend:", error.message);
  }
}

setInterval(pingBackend, 30 * 60000);

pingBackend();
