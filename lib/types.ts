import { GeneratedTypes } from "payload"
import { Options as CreateOpts } from "payload/dist/collections/operations/local/create"

export type CreateOptions<T extends keyof GeneratedTypes["collections"]> = CreateOpts<T>["data"]

export type FormAPIResponse<T> = {
	field: T | "root" | `root.${string}`
	message: string
}

type CollectionBase = {
	id: string
	createdAt: string
	updatedAt: string
}

export type Optional<T extends CollectionBase, K extends keyof T = keyof CollectionBase> =
	& Omit<T, K | keyof CollectionBase>
	& Partial<Pick<T, K | keyof CollectionBase>>
