import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
	title: {
		template: "%s | CTin2225",
		default: "CTin2225",
	},
	description: "Class Hub",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={`${inter.className} min-h-screen h-screen flex flex-col bg-slate-950`}>
				{children}
			</body>
		</html>
	)
}
