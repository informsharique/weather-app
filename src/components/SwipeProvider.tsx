import React, { createContext, ReactNode, useMemo, useState } from 'react';

type SwipeContextProps = {
	openedItemKey: number;
	setOpenedItemKey: (key: number) => void;
};

type SwipeProviderProps = {
	children: ReactNode;
	initialOpenedItemKey: number;
};

const swipeContextValues: SwipeContextProps = {
	openedItemKey: -1,
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	setOpenedItemKey: () => {},
};

export const SwipeContext = createContext<SwipeContextProps>(swipeContextValues);

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function SwipeProvider({ initialOpenedItemKey, children }: SwipeProviderProps) {
	const [openedItemKey, setOpenedItemKey] = useState(initialOpenedItemKey);

	const value = useMemo(() => {
		return {
			openedItemKey,
			setOpenedItemKey,
		};
	}, [openedItemKey]);

	return <SwipeContext.Provider value={value}>{children}</SwipeContext.Provider>;
}

SwipeProvider.Context = SwipeContext;
