import { RGBColor } from "react-color"

export interface ServerToClientEvents {
	changeColor: (color: RGBColor) => void
}

export interface ClientToServerEvents {
	changeColor: (color: RGBColor) => void
}
