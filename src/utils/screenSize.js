import React from "react";

export const getWidth = () => window.innerWidth
|| document.documentElement.clientWidth
|| document.body.clientWidth;

export const useCurrentWidth = () => {
    let [width, setWidth] = React.useState(getWidth());

    React.useEffect(() => {
        let timeoutId = null;
        const resizeListener = () => {
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