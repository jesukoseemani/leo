import { useEffect, useState, useRef } from 'react';

export default function useClickOutside(handler) {
    let ref = useRef();
    useEffect(() => {
        let eventHandler = (event) => {
            if (!ref.current.contains(event.target)) {
                handler();
            }
        };

        document.addEventListener("mousedown", eventHandler);

        return () => {
            document.removeEventListener("mousedown", eventHandler);
        };
    });

    return ref;
}
