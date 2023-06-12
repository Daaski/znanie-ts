import { create } from 'zustand';
import { ModalVisibleStore } from 'store/types/modalVisible.types';

export const useModalVisible = create<ModalVisibleStore>((set) => ({
    modalVisible: false,
    setModalVisible: (modalVisible) => set({ modalVisible: modalVisible }),
}));
