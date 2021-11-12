window.addEventListener("load", function() {
    const selectLocation = document.querySelector(".select-location");
    const listLocation = document.querySelectorAll(
        ".list-location .list-group-item"
    );
    selectLocation.addEventListener("change", function(e) {
        let selected = this.value;
        // clear active class
        for (let index = 0; index < listLocation.length; index++) {
            listLocation[index].className = "list-group-item";
        }
        if (selected === "reset" || selected === "Select location") {
            return selectLocation.selectedIndex = "0";
        }

        for (let index = 0; index < listLocation.length; index++) {
            if (selected === "even") {
                if (index % 2 != 0) {
                    listLocation[index].classList.add("active");
                }
            }
            if (selected === "odd") {
                if (index % 2 == 0) {
                    listLocation[index].classList.add("active");
                }
            }
            if (selected === (index + 1).toString()) {
                listLocation[selected - 1].classList.add("active");
            }
        }
    });
});
