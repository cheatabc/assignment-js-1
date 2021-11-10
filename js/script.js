const inputFullName = document.getElementById("inputFullName");
const inputEmail = document.getElementById("inputEmail");
const inputPhone = document.getElementById("inputPhone");
const inputBirthday = document.getElementById("inputBirthday");
const inputPassword = document.getElementById("inputPassword");
const inputConfirmPassword = document.getElementById("inputConfirmPassword");
const btnSubmit = document.querySelector(".btn-submit");
const btnReset = document.querySelector(".btn-reset");
const btnUpload = document.querySelector("#btn-upload");
const avatarUpload = document.querySelector(".avatar-upload");
const imgPreview = document.querySelector(".img-preview");
const iconUploadAvatar = document.querySelector(".icon-upload-avatar");
const avatarWrapper = document.querySelector(".avatar-wrapper");
const avatarCenter = document.querySelector(".avatar-center");
const resultFullName = document.querySelector(".fullname");
const resultEmail = document.querySelector(".email");
const resultPhone = document.querySelector(".phone");
const resultBirthday = document.querySelector(".birthday");

const nameRegex = /^[a-zA-Z\s]*$/;
const regexEmail =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const regexPhone = /^[0][0-9]{9}/;
const regexBirthday = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/;
const MAX_NAME_LENGTH = 30;
const MAX_EMAIL_LENGTH = 320;
const MAX_PHONE_LENGTH = 10;
const MAX_BIRTHDAY_LENGTH = 10;
const MIN_PASSWORD_LENGTH = 8;
const MAX_PASSWORD_LENGTH = 30;

(function() {
    document.querySelector("html").addEventListener("keydown", function(e) {
        if (e.key === "Shift") {
            // submitForm(e);
        } else if (e.key === "Delete") {
            resetData(e);
        }
    });
})();

inputFullName.addEventListener("input", function() {
    // MAX_NAME_LENGTH = 30;
    checkRequiredLength(inputFullName, "Full name", MAX_NAME_LENGTH);
    fieldInputValidation(inputFullName, removeAscent(nameRegex), "Name is invalid");
});

inputFullName.addEventListener("change", function() {
    if (inputFullName.value) {
        inputFullName.value = titleCase(inputFullName.value);
    }

});

inputEmail.addEventListener("input", function() {
    checkRequiredLength(inputEmail, "Email", MAX_EMAIL_LENGTH);
    fieldInputValidation(inputEmail, regexEmail, "Email is invalid");
});

inputPhone.addEventListener("input", function() {
    checkRequiredLength(inputPhone, "Phone", 10);
    fieldInputValidation(inputPhone, regexPhone, `Must start with 0`);
});

inputBirthday.addEventListener("input", function() {
    let inputDateSplit = this.value.split("-").reverse();
    let currentDate = new Date().getTime();
    let inputDate = new Date(inputDateSplit[0], inputDateSplit[1], inputDateSplit[2]).getTime();
    if (this.value.length == 2) {
        this.value += "-";
    }
    if (this.value.length == 5) {
        this.value += "-";
    }
    checkRequiredLength(inputBirthday, "Birthday", 10);
    fieldInputValidation(inputBirthday, regexBirthday, 'Invalid Birthday');
    // Check input future day
    if (inputDate > currentDate) toggleClassValidation(inputBirthday, 'No input future day!');
});

inputPassword.addEventListener("input", function() {
    if (
        inputPassword.value.trim().length >= MIN_PASSWORD_LENGTH &&
        inputPassword.value.trim().length <= MAX_PASSWORD_LENGTH
    ) {
        // start with letter
        if (!/^[a-zA-Z]{1}/.test(inputPassword.value.trim())) {
            return toggleClassValidation(
                inputPassword,
                "Password must start with letter - Suggest password : A@123456"
            );
        } else {
            toggleClassValidation(inputPassword);
        }

        // Contain special characters
        if (!/[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(
                inputPassword.value.trim()
            )) {
            return toggleClassValidation(
                inputPassword,
                "Password must contain special characters - Suggest password : A@123456"
            );
        } else {
            toggleClassValidation(inputPassword);
        }

        // Contain number
        if (!/[\d]/.test(inputPassword.value.trim())) {
            return toggleClassValidation(
                inputPassword,
                "Password must contain number characters - Suggest password : A@123456"
            );
        } else {
            toggleClassValidation(inputPassword);
        }

        // Contain text uppercase
        if (!/[A-Z]/.test(inputPassword.value.trim())) {
            return toggleClassValidation(
                inputPassword,
                "Password must contain uppercase characters - Suggest password : A@123456"
            );
        } else {
            toggleClassValidation(inputPassword);
        }
    } else {
        toggleClassValidation(inputPassword, "Password length 8 - 30 characters");
    }

});

// validate confirm password
inputConfirmPassword.addEventListener("input", function() {
    if (inputConfirmPassword.value !== inputPassword.value) {
        toggleClassValidation(inputConfirmPassword, "Password not match");
    } else {
        toggleClassValidation(inputConfirmPassword);
    }
});

// upload avatar
btnUpload.addEventListener("change", function() {
    const [file] = btnUpload.files;
    if (
        file &&
        (file.type == "image/jpeg" ||
            file.type == "image/png" ||
            file.type == "image/jpg")
    ) {
        avatarUpload.style.display = "block";
        avatarUpload.src = URL.createObjectURL(file);
        iconUploadAvatar.style.display = "none";
        avatarWrapper.style.borderColor = "green";
    } else {
        avatarWrapper.style.borderColor = "#f00";
        avatarWrapper.children[2].textContent = "Not file img";
        avatarWrapper.children[2].style.color = "#f00";
    }
});
btnSubmit.addEventListener("click", submitForm);
btnReset.addEventListener("click", resetData);

// toggle class validation
function toggleClassValidation(selector, textError = "") {
    if (textError) {
        selector.nextElementSibling.textContent = textError;
        selector.classList.add("is-invalid");
        selector.classList.remove("is-valid");

    } else {
        selector.classList.remove("is-invalid");
        selector.classList.add("is-valid");
        selector.nextElementSibling.textContent = "";
    }
}
// check max length of field
function checkRequiredLength(selector, field, maxLength) {
    if (selector.value.trim().length > maxLength) {
        return toggleClassValidation(
            selector,
            `${field} max length is ${maxLength} characters`
        );
    } else {
        return toggleClassValidation(selector);
    }

}
// check null field
function checkNullField(field, msgErr) {
    if (field.value.trim().length < 1) {
        toggleClassValidation(field, `${msgErr} is required`);
    }
}
// check regex
function fieldInputValidation(selector, regex, msgErr = "") {
    if (!regex.test(selector.value)) {
        return toggleClassValidation(selector, msgErr);
    }

    if (!selector.value) {
        selector.classList.remove("is-valid");
        selector.classList.remove("is-invalid");
        return;
    }

}
// uppercase each first letters
function titleCase(str) {
    let arrStr = str.toString().toLowerCase().split(" ");
    let result = "";
    arrStr.forEach((e) => {
        e = e.charAt(0).toUpperCase() + e.substr(1);
        result += e + " ";
    });
    return result;
}

function removeAscent(str) {
    str = str.toString();
    if (str === null || str === undefined) return str;
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/Đ/g, "D");
    return (str);
}

function submitForm(e) {
    e.preventDefault();
    checkNullField(inputFullName, "Full name");
    checkNullField(inputEmail, "Email");
    checkNullField(inputPhone, "Phone");
    checkNullField(inputBirthday, "Birthday");
    checkNullField(inputPassword, "Password");
    checkNullField(inputConfirmPassword, "Confirm password");

    const listInvalid = document.querySelectorAll("input.is-invalid");
    if (listInvalid.length) return;

    resultFullName.innerText = inputFullName.value;
    resultEmail.innerText = inputEmail.value;
    resultPhone.innerText =
        inputPhone.value.slice(0, 3) +
        "-" +
        inputPhone.value.slice(3, 6) +
        "-" +
        inputPhone.value.slice(6, 10);
    resultBirthday.innerText = inputBirthday.value
        .split("-")
        .join("/");

    if (avatarUpload.getAttribute("src") !== "#") {
        imgPreview.setAttribute("src", avatarUpload.getAttribute("src"));
        imgPreview.style.display = "block";
        avatarCenter.children[1].style.display = "none";
    }
}

function resetData(e) {
    e.preventDefault();
    const listValid = document.querySelectorAll("input.is-valid");
    const listInvalid = document.querySelectorAll("input.is-invalid");
    document.querySelectorAll("input").forEach((element) => {
        element.value = "";
    });
    listInvalid.forEach((element) => {
        element.classList.remove("is-invalid");
    });
    listValid.forEach((element) => {
        element.classList.remove("is-valid");
    });

    iconUploadAvatar.style.display = "block";
    avatarUpload.style.display = "none";
    avatarWrapper.style.borderColor = "#eee";
    avatarWrapper.children[2].textContent = "Avatar upload";
    avatarWrapper.children[2].style.color = "#212529";
}