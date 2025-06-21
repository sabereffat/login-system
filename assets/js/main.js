var signupName = document.getElementById('signupName');
var signupEmail = document.getElementById('signupEmail');
var signupPassword = document.getElementById('signupPassword');
var signinEmail = document.getElementById('signinEmail');
var signinPassword = document.getElementById('signinPassword');
var signupBtn = document.getElementById('signupBtn');
var loginBtn = document.getElementById('loginBtn');
var logoutBtn = document.getElementById('logoutBtn');
var validEmail = false;
var validName = false;
var validPassword = false;


var users = [];

if (localStorage.getItem('usersDB')) {
    users = JSON.parse(localStorage.getItem('usersDB'))
}

function isEmpty() {
    if (signupName.value == "" || signupEmail.value == "" || signupPassword.value == "") {
        return false
    } else {
        return true
    }
}

if (signupBtn) {
    signupBtn.addEventListener('click', function () {
        if (validName & validEmail & validPassword) {
            var user = {
                username: signupName.value,
                email: signupEmail.value,
                password: signupPassword.value
            }
            if (isEmpty() == false) {
                signupName.classList.add("is-invalid");
                signupEmail.classList.add("is-invalid");
                signupPassword.classList.add("is-invalid");
            } else {
                if (isEmailExist() == false) {
                    signupEmail.classList.add("is-invalid");
                    document.getElementById('exist').innerHTML = '<span class="text-danger m-3">sorry email already exists.</span>';

                } else {
                    users.push(user);
                    localStorage.setItem('usersDB', JSON.stringify(users));
                    document.getElementById('exist').innerHTML = '<span class="text-success m-3">Success</span>';
                    clearInputs();

                }
            }

        } else {
            document.getElementById('exist').innerHTML = '<span class="text-danger m-3">please type a valid data.</span>';
        }

    });
}

function clearInputs() {
    signupName.value = '';
    signupEmail.value = '';
    signupPassword.value = '';
    signupName.classList.remove("is-invalid");
    signupName.classList.remove("is-valid");
    signupEmail.classList.remove("is-invalid");
    signupEmail.classList.remove("is-valid");
    signupPassword.classList.remove("is-invalid");
    signupPassword.classList.remove("is-valid");
}

function clearInputsLogin() {
    signinEmail.value = '';
    signinPassword.value = '';
}


if (loginBtn) {
    loginBtn.addEventListener('click', function () {
        var email = signinEmail.value;
        var password = signinPassword.value;
        var logged = false;

        for (let i = 0; i < users.length; i++) {
            if (users[i].email.toLowerCase() == email.toLowerCase() && users[i].password.toLowerCase() == password.toLowerCase()) {
                logged = true;
                localStorage.setItem('sessionUsername', users[i].username)
                console.log('logged');

            }
        }

        if (logged) {
            window.location.href = 'home.html';
        } else {
            document.getElementById('incorrect').innerHTML = '<span class="text-danger m-3">incorrect email or password</span>';
        }


        clearInputsLogin();
    });
}

var userName = localStorage.getItem('sessionUsername')
if (userName) {
    document.getElementById('username').innerHTML = "Welcome " + userName;
}

if (logoutBtn) {
    logoutBtn, addEventListener('click', function () {
        localStorage.removeItem('sessionUsername');
    })
}

/* ---------------- Signup Validations -------------------- */
if (signupEmail) {
    signupEmail.addEventListener('input', function () {
        validateEmail(signupEmail.value);
    });
}
if (signupName) {
    signupName.addEventListener('input', function () {
        validateName(signupName.value);
    });
}

if (signupPassword) {
    signupPassword.addEventListener('input', function () {
        validatePassword(signupPassword.value);
    });
}

function validateName(username) {
    if (username != '') {
        var nameRegex = /^\w{3,}(\s+\w+)*$/;
        if (nameRegex.test(username)) {
            signupName.classList.add("is-valid");
            signupName.classList.remove("is-invalid");
            validName = true;
            console.log(validName);
            
        } else {
            signupName.classList.add("is-invalid");
            signupName.classList.remove("is-valid");
        }
    } else {
        signupName.classList.remove("is-invalid");
        signupName.classList.remove("is-valid");
    }

}

function validateEmail(email) {
    if (email != '') {
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(email)) {
            signupEmail.classList.add("is-valid");
            signupEmail.classList.remove("is-invalid");
            validEmail = true;
        } else {
            signupEmail.classList.add("is-invalid");
            signupEmail.classList.remove("is-valid");
        }
    } else {
        signupEmail.classList.remove("is-invalid");
        signupEmail.classList.remove("is-valid");
    }

}

function validatePassword(password) {
    if (password != '') {
        var passwordRegex = /^(?=(?:[^0-9]*[0-9]){6}).*$/;
        if (passwordRegex.test(password)) {
            signupPassword.classList.add("is-valid");
            signupPassword.classList.remove("is-invalid");
            validPassword = true;
        } else {
            signupPassword.classList.add("is-invalid");
            signupPassword.classList.remove("is-valid");
        }
    } else {
        signupPassword.classList.remove("is-invalid");
        signupPassword.classList.remove("is-valid");
    }

}

function isEmailExist() {
    for (var i = 0; i < users.length; i++) {
        if (users[i].email.toLowerCase() == signupEmail.value.toLowerCase()) {
            return false;
        }
    }
}