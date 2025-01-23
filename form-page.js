const form = document.getElementById("form"); // for submition
const userName = document.getElementById("userName");
const password = document.getElementById("password");
const email = document.getElementById("email");
const confirmPassword = document.getElementById("confirmPassword");

const patterns = {
    userName: /^[a-zA-Z0-9]{3,16}$/, // 3-16 characters, letters and numbers only
    password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, // Minimum 8 characters, at least one letter and one number
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Basic email validation
};

const isValidFormObj = {
    userName: false,
    password: false,
    email: false,
    confirmPassword: false
};

for (const item of Object.keys(patterns)) { // מעבר על מערך המפתחות שיש באובייקט תבניות
    const input = form.elements[item];
    input.addEventListener('input', () => checkValidation(patterns[item], input));
}

function checkValidation(pattern, input) {
    const value = input.value;
    const error = document.getElementById(`${input.name}Error`);
    if (!pattern.test(value)) { //בודק אם הקלט תקין לתבנית הזו 
        //אם לא תקין
        input.classList.add('error-border');
        error.style.display = "block";
        isValidFormObj[input.name] = false;
    } else {
        //אם כן תקין
        input.classList.remove('error-border');
        input.classList.add('valid-border');
        error.style.display = "none";
        isValidFormObj[input.name] = true;
        input.style.backgroundColor = "#6aa8f03b";
    }
}
confirmPassword.addEventListener('input', () => {
    const value = confirmPassword.value;
    const error = document.getElementById(`confirmPasswordError`);
    if (isValidFormObj["password"] && (value === password.value)) {
        isValidFormObj["confirmPassword"] = true;
        confirmPassword.classList.remove('error-border');
        confirmPassword.classList.add('valid-border');
        error.style.display = "none";
    } else {
        confirmPassword.classList.add('error-border');
        confirmPassword.classList.remove('valid-border');
        error.style.display = "block";
        isValidFormObj["confirmPassword"] = false;
    }
})
// form.addEventListener('submit', (event) => {
//     event.preventDefault();
//     const isAllValid = Object.values(isValidFormObj).every(input => input);
//     if (isAllValid) {
//         console.log('tres bien')
//         alert("good");
//         resetForm();
//     } else {
//         resetForm();
//         // alert("not sented,try again");

//         // const submit = document.getElementById('submit');

//         //     const link = document.createElement('a');
//         //         link.href = "game.html";
//         //         link.click();

//     }
// })


function resetForm() {
    form.reset();
    for (const item of Object.keys(patterns)) {
        const input = form.elements[item];
        input.classList.remove("valid-border");
        isValidFormObj[item] = false;
    }
}
//////////local strorage//////////////

let registration = []

function setLocalStrorage(data) {
    let storage = localStorage.getItem('dataRegistration')
    const dataList = storage ? JSON.parse(storage) : []
    dataList.push(data)
    localStorage.setItem('dataRegistration', JSON.stringify(dataList))
}

const submit = document.getElementById('submit');
const registrationButton = document.getElementById("registrationButton");

registrationButton.addEventListener('click', () => {

    const formFooter = document.querySelectorAll('.registration');

    formFooter.forEach(element => {
        element.style.display = 'block'
    });

    submit.value = 'Register'

const loginButton = document.getElementById('logInButton');
loginButton.style.display = 'block'
})


form.addEventListener('submit', (event) => {
    if (submit.value === 'Register') {

        event.preventDefault();
        const isAllValid = Object.values(isValidFormObj).every(input => input);
        if (isAllValid) {
            let data = {
                userName: userName.value,
                password: password.value
            }
            setLocalStrorage(data);

            console.log('tres bien')
            alert("good");
            resetForm();
            const link = document.createElement('a');
            link.href = "game.html";
            link.click();

        } else {
            resetForm();
            alert("not sented,try again");
        }
    }

    if (submit.value === 'Log-in') {
        let storage = localStorage.getItem('dataRegistration');
        registration = JSON.parse(storage)

        let checker = registration.some(user => user.userName === userName.value && user.password === password.value)

        if (checker) {
            const link = document.createElement('a');
            link.href = "game.html";
            link.click();
        }
    }
})



if (submit.value === 'Log-in') {
    let storage = localStorage.getItem('dataRegistration');
    registration = JSON.parse(storage)

    let checker = registration.some(user => registration.userName === userName.value && registration.password === password.value)

    if (checker) {

    }
}