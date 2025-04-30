function content() {
    const password = document.getElementById("first").value;
    const confirm = document.getElementById("last").value;
    if (password !== confirm) {
        alert("Use the same password");
    }
}