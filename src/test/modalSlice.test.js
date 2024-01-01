import modalSlice, { openModal, closeModal } from '../data/modalSlice';

describe('modalSlice test', () => {
    describe('initial state', () => {
        it('should set initial state', () => {
            const initialState = modalSlice.reducer(undefined, { type: '' });
            expect(initialState).toEqual({
                isModalOpen: false,
                isModalType: '',
                isModalProps: {},
            });
        });
    });

    describe('modal management', () => {
        it('should open modal', () => {
            const initialState = {
                isModalOpen: false,
                isModalType: '',
                isModalProps: {},
            };
            const action = openModal({
                isModalOpen: true,
                isModalType: 'video',
                isModalProps: { id: 1 },
            });
            const result = modalSlice.reducer(initialState, action);
            expect(result.isModalOpen).toEqual(true);
            expect(result.isModalType).toEqual('video');
            expect(result.isModalProps).toEqual({ id: 1 });
        });

        it('should close modal', () => {
            const initialState = {
                isModalOpen: true,
                isModalType: 'video',
                isModalProps: { id: 1 },
            };
            const action = closeModal();
            const result = modalSlice.reducer(initialState, action);
            expect(result.isModalOpen).toEqual(false);
            expect(result.isModalType).toEqual('');
            expect(result.isModalProps).toEqual({});
        });
    });
});
