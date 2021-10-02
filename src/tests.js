export const tests = [
	{
		id: 0, //test id
		cards: [
			{
				n: 0, //card id
				msg: "touch the white",
				selectable: false,
				cardName: "white card",
				cardType: "imageCard"
			},
			{
				n: 1,
				msg: "touch the dot",
				selectable: true,
				cardName: "dot card",
				cardType: "imageCard"
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
				cardType: "imageCard"
			},
			{
				n: 1,
				msg: "touch the number 1",
				selectable: true,
				cardName: "dot card",
				cardType: "diceCard",
				details: {
					mode: "simple",
					n: 1
				}
			},
			{
				n: 2,
				msg: "touch the number 2",
				selectable: true,
				cardName: "2 dots card",
				cardType: "diceCard",
				details: {
					mode: "simple",
					n: 2
				}
			}
		],
		name: "touch the dot demo 2"
	},
]