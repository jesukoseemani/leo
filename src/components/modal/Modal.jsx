import React from "react";
import ReactDom from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import "./modal.scss";
import modalSlice from "../../store/modalSlice";
import { getModalComponent } from "./modalUtil";

function Modal() {
  const { isModalOpen, isModalType, isModalProps } = useSelector(
    (state) => state.modal
  );
  const { closeModal } = modalSlice.actions;
  const dispatch = useDispatch();
  if (!isModalOpen) return null;

  const ModalComponent = getModalComponent(isModalType);

  console.log(ModalComponent);

  return ReactDom.createPortal(
    <>
      <div className="overlay" />
      <div className="modal">
        {" "}
        <ModalComponent
          {...isModalProps}
          onClose={() => dispatch(closeModal())}
        />
      </div>
    </>,
    document.getElementById("portal")
  );
}

export default Modal;
