import toastSlice, { showToast, removeToast } from '../data/toastSlice';

describe('toastSlice test', () => {
    describe('initial state', () => {
        it('should set initial state', () => {
            const initialState = toastSlice.reducer(undefined, { type: '' });
            expect(initialState).toEqual({
                toasts: [],
                position: 'top-right',
            });
        });
    });

    describe('toasts management', () => {
        it('should add toast', () => {
            const initialState = {
                toasts: [],
                position: 'top-right',
            };
            const action = showToast({
                id: 1,
                message: 'Test message',
                type: 'success',
                position: 'top-right',
            });
            const result = toastSlice.reducer(initialState, action);
            expect(result.toasts).toEqual([{ id: 1, message: 'Test message', type: 'success' }]);
        });

        it('should remove toast', () => {
            const initialState = {
                toasts: [
                    { id: 1, message: 'Test message 1', type: 'success' },
                    { id: 2, message: 'Test message 2', type: 'error' },
                ],
                position: 'top-right',
            };
            const action = removeToast(1);
            const result = toastSlice.reducer(initialState, action);
            expect(result.toasts).toEqual([{ id: 2, message: 'Test message 2', type: 'error' }]);
        });

        it('should update position', () => {
            const initialState = {
                toasts: [],
                position: 'top-right',
            };
            const action = showToast({
                id: 1,
                message: 'Test message',
                type: 'success',
                position: 'bottom-left',
            });
            const result = toastSlice.reducer(initialState, action);
            expect(result.position).toEqual('bottom-left');
        });
    });
});
