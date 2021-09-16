export const tests = [
	{
		id: 0, //test id
		cards: [
			{
				n: 0, //card id
				msg: "touch the white",
				selectable: false,
				cardName: "white card"
			},
			{
				n: 1,
				msg: "touch the dot",
				selectable: true,
				cardName: "dot card"
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
				cardName: "white card"
			},
			{
				n: 1,
				msg: "touch the dot 2",
				selectable: true,
				cardName: "dot card"
			},
			{
				n: 2,
				msg: "touch small the dot",
				selectable: true,
				cardName: "small dot card"
			}
		],
		name: "touch the dot demo 2"
	},
]