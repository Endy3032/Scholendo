"use client"

import { Button } from "/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
	DialogTrigger } from "/components/ui/dialog"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "/components/ui/form"
import { Input } from "/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, useForm } from "react-hook-form"
import * as z from "zod"
import styles from "../../styles.module.css"

const formSchema = z.object({
	email: z.string().email(),
})

const ForgotPassword = () => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		mode: "onChange",
		defaultValues: {
			email: "",
		},
	})

	async function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			const result = await fetch(`/api/users/forgot-password`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email: values.email,
				}),
			})

			const data = await result.json()

			if (!result.ok) {
				form.setError("root.login", {
					type: "validate",
					message: data.errors[0].message,
				})
			}
		} catch (e) {
			console.error(e)
		}
	}

	return (
		<div>
			<Dialog>
				<DialogTrigger asChild>
					<button type="button" className={styles.formAction}>Forgot password?</button>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Forgot password</DialogTitle>
						<DialogDescription>
							Enter your email address and we&apos;ll send you a link to reset your password.
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
							<Button type="submit" variant="secondary">Submit</Button>
						</form>
					</Form>
				</DialogContent>
			</Dialog>
		</div>
	)
}

export default ForgotPassword
