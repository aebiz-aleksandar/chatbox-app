    //Variables:

    const dragEl = document.getElementById('dragElement');
    const chatBox = document.getElementById('chatBox');

    //Event: Drag Move Element
    dragEl.addEventListener('mousedown', dragMoveElement);

    //Function: Drag Move Element
    function dragMoveElement(e) {

        let prevX = e.clientX;
        let prevY = e.clientY;

        window.addEventListener('mousemove', moveElement);
        window.addEventListener('mouseup', dropMoveElement);

        function moveElement(e) {
            const moveX = prevX - e.clientX;
            const moveY = prevY - e.clientY;
            const rect = chatBox.getBoundingClientRect();

            const top = rect.top - moveY;
            const left = rect.left - moveX;

            let currentY = top;
            let currentX = left;
            
            if (top < 0) {
                currentY = 1;
            } else if ((window.innerHeight - top) < rect.height) {
                currentY = window.innerHeight - rect.height;
            }

            if (left < 0) {
                currentX = 1;
            } else if ((window.innerWidth - left) < rect.width) {
                currentX = window.innerWidth - rect.width;
            }


            chatBox.style.left = currentX + 'px';
            chatBox.style.top = currentY + 'px';

            prevX = e.clientX;
            prevY = e.clientY;
        }

        function dropMoveElement() {
            window.removeEventListener('mousemove', moveElement);
            window.removeEventListener('mouseup', dropMoveElement);
        }
    }