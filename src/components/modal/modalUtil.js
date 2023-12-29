import VideoModal from "../modalElements/videoModal/VideoModal";


export const getModalComponent = (modalType) => {
    switch (modalType) {
        case 'VideoModal':
            return VideoModal;

        default:
            return null;
    }
};
