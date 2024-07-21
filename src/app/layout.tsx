import { Metadata } from "next"

export const metadata: Metadata = {
	title: {
		template: "%s | CTin2225",
		default: "CTin2225",
	},
}

export default function Layout({ children }: { children: React.ReactNode }) {
	return children
}
