import create from 'zustand';
import { useMediaQuery } from 'react-responsive';

// Create Store
export const useScreenTypeStore = create((set) => ({
    screenType: 'mobile',
    setScreenToDesktop: () => set({ screenType: 'desktop' }),
    setScreenToMobile: () => set({ screenType: 'mobile' }),
}));

// Create Setter Functions
export const GetScreenType = () => {
    // Get the State Functions
    const setScreenToDesktop = useScreenTypeStore(
        (state) => state.setScreenToDesktop,
    );
    const setScreenToMobile = useScreenTypeStore(
        (state) => state.setScreenToMobile,
    );

    // Query The Screen size
    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 1224px)',
    });
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
    if (isDesktopOrLaptop) {
        setScreenToDesktop();
    }
    if (isTabletOrMobile) {
        setScreenToMobile();
    }
};
