let planEventListenersAdded = false;
let toggleButtonEventListener = false;
let addOnsEventListenersAdded = false;

function selectStep1() {
    step1Element.classList.remove('hidden');
    step1BulletElement.classList.add('selected-step-bullet');
    step2Element.classList.add('hidden');
    step2BulletElement.classList.remove('selected-step-bullet');
    step3Element.classList.add('hidden');
    step4Element.classList.add('hidden');
    step5Element.classList.add('hidden');
    goBackButton.classList.add('hidden');
    document.getElementById('buttons-menu').classList.remove("justify-content-between");
    document.getElementById('buttons-menu').classList.add('justify-content-end');
}

function selectStep2() {
    step1Element.classList.add('hidden');
    step2Element.classList.remove('hidden');
    step3Element.classList.add('hidden');
    step4Element.classList.add('hidden');
    step5Element.classList.add('hidden');
    step1BulletElement.classList.remove('selected-step-bullet');
    step2BulletElement.classList.add('selected-step-bullet');
    step3BulletElement.classList.remove('selected-step-bullet');
    goBackButton.classList.remove('hidden');
    document.getElementById('buttons-menu').classList.remove("justify-content-end");
    document.getElementById('buttons-menu').classList.add('justify-content-between');

    if (selectedPlanChoices === "monthly") {
        document.getElementById('monthly-plan').classList.add('selected-plan-choices');
        document.getElementById('yearly-plan').classList.remove('selected-plan-choices');
    } else if (selectedPlanChoices === "yearly") {
        document.getElementById('monthly-plan').classList.remove('selected-plan-choices');
        document.getElementById('yearly-plan').classList.add('selected-plan-choices');
    }

    const togglePlanChoices = document.getElementById("toggle-month-year");
    const pricesElements = document.querySelectorAll('.plan-price');
    const planCardElements = document.querySelectorAll('.plan-card');

    if (!planEventListenersAdded) {
        for (const card of planCardElements) {
            card.addEventListener('click', (e) => {
                let cardID;

                if (e.target.id === "") {
                    cardID = e.target.parentNode.id;
                } else {
                    cardID = e.target.id;
                }

                function selectCard() {
                    for (cardElement of planCardElements) {
                        if (cardID === cardElement.id) {
                            cardElement.classList.add('selected-plan');
                        } else {
                            cardElement.classList.remove('selected-plan');
                        }
                    }
                }
                selectCard();
                orderDetails.subscriptionPeriod = selectedPlanChoices;
                orderDetails.planName = cardID;
                if (selectedPlanChoices === "monthly") {
                    orderDetails.price = monthlyPrices[cardID];
                } else if (selectedPlanChoices === "yearly") {
                    orderDetails.price = monthlyPrices[cardID] * 12;
                }
            })
            planEventListenersAdded = true;
        }
    }
    if (!toggleButtonEventListener) {
        togglePlanChoices.addEventListener('click', () => {
            if (selectedPlanChoices === "monthly") {
                document.getElementById('monthly-plan').classList.remove('selected-plan-choices');
                document.getElementById('yearly-plan').classList.add('selected-plan-choices');
                document.getElementById('switch-month-year').classList.toggle('float-right');
                for (let i = 0; i <= Object.keys(monthlyPrices).length - 1; i++) {
                    pricesElements[i].innerText = `$${monthlyPrices[Object.keys(monthlyPrices)[i]] * 12}/y`;
                }
                selectedPlanChoices = 'yearly';
            } else if (selectedPlanChoices === "yearly") {
                document.getElementById('monthly-plan').classList.add('selected-plan-choices');
                document.getElementById('yearly-plan').classList.remove('selected-plan-choices');
                document.getElementById('switch-month-year').classList.toggle('float-right');
                for (let i = 0; i <= Object.keys(monthlyPrices).length - 1; i++) {
                    pricesElements[i].innerText = `$${monthlyPrices[Object.keys(monthlyPrices)[i]]}/mo`;
                }
                selectedPlanChoices = 'monthly';
            }
        })
        toggleButtonEventListener = true;
    }

}

function selectStep3() {
    step1Element.classList.add('hidden');
    step2Element.classList.add('hidden');
    step3Element.classList.remove('hidden');
    step4Element.classList.add('hidden');
    step5Element.classList.add('hidden');
    step2BulletElement.classList.remove('selected-step-bullet');
    step3BulletElement.classList.add('selected-step-bullet');

    const addOnsElements = document.querySelectorAll('.addon-option');

    for (let addOn of addOnsElements) {
        addOn.addEventListener('click', () => {
            addOn.classList.toggle("selected-plan");
            console.log(addOn.children[0].children[0])
            addOn.children[0].children[0].checked = !addOn.children[0].children[0].checked;



            let addonKey = addOn.id.split("-").map((x,i) => i === 1 ? x[i] = x[i].charAt(0).toUpperCase() + x[i].slice(1) : x[i]).join("");
            console.log(addOn.id);
            orderDetails.addOns[addonKey] = !orderDetails.addOns[addonKey];
            console.log(orderDetails.addOns[addonKey]);
        })
    }
}

function selectStep() {
    if (step === 1) {
        selectStep1();
    } else if (step === 2) {
        selectStep2();
    } else if (step === 3) {
        selectStep3();
    }
}