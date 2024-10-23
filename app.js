import express from "express";
import fetch from "node-fetch";
import morgan from "morgan";
import "dotenv/config";

const app = express();

app.use(morgan("tiny"));

const { BOOKS_URL, EVENTS_URL, PORT } = process.env;

app.get("/ping", async (req, res) => {
  const results = {};

  try {
    const booksResponse = await fetch(BOOKS_URL);
    const eventsResponse = await fetch(EVENTS_URL);

    results.books = {
      online: booksResponse.ok,
      status: booksResponse.status,
    };

    results.events = {
      online: eventsResponse.ok,
      status: eventsResponse.status,
    };

    res.status(200).json(results);
  } catch (error) {
    console.error("Error pinging backend:", error.message);
    res
      .status(500)
      .json({ message: "Error pinging backend", error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
