"use client"

import { createContext, Dispatch, SetStateAction, useContext, useState } from "react"

type Tab = "signin" | "signup"

export type TabContextType = {
	tab: Tab
	setTab: Dispatch<SetStateAction<Tab | string>>
}

const TabContext = createContext<TabContextType | undefined>(undefined)

export function useTab() {
	const context = useContext(TabContext)
	if (!context) throw new Error("useTab must be used within an TabProvider")
	return context
}

export function TabProvider({ children }) {
	const [tab, setTab] = useState<Tab>("signin")

	return (
		<TabContext.Provider value={{ tab, setTab }}>
			{children}
		</TabContext.Provider>
	)
}
