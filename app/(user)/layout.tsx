export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className="h-screen">
				<main>{children}</main>
			</body>
		</html>
	)
}
