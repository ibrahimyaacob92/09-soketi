import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import Pusher from "pusher";

const app = express();
dotenv.config();
app.use(express.json());

app.use(cors());
const pusher = new Pusher({
	appId: "app-id",
	key: "app-key",
	secret: "app-secret",
	// cluster: "ap1",
	useTLS: false,

	host: "127.0.0.1",
	port: "6001",
});

app.get("/", (req, res) => {
	res.send("hello world");
});

pusher.trigger("my-channel", "my-event", {
	message: "hello world",
});

app.post("/message", async (req, res) => {
	const payload = req.body;
	console.log({ payload });
	const triggerResult = await pusher.trigger("chat", "message", payload);
	console.log({ triggerResult });
	res.send(payload);
});

app.listen(4000, () => {
	console.log("This app listening to http://localhost:4000");
});
