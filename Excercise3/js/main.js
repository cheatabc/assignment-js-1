window.addEventListener("load", function() {
    const formFrame1 = get(".frame-1 .msger-inputarea");
    const formFrame2 = get(".frame-2 .msger-inputarea");
    const msgInput1 = document.querySelector(".frame-1 .msger-input");
    const msgInput2 = document.querySelector(".frame-2 .msger-input");
    const msgerChat1 = document.querySelector(".frame-1 .msger-chat");
    const msgerChat2 = document.querySelector(".frame-2 .msger-chat");
    const buttonsResetFrame1 = document.querySelector(".frame-1 .btn-reset");
    const buttonsResetFrame2 = document.querySelector(".frame-2 .btn-reset");
    const buttonBold1 = document.querySelector('.frame-1 .btn-bold');
    const buttonItalic1 = document.querySelector('.frame-1 .btn-italic');
    const buttonBold2 = document.querySelector('.frame-2 .btn-bold');
    const buttonItalic2 = document.querySelector('.frame-2 .btn-italic');
    const avatarPr1 = "./images/num1.png";
    const avatarPr2 = "./images/num2.png";
    let contentMsg = JSON.parse(localStorage.getItem("contentMsg"));
    buttonsResetFrame1.classList.add("reset-left");
    buttonsResetFrame2.classList.add("reset-right");
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

    fontStyleMessage(buttonBold1, msgInput1, 'bold');
    fontStyleMessage(buttonBold2, msgInput2, 'bold');
    fontStyleMessage(buttonItalic1, msgInput1, 'italic');
    fontStyleMessage(buttonItalic2, msgInput2, 'italic');
    resetStyle(buttonsResetFrame1, msgInput1);
    resetStyle(buttonsResetFrame2, msgInput2);
    // Add bold, italic style to text
    function fontStyleMessage(selector, message, fontStyle) {
        selector.addEventListener("click", function() {
            message.focus();
            document.execCommand(fontStyle, false, null);
            selector.classList.toggle("active");
            if (selector.classList.contains("active")) {
                selector.style.border = "3px cyan solid";
            } else {
                selector.style.border = "0px";
            }
        });
    }

    function resetStyle(selector, message) {
        selector.addEventListener("click", function() {
            if (selector.classList.contains("reset-left")) {
                if (buttonBold1.classList.contains("active")) {
                    buttonBold1.style.border = "0px";
                }
                if (buttonItalic1.classList.contains("active")) {
                    buttonItalic1.style.border = "0px";
                }
            }
            if (selector.classList.contains("reset-right")) {
                if (buttonBold2.classList.contains("active")) {
                    buttonBold2.style.border = "0px";
                }
                if (buttonItalic2.classList.contains("active")) {
                    buttonItalic2.style.border = "0px";
                }
            }
            if (message.innerHTML) {
                message.innerHTML = "";
            }
        });
    }

    // form Frame Submit
    function formFrameSubmit(event, personSend, msgInput) {
        event.preventDefault();
        let msgContent = msgInput.innerHTML;
        if (msgContent) {
            getContentMsgItem(personSend, msgContent);
            cleanValueScroll(msgInput);
        } else {
            alert("No input");
        }
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
