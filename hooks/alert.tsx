"use client"

import { createContext, useCallback, useContext, useState } from "react"

interface Alert {
	type: "error" | "message"
	message: string
	id: number
}

interface AlertContextType {
	alerts: Alert[]
	addAlert: (message: string, type?: Alert["type"]) => void
	removeAlert: (alertId: number) => void
	clearAlerts: () => void
}

const AlertContext = createContext<AlertContextType | undefined>(undefined)

export function useAlert() {
	const context = useContext(AlertContext)
	if (!context) {
		throw new Error("useAlert must be used within an AlertProvider")
	}
	return context
}

export function AlertProvider({ children }) {
	const [alerts, setAlerts] = useState<Alert[]>([])

	const removeAlert = useCallback((alertId: number) => setAlerts(prevAlerts => prevAlerts.filter(alert => alert.id !== alertId)), [])
	const clearAlerts = useCallback(() => setAlerts([]), [])

	const addAlert = useCallback((message: string, type: Alert["type"] = "message") => {
		const id = Date.now()
		setAlerts(prevAlerts => [...prevAlerts, { type, message, id }])
		if (type !== "error") setTimeout(() => removeAlert(id), 3000)
	}, [removeAlert])

	return (
		<AlertContext.Provider value={{ alerts: alerts, addAlert, removeAlert, clearAlerts }}>
			{children}
		</AlertContext.Provider>
	)
}
