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

        orderDetails.personalInfo.fullName = nameInput.value;
        orderDetails.personalInfo.email = emailInput.value;
        orderDetails.personalInfo.phone = phoneInput.value;

        step++;
        step1Element.classList.add('hidden');
        step2Element.classList.remove('hidden');
        step3Element.classList.add('hidden');
        step4Element.classList.add('hidden');
        step5Element.classList.add('hidden');
        step1BulletElement.classList.remove('selected-step-bullet');
        step2BulletElement.classList.add('selected-step-bullet');
        goBackButton.classList.remove('hidden');
        document.getElementById('buttons-menu').classList.remove("justify-content-end");
        document.getElementById('buttons-menu').classList.add('justify-content-between');

        console.log(orderDetails);
    }
}