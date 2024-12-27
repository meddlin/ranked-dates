import { create } from 'zustand'

const useAppStore = create((set) => ({
    previewedItem: '',
    setPreviewedItem: (input_param) => set((state) => {
        return { previewedItem: input_param }
    } ),
    resetPreviewedItem: () => set({ previewedItem: '' }),
}));

export { useAppStore };