import { Button } from "components/ui/button"
import { Github } from "lucide-react"
import Link from "next/link"

const Page = async () => {
	return (
		<div className="flex flex-1 flex-col justify-center items-center gap-10 mx-auto">
			<h1 className="text-5xl font-bold">CTin2225 Hub</h1>
			<div className="absolute flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-3/4 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
			</div>
			<p className="text-2xl text-center leading-relaxed">
				Say goodbye to Notion and Google Sheets... <span className="text-sm italic">maybe?</span>
				<br />
				<span className="italic font-semibold">
					Say hello <code>[giv name]</code>
				</span>
				<br />
				<span className="font-light text-sm">soon: say goodbye to quizizz</span>
			</p>
			<div className="flex flex-row gap-4">
				<Button className="text-lg p-4 py-6" variant="secondary" asChild>
					<Link href="/app">
						Main App
					</Link>
				</Button>
				<Button className="text-lg p-4 py-6" variant="outline" asChild>
					{/* @ts-expect-error href */}
					<Link href="/admin">
						Admin Dashboard
					</Link>
				</Button>
				<Button className="text-lg p-4 py-6" variant="outline" asChild>
					<a href="https://github.com/Endy3032/Scholendo" className="flex flex-row gap-2 items-center">
						<Github />
						GitHub
					</a>
				</Button>
			</div>
		</div>
	)
}

export default Page
