window.addEventListener("load", function() {
    const selectLocation = document.querySelector(".select-location");
    const listLocation = document.querySelectorAll(
        ".list-location .list-group-item"
    );
    selectLocation.addEventListener("change", function(e) {
        let selected = this.value;
        // clear active class
        listLocation.forEach((location) => {
            location.className = "list-group-item";
        });
        for (let index = 0; index < listLocation.length; index++) {
            if (selected === "even") {
                if (index % 2 !== 0) {
                    listLocation[index].className += " active";
                }
            } else if (selected === "odd") {
                if (index % 2 == 0) {
                    listLocation[index].className += " active";
                }
            } else if (selected === "Select location" || selected === "reset") {
                listLocation[index].className = "list-group-item";
            } else {
                listLocation[selected - 1].className += " active";
                return;
            }
        }
    });
});