"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { forgotPassword } from "app/(user)/_utils"
import { Badge } from "components/ui/badge"
import { Button } from "components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogPortal, DialogTitle, DialogTrigger } from "components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "components/ui/form"
import { Input } from "components/ui/input"
import { Loader2 } from "lucide-react"
import { useState } from "react"
import { FormProvider, useForm, useFormContext } from "react-hook-form"
import * as z from "zod"
import styles from "../../styles.module.css"

const formSchema = z.object({
	email: z.string().email(),
})

const ForgotPassword = () => {
	const [loading, setLoading] = useState(false)

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		mode: "onChange",
		defaultValues: {
			email: "",
		},
	})

	async function onSubmit(values: z.infer<typeof formSchema>) {
		setLoading(true)
		console.log(values)
		try {
			const result = await forgotPassword(values.email)
			console.log(result)
		} catch (e) {
			console.error(e)
		}
		setLoading(false)
	}

	return (
		<DialogContent className="">
			<DialogHeader>
				<DialogTitle>
					Forgot password <Badge className="rounded-md ml-1 px-2">WIP</Badge>
				</DialogTitle>
				<DialogDescription>
					Enter your email and we&apos;ll send you a password reset link.
				</DialogDescription>
			</DialogHeader>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className={styles.form}>
					<FormField control={form.control} name="email" render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input placeholder="icyalmond@example.com" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)} />
					<Button type="submit" disabled={loading}>
						{loading ? <Loader2 className="h-full animate-spin -ml-1 mr-2" /> : null}
						Submit
					</Button>
				</form>
			</Form>
		</DialogContent>
	)
}

export default ForgotPassword
