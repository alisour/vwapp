/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}


// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}
function handleForm(event) { event.preventDefault(); }

//html injection reflected (GET)
function html_injection_get() {
    var form = document.getElementById("html_injection_get_form");
    document.getElementById('html_injection_get').innerHTML = 'Hello, ' + document.getElementById('firstname').value + ' ' + document.getElementById('lastname').value;

    form.addEventListener('submit', handleForm);
}

//unvalidated Directs Forwards (1)
function unvalidatedDirectsForwads1(link) {
    window.location = link;
}

function weakPassword() {
    var form = document.getElementById("weak_password_form");
    form.addEventListener('submit', handleForm);


    let username = 'admin';
    let password = username;

    if (document.getElementById('firstname').value == username && document.getElementById('lastname').value == password) {
        document.getElementById('weak_password_check').innerHTML = '<h2 style="color: rgb(21, 138, 21);">YOU LOGGED IN!</h2>'
    } else {
        document.getElementById('weak_password_check').innerHTML = '<h2 style="color: rgb(182, 19, 19);">INVALID CREDENTIALS</h2>'
    }


}


