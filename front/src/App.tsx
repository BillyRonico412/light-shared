import { useEffect, useMemo, useState } from "react"
import { ChromePicker, RGBColor } from "react-color"
import { io, Socket } from "socket.io-client"
import { ClientToServerEvents, ServerToClientEvents } from "shared"

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
	import.meta.env.VITE_SERVER_URL,
)

const App = () => {
	const [color, setColor] = useState<RGBColor>({
		r: 255,
		g: 255,
		b: 255,
		a: 1,
	})

	const colorText = useMemo(
		(): "text-white" | "text-black" =>
			color.r + color.g + color.b > 382 ? "text-black" : "text-white",
		[color],
	)

	useEffect(() => {
		socket.on("changeColor", (color) => setColor(color))
		return () => {
			socket.off("changeColor")
		}
	}, [])

	return (
		<div
			className="w-screen h-screen flex flex-col gap-y-4 justify-center items-center"
			style={{
				backgroundColor: `rgba(${color.r},${color.g},${color.b},${color.a})`,
			}}
		>
			<h1 className={`text-3xl font-bold ${colorText}`}>Light shared</h1>
			<ChromePicker
				className="w-[300px]"
				color={color}
				onChangeComplete={(color) => {
					setColor(color.rgb)
					socket.emit("changeColor", color.rgb)
				}}
			/>
		</div>
	)
}

export default App
