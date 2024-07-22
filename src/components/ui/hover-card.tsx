"use client"

import * as HoverCardPrimitive from "@radix-ui/react-hover-card"
import * as React from "react"

import { cn } from "@/lib/utils"

const HoverCard = HoverCardPrimitive.Root

const HoverCardTrigger = HoverCardPrimitive.Trigger

const HoverCardContent = React.forwardRef<
	React.ComponentRef<typeof HoverCardPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>
>(({ className, align = "center", sideOffset = 16, ...props }, ref) => (
	<HoverCardPrimitive.Content ref={ref} align={align} sideOffset={sideOffset} className={cn(
		"pointer-events-none z-50 max-w-48 rounded bg-gray-50 px-3 py-2 text-gray-950 shadow-md outline-none dark:bg-gray-950 dark:text-gray-50",
		"data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-75",
		"data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-75",
		"data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
		"data-[side=bottom]:slide-out-to-top-2 data-[side=left]:slide-out-to-right-2 data-[side=right]:slide-out-to-left-2 data-[side=top]:slide-out-to-bottom-2",
		className,
	)} {...props} />
))
HoverCardContent.displayName = HoverCardPrimitive.Content.displayName

export { HoverCard, HoverCardContent, HoverCardTrigger }
