export const tests = [
	{
		id: 0, //test id
		cards: [
			{
				n: 0, //card id
				msg: "touch the white",
				selectable: false,
				cardName: "white card",
				cardType: "imageCard",
				soundId: 0
			},
			{
				n: 1,
				msg: "touch the dot",
				selectable: true,
				cardName: "dot card",
				cardType: "imageCard",
				soundId: 1
			}
		],
		name: "touch the dot demo"
	},
	{
		id: 1,
		cards: [
			{
				n: 0,
				msg: "touch the white",
				selectable: false,
				cardName: "white card",
				cardType: "imageCard",
				soundId: 0
			},
			{
				n: 2,
				msg: "touch the number 1",
				selectable: true,
				cardName: "dot card",
				cardType: "diceCard",
				details: {
					mode: "simple",
					n: 1
				},
				soundId: 1
			},
			{
				n: 3,
				msg: "touch the number 2",
				selectable: true,
				cardName: "2 dots card",
				cardType: "diceCard",
				details: {
					mode: "simple",
					n: 2
				},
				soundId: 1
			}
		],
		name: "touch the dot demo 2"
	},
]