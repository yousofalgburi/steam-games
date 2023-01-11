import axios from 'axios'

async function getGames() {
	let gameResponse = await axios({
		url: 'https://api.steampowered.com/ISteamApps/GetAppList/v2/',
		method: 'GET',
	})

	let listOfGamesToDisplay = []

	for (let i = 0; listOfGamesToDisplay.length < 100; i++) {
		let gameID = gameResponse.data.applist.apps[i].appid

		let gameDetailResponse = await axios({
			url: `https://store.steampowered.com/api/appdetails?appids=${gameID}`,
			method: 'GET',
		})

		let gameData = gameDetailResponse.data[gameID]

		if (!(gameData?.success === false) && gameData?.data.type === 'game') {
			listOfGamesToDisplay.push(gameDetailResponse.data[gameID]?.data)
		}
	}

	console.log(listOfGamesToDisplay[0])

	return listOfGamesToDisplay as any[]
}

export default async function GamesPage() {
	let games = await getGames()

	return (
		<div>
			<h1>Games</h1>

			{games.map((game) => {
				return <Game key={game.steam_appid} game={game} />
			})}
		</div>
	)
}

function Game({ game }: any) {
	const { name, short_description, header_image } = game || {}
	return (
		<div>
			<h1>{name}</h1>

			<p>{short_description}</p>

			<img src={header_image} />
		</div>
	)
}
