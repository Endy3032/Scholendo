import { Metadata } from "next"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
	title: "Class Hub",
}

const Page = () => redirect("/app/homework")

export default Page
