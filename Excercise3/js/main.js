window.addEventListener("load", function() {
    const formFrame1 = get(".frame-1 .msger-inputarea");
    const formFrame2 = get(".frame-2 .msger-inputarea");
    const msgInput1 = get(".frame-1 .msger-input");
    const msgInput2 = get(".frame-2 .msger-input");
    const msgerChat1 = get(".frame-1 .msger-chat");
    const msgerChat2 = get(".frame-2 .msger-chat");
    const buttonsResetFrame1 = get(".frame-1 .btn-reset");
    const buttonsResetFrame2 = get(".frame-2 .btn-reset");
    const buttonBold1 = document.querySelector('.frame-1 .btn-bold');
    const buttonItalic1 = document.querySelector('.frame-1 .btn-italic');
    const buttonBold2 = document.querySelector('.frame-2 .btn-bold');
    const buttonItalic2 = document.querySelector('.frame-2 .btn-italic');
    const avatarPr1 = "./images/num1.png";
    const avatarPr2 = "./images/num2.png";
    let contentMsg = JSON.parse(localStorage.getItem("contentMsg"));

    // get storage contentMsg binding
    (function() {
        if (contentMsg) {
            contentMsg.forEach((element) => {
                getContentMsgItem(element.personSend, element.msg);
            });
        }
        cleanValueScroll(msgInput1);
        cleanValueScroll(msgInput2);
    })();

    boldMessage(buttonBold1, "bold", msgInput1);
    boldMessage(buttonBold2, "bold", msgInput2);
    italicMessage(buttonItalic1, "italic", msgInput1);
    italicMessage(buttonItalic2, "italic", msgInput2);
    resetStyle(buttonsResetFrame1, msgInput1);
    resetStyle(buttonsResetFrame2, msgInput2);

    function boldMessage(selector, fontWeightTxt, message) {
        selector.addEventListener("click", function() {
            if (message.innerHTML) {
                message.style.fontWeight = fontWeightTxt;
                message.setAttribute('data-status-fw', "bold");
            }
        });
    }

    function italicMessage(selector, fontStyleTxt, message) {
        selector.addEventListener("click", function() {
            if (message.innerHTML) {
                message.style.fontStyle = fontStyleTxt;
                message.setAttribute('data-status-fs', "italic");
            }
        });
    }

    function resetStyle(selector, message) {
        selector.addEventListener("click", function() {
            if (message.innerHTML) {
                message.setAttribute('data-status', "0");
                removeStatus(message, ["data-status-fw", "data-status-fs"]);
            }
        });
    }

    function removeStatus(element, atrribute) {
        for (let index = 0; index < atrribute.length; index++) {
            element.removeAttribute(atrribute[index]);
        }
        element.style.fontWeight = "";
        element.style.fontStyle = "";
    }
    // form Frame Submit
    function formFrameSubmit(event, personSend, msgInput) {
        event.preventDefault();
        let msgContent = msgInput.innerHTML;
        if (msgInput.dataset.statusFw == "bold" && msgInput.dataset.statusFs == "italic") {
            msgInput.innerHTML = `<b>${msgContent}</b>`;
            // console.log(111);
        }
        if (!msgContent) return;
        if (msgInput.dataset.statusFw == "bold") {
            msgContent = `<b>${msgInput.innerHTML}</b>`;
        }
        if (msgInput.dataset.statusFs == "italic") {
            msgContent = `<i>${msgInput.innerHTML}</i>`;
        }
        if (msgInput.dataset.status == "0") {
            removeStatus(msgInput, ["data-status-fw", "data-status-fs"]);
            msgInput.innerHTML;
        }
        getContentMsgItem(personSend, msgContent);
        cleanValueScroll(msgInput);
    }

    // frame 1 chat
    formFrame1.addEventListener(
        "submit",
        function() {
            formFrameSubmit(event, 2, msgInput1);
        },
        false
    );

    // frame 2 chat
    formFrame2.addEventListener(
        "submit",
        function() {
            formFrameSubmit(event, 1, msgInput2);
        },
        false
    );

    // get Content Msg Item
    function getContentMsgItem(personSend, msg) {
        if (personSend === 2) {
            msgerChat1.insertAdjacentHTML(
                "beforeend",
                sideMsgItem(avatarPr2, msg, "right")
            );
            msgerChat2.insertAdjacentHTML(
                "beforeend",
                sideMsgItem(avatarPr2, msg, "left")
            );
        } else {
            msgerChat1.insertAdjacentHTML(
                "beforeend",
                sideMsgItem(avatarPr1, msg, "left")
            );
            msgerChat2.insertAdjacentHTML(
                "beforeend",
                sideMsgItem(avatarPr1, msg, "right")
            );
        }
    }

    // Side Msg Item left right
    function sideMsgItem(avatar, msg, side) {
        return `<div class="msg ${side}-msg">
                  <div class="msg-img" style="background-image: url(${avatar})"></div>
                  <div class="msg-bubble">
                      <div class="msg-text">
                          ${msg}
                      </div>
                  </div>
              </div>`;
    }

    //   clean Value & Scroll;
    function cleanValueScroll(msgInput) {
        msgInput.innerHTML = "";
        msgerChat1.scrollTop = 1000;
        msgerChat2.scrollTop = 1000;
    }

    // Utils
    function get(selector, root = document) {
        return root.querySelector(selector);
    }
});
