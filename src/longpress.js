export function longpress(node, duration) {
    let timer;
    let bgColor = node.style.backgroundColor

    const handleStart = () => {
        node.style.backgroundColor = "green"
        timer = setTimeout(() => {
            node.dispatchEvent(
                new CustomEvent('longpress')
            );
        }, duration);
    };
    const handleEnd = () => {
        clearTimeout(timer)
        node.style.backgroundColor = bgColor;
    };

    node.addEventListener('mousedown', handleStart, false);
    node.addEventListener('mouseup', handleEnd, false);
    node.addEventListener("touchstart", handleStart, false);
    node.addEventListener("touchend", handleEnd, false);

    return {
        update(newDuration) {
            duration = newDuration;
        },
        destroy() {
            node.removeEventListener('mousedown', handleStart);
            node.removeEventListener('mouseup', handleEnd);
            node.removeEventListener("touchstart", handleStart);
            node.removeEventListener("touchend", handleEnd);
        }
    };
}