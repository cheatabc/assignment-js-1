const checkboxes = document.getElementsByName('name[]');
const table = document.getElementById('POITable');
const cell = document.getElementsByTagName('td');
const row = document.getElementsByTagName('tr');
var rowLength = row.length;
const inputPhone = document.getElementsByClassName("phone");
const inputMail = document.getElementsByClassName("mail");
cellEditable("click", true);
cellEditable("focusout", false);

function checkValidate(regex, text) {
    if (!regex.test(text)) {
        alert("Invalid field");
    }
}

function deleteOneRow(row) {
    var i = row.parentNode.parentNode.rowIndex;
    document.getElementById('POITable').deleteRow(i);
    rowLength--;
    cellEditable("click", true);
}

function deleteRows() {
    const tableRef = document.getElementById('POITable');
    const tbody = tableRef.querySelector("tbody");
    const checkedInputs = document.querySelectorAll('input[name="name[]"]:checked');
    Array.prototype.slice.call(checkedInputs)
        .forEach(input => {
            tbody.removeChild(input.parentNode.parentNode);
            rowLength--;
        });
    cellEditable("click", true);
    document.getElementById("select_all").checked = false;
}

function insRow() {
    var len = table.rows.length;
    const row = table.insertRow(len);
    const firstCell = row.insertCell(0);
    const secondCell = row.insertCell(1);
    const thirdCell = row.insertCell(2);
    const fourthCell = row.insertCell(3);
    const fifthCell = row.insertCell(4);
    firstCell.innerHTML = `<input type="checkbox" name="name[]" id="${len}" />`;
    secondCell.innerHTML = '<p style="width: 200px;" class="name"></p>';
    thirdCell.innerHTML = '<p style="width: 200px;" class="phone"></p>';
    fourthCell.innerHTML = '<p style="width: 200px;" class="mail"></p>';
    fifthCell.innerHTML = '<input type="button" class="delPOIbutton" value="Delete" onclick="deleteOneRow(this)" />';
    rowLength++;
    cellEditable("click", true);
    cellEditable("focusout", false);
}

function cellEditable(event, editStatus) {
    const regexPhone = /^[0][0-9]{9}/;
    const regexEmail =
        /^(([^<>()[\]\\.,;:\s@#\"]+(\.[^<>()[\]\\.,;:#\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const nameRegex = /^[a-zA-Z\s]*$/;
    for (let indexCell = 1; indexCell < cell.length - 1; indexCell++) {
        cell[indexCell].addEventListener(event, function() {
            cell[indexCell].contentEditable = editStatus;
            if (event == "focusout") {
                if ((cell[indexCell].children[0]).classList.contains("phone")) {
                    checkValidate(regexPhone, cell[indexCell].textContent);
                }
                if ((cell[indexCell].children[0]).classList.contains("mail")) {
                    checkValidate(regexEmail, cell[indexCell].textContent);
                }
                if ((cell[indexCell].children[0]).classList.contains("name")) {
                    checkValidate(nameRegex, cell[indexCell].textContent);
                }
            }
        });
    }
}

document.getElementById("select_all").onclick = function() {
    if (document.getElementById("select_all").checked) {
        for (var i = 0; i < checkboxes.length; i++) {
            checkboxes[i].checked = true;
        }
    } else {
        for (var i = 0; i < checkboxes.length; i++) {
            checkboxes[i].checked = false;
        }
    }
}