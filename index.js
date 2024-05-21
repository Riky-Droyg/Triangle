document.addEventListener('DOMContentLoaded', function () {
    const cube = document.querySelector('.cube');
    let isDragging = false;
    let startX, startY, currentX = 0, currentY = 0;
    
    const startDrag = (x, y) => {
        isDragging = true;
        startX = x;
        startY = y;
        document.body.style.userSelect = 'none'; // Забороняємо виділення тексту під час перетягування
    };

    const stopDrag = () => {
        isDragging = false;
        document.body.style.userSelect = ''; // Дозволяємо виділення тексту після відпускання кнопки миші або завершення дотику
    };

    const doDrag = (x, y) => {
        if (isDragging) {
            const deltaX = x - startX;
            const deltaY = y - startY;
            currentX -= deltaY * 0.5; // Міняємо знак на "-" для зворотнього руху
            currentY += deltaX * 0.5;
            cube.style.transform = `rotateX(${currentX}deg) rotateY(${currentY}deg)`;
            startX = x;
            startY = y;
        }
    };

    document.addEventListener('mousedown', (e) => {
        if (e.button === 0) {
            startDrag(e.clientX, e.clientY);
        }
    });

    document.addEventListener('mouseup', stopDrag);

    document.addEventListener('mousemove', (e) => {
        doDrag(e.clientX, e.clientY);
    });

    document.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) {
            const touch = e.touches[0];
            startDrag(touch.clientX, touch.clientY);
        }
    });

    document.addEventListener('touchend', stopDrag);

    document.addEventListener('touchmove', (e) => {
        if (e.touches.length === 1) {
            const touch = e.touches[0];
            doDrag(touch.clientX, touch.clientY);
        }
    });
});
