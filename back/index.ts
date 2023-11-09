import { RGBColor } from "react-color"
import type { ClientToServerEvents, ServerToClientEvents } from "shared"
import { Server } from "socket.io"
import dotenv from "dotenv"
import { z } from "zod"

dotenv.config()

const zodEnv = z.object({
	CLIENT_URL: z.string(),
})

const env = zodEnv.parse(process.env)

const io = new Server<ClientToServerEvents, ServerToClientEvents>({
	cors: {
		origin: env.CLIENT_URL,
	},
})

let color: RGBColor = { r: 255, g: 255, b: 255, a: 1 }

io.on("connection", (socket) => {
	console.log("New connection")
	socket.emit("changeColor", color)
	socket.on("changeColor", (newColor) => {
		color = newColor
		socket.broadcast.emit("changeColor", newColor)
	})
})

io.listen(3000)
