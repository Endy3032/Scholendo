export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className="h-screen">
				<main className="flex flex-col space-y-4 p-4 pt-10 sm:pt-12 md:pt-16 lg:pt-20 items-center">
					{children}
				</main>
			</body>
		</html>
	)
}
