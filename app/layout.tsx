import Link from 'next/link'
import './global.css'

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html>
			<body>
				<main>
					<nav>
						<Link href='/'>Home</Link>
						<Link href='/games'>Games</Link>
					</nav>

					{children}
				</main>
			</body>
		</html>
	)
}
