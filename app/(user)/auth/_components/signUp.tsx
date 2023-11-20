"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "components/ui/button"
import { Calendar } from "components/ui/calendar"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "components/ui/form"
import { Input } from "components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "components/ui/select"
import { format } from "date-fns"
import { useAlert } from "hooks/alert"
import { cn } from "lib/utils"
import { CalendarIcon, Loader2 } from "lucide-react"
import { languages, sports, subjects } from "payload/collections/Users"
import { useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { signUp } from "../../_utils"
import styles from "../../styles.module.css"
import { useTab } from "../tabContext"

const formSchema = z.object({
	username: z.string().min(2).max(32),
	name: z.string().min(8).max(32),
	email: z.string().email(),
	password: z.string().min(8),
	confirmPassword: z.string().min(8),
	dateOfBirth: z.date().min(new Date(2007, 0)).max(new Date(2007, 11, 31)),
	subject: z.enum(subjects),
	language: z.enum(languages),
	sports: z.enum(sports),
}).superRefine(({ password, confirmPassword }, ctx) => {
	if (password !== confirmPassword) {
		ctx.addIssue({
			code: "custom",
			message: "Passwords do not match",
			path: ["confirmPassword"],
		})
	}
})

const SignUp = () => {
	const [loading, setLoading] = useState(false)
	const { addAlert } = useAlert()
	const { setTab } = useTab()

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		mode: "onChange",
		defaultValues: {
			username: "",
			name: "",
			email: "",
			password: "",
			confirmPassword: "",
			dateOfBirth: new Date(2007, 0),
			subject: "Chemistry",
			language: "French",
			sports: "Basketball",
		},
	})
	const { setError } = form

	async function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values)
		setLoading(true)
		try {
			const result = await signUp({
				...values,
				dateOfBirth: values.dateOfBirth.toISOString(),
			})

			if (!result.ok) setError(result.field, { message: result.message })
			else {
				addAlert(`Successfully signed up as ${result.name}!`)
				setTab("signin")
			}
		} catch (e) {
			addAlert(e.message, "error")
		}
		setLoading(false)
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className={styles.form}>
				<FormField control={form.control} name="username" render={({ field }) => (
					<FormItem>
						<FormLabel>Username</FormLabel>
						<FormControl>
							<Input placeholder="icyalmond" {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)} />
				<FormField control={form.control} name="name" render={({ field }) => (
					<FormItem>
						<FormLabel>Name</FormLabel>
						<FormControl>
							<Input placeholder="Vũ Gia Bảo" {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)} />
				<FormField control={form.control} name="dateOfBirth" render={({ field }) => (
					<FormItem>
						<FormLabel>Date of birth</FormLabel>
						<Popover>
							<PopoverTrigger asChild>
								<FormControl>
									<Button variant={"outline"} className={cn("w-full px-3", !field.value && "text-muted-foreground")}>
										{format(field.value, "dd/MM/yyyy")}
										<CalendarIcon className="ml-auto opacity-75" size={16} />
									</Button>
								</FormControl>
							</PopoverTrigger>
							<PopoverContent className="w-auto p-0" align="center">
								<Calendar
									mode="single"
									fromYear={2007}
									toYear={2007}
									captionLayout="dropdown-buttons"
									defaultMonth={field.value}
									selected={field.value}
									onSelect={field.onChange}
									fixedWeeks
									ISOWeek
									initialFocus
								/>
							</PopoverContent>
						</Popover>
						<FormMessage />
					</FormItem>
				)} />
				<FormField control={form.control} name="subject" render={({ field }) => (
					<FormItem>
						<FormLabel>Subject</FormLabel>
						<FormControl>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Select your chosen subject" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{subjects.map(subject => <SelectItem key={subject} value={subject}>{subject}</SelectItem>)}
								</SelectContent>
							</Select>
						</FormControl>
						<FormMessage />
					</FormItem>
				)} />
				<FormField control={form.control} name="language" render={({ field }) => (
					<FormItem>
						<FormLabel>Language</FormLabel>
						<FormControl>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Select your chosen language" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{languages.map(language => <SelectItem key={language} value={language}>{language}</SelectItem>)}
								</SelectContent>
							</Select>
						</FormControl>
						<FormMessage />
					</FormItem>
				)} />
				<FormField control={form.control} name="sports" render={({ field }) => (
					<FormItem>
						<FormLabel>Sports</FormLabel>
						<FormControl>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Select your chosen sport" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{sports.map(sport => <SelectItem key={sport} value={sport}>{sport}</SelectItem>)}
								</SelectContent>
							</Select>
						</FormControl>
						<FormMessage />
					</FormItem>
				)} />
				<FormField control={form.control} name="email" render={({ field }) => (
					<FormItem>
						<FormLabel>Email</FormLabel>
						<FormControl>
							<Input placeholder="icyalmond@example.com" type="email" {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)} />
				<FormField control={form.control} name="password" render={({ field }) => (
					<FormItem>
						<FormLabel>Password</FormLabel>
						<FormControl>
							<Input placeholder="••••••••" type="password" {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)} />
				<FormField control={form.control} name="confirmPassword" render={({ field }) => (
					<FormItem>
						<FormLabel>Confirm password</FormLabel>
						<FormControl>
							<Input placeholder="••••••••" type="password" {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)} />
				<div className="space-y-2">
					<button type="button" onClick={() => setTab("signin")} className={styles.formAction}>
						Already have an account?
					</button>
				</div>
				<Button type="submit" disabled={loading}>
					{loading ? <Loader2 className="h-full animate-spin -ml-1 mr-2" /> : null}
					Sign up
				</Button>
			</form>
		</Form>
	)
}

export default SignUp
