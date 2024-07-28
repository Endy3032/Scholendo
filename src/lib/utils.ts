import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function rand(lower: number, upper = 0) {
	if (lower > upper) [upper, lower] = [lower, upper]
	return Math.floor(Math.random() * (upper - lower + 1)) + lower
}
