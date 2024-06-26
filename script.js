let step = 1;
let orderDetails = {
    personalInfo: {
        fullName: "",
        email: "",
        phone: ""
    },
    subscriptionPeriod: "",
    planName: "",
    price: 0,
    addOns: {
        onlineService: false,
        largerStorage: false,
        customizableProfile: false
    }
};
let selectedPlanChoices = "monthly";

const monthlyPrices = {
    arcade: 9,
    advanced: 12,
    pro: 15
}

const addonPrices = {
    onlineService: 1,
    largerStorage: 1,
    customizableProfile: 2
}

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
    } else if (step === 2) {
        performStep2();
        selectStep();
    } else if (step === 3) {
        performStep3();
        selectStep();
    } else if (step === 4) {
        performStep4();
        selectStep();
    }
})

goBackButton.addEventListener('click', () => {
    step--;
    selectStep();
})