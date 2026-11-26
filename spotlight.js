const spotlight = document.createElement("div");
spotlight.className = "cursor-spotlight";
spotlight.setAttribute("aria-hidden", "true");
document.body.appendChild(spotlight);

if (window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)").matches) {
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;
    let animationFrame = null;

    function moveSpotlight() {
        currentX += (targetX - currentX) * 0.22;
        currentY += (targetY - currentY) * 0.22;
        spotlight.style.left = `${currentX}px`;
        spotlight.style.top = `${currentY}px`;

        if (Math.abs(targetX - currentX) > 0.5 || Math.abs(targetY - currentY) > 0.5) {
            animationFrame = window.requestAnimationFrame(moveSpotlight);
        } else {
            animationFrame = null;
        }
    }

    document.addEventListener("pointermove", (event) => {
        if (event.pointerType !== "mouse") return;
        targetX = event.clientX;
        targetY = event.clientY;
        if (animationFrame === null) animationFrame = window.requestAnimationFrame(moveSpotlight);
    }, { passive: true });
}
