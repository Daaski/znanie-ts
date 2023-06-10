import { create } from 'zustand';

export const useModalVisible = create<>((set) => ({
    modalVisible: false,
    setModalVisible: (modalVisible) => set({ modalVisible: modalVisible }),
}));
