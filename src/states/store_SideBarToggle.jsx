import create from 'zustand';

// Set Store
export const useSideBarToggleStore = create((set) => ({
    plTeams: [],
    setShowSideBarTrue: () => set({ showSideBar: true }),
    setShowSideBarFalse: () => set({ showSideBar: false }),
}));
