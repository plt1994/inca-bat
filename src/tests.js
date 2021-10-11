export const tests = [
	{
		id: 0,
		cards: [
			{
				cardId: 0,
				msg: "touch the white",
				selectable: false,
				soundSrc: null
			},
			{
				cardId: 1,
				msg: "touch the dot",
				selectable: true,
				soundSrc: "sounds/cards/1.mp3"
			}
		],
		name: "touch the dot demo",
		tags: ["Global"]
	},
	{
		id: 1,
		cards: [
			{
				cardId: 0,
				msg: "touch the white",
				selectable: false,
				soundSrc: null
			},
			{
				cardId: 2,
				msg: "touch the number 1",
				selectable: true,
				soundSrc: "sounds/cards/1.mp3"
			},
			{
				cardId: 3,
				msg: "touch the number 2",
				selectable: true,
				soundSrc: "sounds/cards/2.mp3"
			}
		],
		name: "touch the dot demo 2",
		tags: ["Global"]
	},
]