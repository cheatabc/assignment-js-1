const checkboxes = document.getElementsByName('name[]');
const table = document.getElementById('POITable');
const cell = document.getElementsByTagName('td');
const row = document.getElementsByTagName('tr');
var rowLength = row.length;

cellEditable("dblclick", true);
cellEditable("focusout", false);

function deleteOneRow(row) {
    var i = row.parentNode.parentNode.rowIndex;
    document.getElementById('POITable').deleteRow(i);
    rowLength--;
    cellEditable("dblclick", true);
}

function deleteRows() {
    const tableRef = document.getElementById('POITable');
    const tbody = tableRef.querySelector("tbody");
    const checkedInputs = document.querySelectorAll('input[name="name[]"]:checked');
    Array.prototype.slice.call(checkedInputs)
        .forEach(input => tbody.removeChild(input.parentNode.parentNode));
    cellEditable("dblclick", true);
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
    fourthCell.innerHTML = '<p style="width: 200px;" class="birthday"></p>';
    fifthCell.innerHTML = '<input type="button" class="delPOIbutton" value="Delete" onclick="deleteOneRow(this)" />';
    rowLength++;
    cellEditable("dblclick", true);
    cellEditable("focusout", false);
}

function cellEditable(event, editStatus) {
    for (let indexRow = 0; indexRow < rowLength; indexRow++) {
        for (let indexCell = 0; indexCell < cell.length; indexCell++) {
            cell[indexCell].addEventListener(event, function() {
                cell[indexCell].contentEditable = editStatus;
            });
        }
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
