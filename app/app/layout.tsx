import Link from "next/link"
import Sidebar from "./_components/sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<header className="sticky top-0 min-h-[4rem] bg-slate-900">
				<nav className="h-full">
					<ul className="h-full flex flex-row items-center px-8 gap-4">
						<li>
							<Link className="text-xl font-bold" href="/app">CTin2225</Link>
						</li>
					</ul>
				</nav>
			</header>
			<div className="flex-1 flex flex-col sm:flex-row overflow-hidden">
				<Sidebar />
				<main className="flex-1 w-full max-w-6xl mx-auto px-4 pt-6 pb-4 overflow-y-scroll">
					{children}
				</main>
			</div>
		</>
	)
}
