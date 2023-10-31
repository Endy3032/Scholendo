export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className="h-screen">
				<main className="flex flex-col space-y-4 h-screen justify-center items-center">
					{children}
				</main>
			</body>
		</html>
	)
}
