// ==UserScript==
// @name    Slowly Save Helper
// @description    add a save button on slowly's web version, which can save letter as pdf
// @match    https://web.getslowly.com/friend/*
// @version    1.0
// @copyright    2020,01,26; By duke
// @github    https://github.com/DukeLuo/duke-user-js
// @namespace    https://github.com/DukeLuo/duke-user-js
// @require    https://cdn.jsdelivr.net/npm/html2canvas@1.0.0-rc.5/dist/html2canvas.min.js
// @require    https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.5.3/jspdf.min.js
// ==/UserScript==

; (function () {
    'use strict';

    const slowlyHeaderMenuSelector = '.App-header .container .col:last-child';
    const letterContainerSelector = '.main-scroller .friend-letters-wrapper > .row';
    const letterContentSelector = '.main-scroller .main-container .friend-Letter-wrapper';

    function createElementFromHTML(htmlString) {
        var div = document.createElement('div');

        div.innerHTML = htmlString.trim();

        return div.firstChild;
    }

    function insertCSS(style) {
        const styleSheet = document.createElement("style");

        styleSheet.type = "text/css";
        styleSheet.innerText = style;
        document.head.appendChild(styleSheet);
    }

    function addSaveButton() {
        const buttonStyle = `
        .icon-download3:before {
            content: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAAAk0lEQVRYhe2VXQqAIBAGp+gMEd3/SGF0GnuSIvzbMrZgByS0dh0+hcAwPopvMBwwaQp4YAPmJwKltdh6mK+npziJFgIjsHAzCYlArnbiSMJpCASJZG2XaXJ9X7N5qnesHwC9sGlzBsG3qbQeoZ6AukDtEUgvYKB4bL9JIFB7EasTU0/ABExAXaD0N3x9P/UEDEOdHSNaUUMYGcVmAAAAAElFTkSuQmCC");
        }`;
        const buttonHtmlString =
            `<button type="button" class="btn btn-default btn-toolbar mr-3" title="Saving">
        <i class="icon-download3 h4 text-lighter"></i>
        </button>`;
        const saveButton = createElementFromHTML(buttonHtmlString);

        saveButton.addEventListener('click', save);
        document.querySelector(slowlyHeaderMenuSelector).appendChild(saveButton);
        insertCSS(buttonStyle);
    }


    function getFileName() {
        return 'Orange';
    }

    function addPdfPage(element, pdf) {
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const html2canvasOptions = {
            scale: 2,
            useCORS: true,
        };

        element.style.width = `${pageWidth}px`;
        element.querySelector('.letter').style.border = 'none';
        element.querySelector('.letter').style.boxShadow = 'none';
        const deleteButton = element.querySelector('.modal-footer .link');
        deleteButton.parentNode.removeChild(deleteButton);

        return html2canvas(element, html2canvasOptions)
            .then(canvas => {
                const image = canvas.toDataURL('image/png');
                const imgWidth = pageWidth;
                const imgHeight = canvas.height / canvas.width * imgWidth;
                const count = Math.ceil(canvas.height / (pageHeight * html2canvasOptions.scale));
                Array.from(Array(count).keys()).forEach((i) => {
                    pdf.addPage(pageWidth, pageHeight);
                    pdf.addImage(image, 'PNG', 0, - i * pageHeight, imgWidth, imgHeight, '', 'FAST');
                });
            });
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function findContentDom(order) {
        const cardDomSelector = `.main-scroller .friend-letters-wrapper > .row div:nth-child(${order + 1}) a.card`;
        const cardDom = document.querySelector(cardDomSelector);
        cardDom.click();
        const contentDom = document.querySelector(letterContentSelector);
        const cloneContentDom = contentDom.cloneNode(true);

        // everything that you want present on the canvas need to be in the DOM
        contentDom.parentElement.appendChild(cloneContentDom);

        return cloneContentDom;
    }

    function back() {
        return new Promise(async (resolve) => {
            window.history.back();
            await sleep(200);
            resolve();
        });
    }

    function save() {
        const name = `${getFileName()}.pdf`;
        const pdf = new jsPDF('p', 'pt', 'a4', true);

        scrollToBottom().then(
            () => {
                const letterCount = document.querySelector(letterContainerSelector).childElementCount;

                console.log(`total letter: ${letterCount}`);
                Array.from(Array(3).keys()).reduce(
                    (chain, order) => chain.then(
                        () => addPdfPage(findContentDom(order), pdf),
                    ).then(
                        () => back()
                    ).then(
                        () => console.log(`saved ${order + 1}th letter`)
                    ),
                    Promise.resolve()).then(
                        () => pdf.save(name)
                    );
            });
    }

    function scrollToBottom() {
        let count = 8;

        return new Promise((resolve) => {
            const scrollInterval = setInterval(
                () => {
                    if (!count) {
                        stopScroll();
                        return resolve();
                    }
                    window.scrollTo(0, document.body.scrollHeight);
                    count -= 1;
                },
                800);
            const stopScroll = () => clearInterval(scrollInterval);
        });
    }

    // init
    addSaveButton();
})();
