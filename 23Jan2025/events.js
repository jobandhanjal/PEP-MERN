const handleSubmit = (e) => {
    e.preventDefault();

    const selectInput = e.target[3];
    const selectedValue = selectInput.value;

    if (selectedValue === "NA") {
        alert("Please select your profession.");
    } else {
        window.open("./thank.html", "_self");
    }
};

const handleSelectProfession = (e) => {
    const selectedValue = e.target.value;
    const collegeNameInput = document.querySelector('input[name="college-name"]');
    const empEmailInput = document.querySelector('input[name="emp-email"]');
    const gstNumberInput = document.querySelector('input[name="gst-number"]');

    collegeNameInput.disabled = selectedValue !== "std";
    empEmailInput.disabled = selectedValue !== "emp";
    gstNumberInput.disabled = selectedValue !== "bsn";
};