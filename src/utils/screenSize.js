import { useState, useEffect } from "react";
import React from "react";

export const getWidth = () => window.innerWidth
|| document.documentElement.clientWidth
|| document.body.clientWidth;

export const useCurrentWidth = () => {
    let [width, setWidth] = useState(getWidth());;

    React.useEffect(() => {
        let timeoutId = null;
        function resizeListener() {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => setWidth(getWidth()), 150);
        };

        window.addEventListener('resize', resizeListener);
        return () => {
            window.removeEventListener('resize', resizeListener);
        }
    }, [])

    return width;
}