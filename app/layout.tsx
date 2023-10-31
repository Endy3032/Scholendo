import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
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
		<html lang="en" suppressHydrationWarning>
			<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
				<body className={inter.className} suppressHydrationWarning>{children}</body>
			</ThemeProvider>
		</html>
	)
}
