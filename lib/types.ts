import { GeneratedTypes } from "payload"
import { Options as CreateOpts } from "payload/dist/collections/operations/local/create"

export type CreateOptions<T extends keyof GeneratedTypes["collections"]> = CreateOpts<T>["data"]

export type FormAPIResponse<T> = {
	field: T | "root" | `root.${string}`
	message: string
}
