let step = 0;
let orderDetails = {};

const step1Element = document.getElementById('step1');
const step2Element = document.getElementById('step2');
const step3Element = document.getElementById('step3');
const step4Element = document.getElementById('step4');
const step5Element = document.getElementById('step5');

const step1BulletElement = document.getElementById('step1-bullet');

const nextStepButton = document.getElementById('next-step-button');

document.getElementById('step1').style.height = document.getElementById('step-menu').offsetHeight + "px";

if (step === 0) {
    step2Element.classList.add('hidden');
    step3Element.classList.add('hidden');
    step4Element.classList.add('hidden');
    step5Element.classList.add('hidden');
    step1BulletElement.classList.add('selected-step-bullet');
}

function performStep1(e) {
    e.preventDefault();
    let hasName = false;
    let hasEmail = false;
    let hasPhone = false;

    const nameInput = document.getElementById('full-name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');

    if (nameInput.value === '') {
        document.getElementById('name-required').classList.remove('hidden');
        nameInput.classList.add('input-warning');
    } else {
        document.getElementById('name-required').classList.add('hidden');
        nameInput.classList.remove('input-warning');
        hasName = true;
    }

    if (emailInput.value === '') {
        document.getElementById('email-required').classList.remove('hidden');
        document.getElementById('email-valid').classList.add('hidden');
        emailInput.classList.add('input-warning');
    } else {
        document.getElementById('email-required').classList.add('hidden');
        emailInput.classList.remove('input-warning');
        const emailRegexFormat = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (emailRegexFormat.test(emailInput.value)) {
            hasEmail = true;
            document.getElementById('email-required').classList.add('hidden');
            document.getElementById('email-valid').classList.add('hidden');
            emailInput.classList.remove('input-warning');
        } else {
            document.getElementById('email-valid').classList.remove('hidden');
            document.getElementById('email-required').classList.add('hidden');
            emailInput.classList.add('input-warning');
        }
    }

    if (phoneInput.value === "") {
        document.getElementById('phone-required').classList.remove('hidden');
        document.getElementById('phone-valid').classList.add('hidden');
        phoneInput.classList.add('input-warning');
    } else {
        const phoneRegexFormat = /^\+\d{1,3}\d{9}$/;
        if (phoneRegexFormat.test(phoneInput.value)) {
            hasPhone = true;
            document.getElementById('phone-required').classList.add('hidden');
            document.getElementById('phone-valid').classList.add('hidden');
            phone.classList.remove('input-warning');
        } else {
            document.getElementById('phone-valid').classList.remove('hidden');
            document.getElementById('phone-required').classList.add('hidden');
            phone.classList.add('input-warning');
        }
    }

    if (hasEmail && hasName && hasPhone) {
        let personalInfo = {
            'fullName': nameInput.value,
            'email': emailInput.value,
            'phone': phoneInput.value
        }
        orderDetails = { personalInfo };
        step++;
        console.log(orderDetails);
    }
}

nextStepButton.addEventListener('click', (e) => {
    if (step === 0) {
        performStep1(e);
    }

})