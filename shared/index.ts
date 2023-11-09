export type MyRGBColor = { r: number; g: number; b: number; a?: number }

export interface ServerToClientEvents {
	changeColor: (color: MyRGBColor) => void
}

export interface ClientToServerEvents {
	changeColor: (color: MyRGBColor) => void
}
