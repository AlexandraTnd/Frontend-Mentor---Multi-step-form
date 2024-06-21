let step = 1;
let orderDetails = {
    personalInfo: {
        'fullName': "",
        'email': "",
        'phone': ""
    },
    selectedPlanChoices: "monthly"
};

const step1Element = document.getElementById('step1');
const step2Element = document.getElementById('step2');
const step3Element = document.getElementById('step3');
const step4Element = document.getElementById('step4');
const step5Element = document.getElementById('step5');

const step1BulletElement = document.getElementById('step1-bullet');
const step2BulletElement = document.getElementById('step2-bullet');
const step3BulletElement = document.getElementById('step3-bullet');
const step4BulletElement = document.getElementById('step4-bullet');

const nextStepButton = document.getElementById('next-step-button');
const goBackButton = document.getElementById('go-back-button');

document.getElementById('right-side-content').style.height = document.getElementById('step-menu').offsetHeight + "px";


selectStep();

nextStepButton.addEventListener('click', () => {
    if (step === 1) {
        performStep1();
        selectStep();
    }
})

goBackButton.addEventListener('click', () => {
    step--;
    selectStep();
})