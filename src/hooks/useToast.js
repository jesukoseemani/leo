import toastSlice from '../store/toastSlice'
import { useDispatch } from 'react-redux';

function useToast() {
    const { showToast, removeToast } = toastSlice.actions
    const dispatch = useDispatch();

    const handleShowToast = ({ id, message, type, position, autoClose = true, autoCloseDuration = 2000 }) => {
        dispatch(showToast({ id, message, type, position }));

        if (autoClose) {
            setTimeout(() => {
                dispatch(removeToast(id));
            }, autoCloseDuration);
        }

    };
    return handleShowToast
}

export default useToast