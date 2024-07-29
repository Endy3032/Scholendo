import { useEffect, useRef, useState } from "react"

export const useScrollspy = (elements: Element[], options?: { offset?: number; root?: Element }): string[] => {
	const [intersectingIds, setIntersecting] = useState<string[]>([])
	const rootMargin = `-${options?.offset || 0}px 0px -${options?.offset || 0}px 0px`
	const observerRef = useRef<IntersectionObserver>(undefined)

	useEffect(() => {
		if (observerRef.current) observerRef.current.disconnect()

		observerRef.current = new IntersectionObserver(
			entries => {
				const intersecting = entries.reduce<string[]>((acc, cur) => cur.intersectionRatio > 0 ? [...acc, cur.target.id] : acc, [])
				setIntersecting(prev => {
					if (prev.length !== intersecting.length || !prev.every((v, i) => v === intersecting[i])) return intersecting
					return prev
				})
			},
			{
				root: options?.root,
				rootMargin,
			},
		)

		const { current: observer } = observerRef
		elements.forEach(element => element && observer.observe(element))
		return () => observer.disconnect()
	}, [elements, options, rootMargin])

	return intersectingIds
}
