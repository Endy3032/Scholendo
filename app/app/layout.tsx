import Link from "next/link"
import NavBar from "./_components/navBar"

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
			<div className="flex-1 flex flex-row">
				<aside className="fixed h-full">
					<NavBar />
				</aside>
				<main className="flex-1 max-w-6xl mx-auto px-4 mt-6">
					{children}
				</main>
			</div>
		</>
	)
}
