import Link from "next/link"

const Page = async () => {
	return (
		<div>
			<h1>User links</h1>
			<ul>
				<li>
					<Link href="/sign-out">Sign Out</Link>
				</li>
				<li>
					<Link href="/auth">Authenticate</Link>
				</li>
			</ul>
		</div>
	)
}

export default Page
