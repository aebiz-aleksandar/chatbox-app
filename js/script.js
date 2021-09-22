    //Variables:

    const dragEl = document.getElementById('dragElement');
    const chatBox = document.getElementById('chatBox');
    const mainSection = document.querySelector('.section-main');
    const chatBoxHolder = document.querySelector('.chat-box-holder');
    const resizers = document.querySelectorAll('.resizer');

    let isResizing = false;

    //Event: Drag Move Element
    dragEl.addEventListener('mousedown', dragMoveElement);

    //Event: Resize Element
    resizers.forEach(resizer => {
        resizer.addEventListener('mousedown', resizeElement);
    });
    

    //Function: Drag Move Element
    function dragMoveElement(e) {

        let prevX = e.clientX;
        let prevY = e.clientY;

        window.addEventListener('mousemove', moveElement);
        window.addEventListener('mouseup', dropMoveElement);

        mainSection.style.userSelect = 'none';
        chatBoxHolder.style.userSelect = 'none';
        function moveElement(e) {
            if (!isResizing) {
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
        }

        function dropMoveElement() {
            window.removeEventListener('mousemove', moveElement);
            window.removeEventListener('mouseup', dropMoveElement);
            mainSection.style.userSelect = 'auto';
            chatBoxHolder.style.userSelect = 'auto';
        }
    }

    //Function: Resize Element
    function resizeElement(e) {
        isResizing = true;
        mainSection.style.userSelect = 'none';
        chatBoxHolder.style.userSelect = 'none';
        let currentResizer = e.currentTarget;
        let prevX = e.clientX;
        let prevY = e.clientY;

        window.addEventListener('mousemove', resizeMove);
        window.addEventListener('mouseup', resizeEnd);

        //Function: Resize Move
        function resizeMove(e) {
            const rect = chatBox.getBoundingClientRect();

            if (currentResizer.classList.contains('resizer-e')) {
                let eWidth = rect.width - (prevX - e.clientX);
                let currentWidth = eWidth;
                if (eWidth < 300) {
                    currentWidth = 300;
                } 
                if ((window.innerWidth - eWidth) < rect.left) {
                    currentWidth = window.innerWidth - rect.left;
                }

                chatBox.style.width = currentWidth + 'px';
            } else if (currentResizer.classList.contains('resizer-w')) {
                let wWidth = rect.width + (prevX - e.clientX);
                let wLeft = rect.left - (prevX - e.clientX);
                let currentWidth = wWidth;
                let currentLeft = wLeft;
                
                if (wWidth <= 300) {
                    currentWidth = 300;
                    currentLeft = rect.left;
                }
                if (wLeft < 0) {
                    currentLeft = 0;
                    currentWidth = rect.width;
                }

                chatBox.style.width = currentWidth + 'px';
                chatBox.style.left = currentLeft + 'px';
            } else if (currentResizer.classList.contains('resizer-s')) {
                let sHeight = rect.height - (prevY - e.clientY);
                let currentHeight = sHeight;
                if (sHeight < 350) {
                    currentHeight = 350;
                } 
                if ((window.innerHeight - sHeight) < rect.top) {
                    currentHeight = window.innerHeight - rect.top;
                }

                chatBox.style.height = currentHeight + 'px';
            } else {
                let nHeight = rect.height + (prevY - e.clientY);
                let nTop = rect.top - (prevY - e.clientY);
                let currentHeight = nHeight;
                let currentTop = nTop;

                if (nHeight < 350) {
                    currentHeight = 350;
                    currentTop = rect.top;
                }
                if (nTop < 0) {
                    currentTop = 0;
                    currentHeight = rect.height;
                }

                chatBox.style.height = currentHeight + 'px';
                chatBox.style.top = currentTop + 'px';
            }

            prevX = e.clientX;
            prevY = e.clientY;
        }

        //Function: Resize End
        function resizeEnd() {
            window.removeEventListener('mousemove', resizeMove);
            window.removeEventListener('mouseup', resizeEnd);
            isResizing = false;
            mainSection.style.userSelect = 'auto';
            chatBoxHolder.style.userSelect = 'auto';
        }
    }