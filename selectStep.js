let planEventListenersAdded = false;
let toggleButtonEventListener = false;
let addOnsEventListenersAdded = false;
let changePlanEventListenerAdded = false;

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
    step4BulletElement.classList.remove('selected-step-bullet');
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
                orderDetails.price = monthlyPrices[cardID];

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
                selectedPlanChoices = "yearly";
                orderDetails.subscriptionPeriod = 'yearly';
            } else if (selectedPlanChoices === "yearly") {
                document.getElementById('monthly-plan').classList.add('selected-plan-choices');
                document.getElementById('yearly-plan').classList.remove('selected-plan-choices');
                document.getElementById('switch-month-year').classList.toggle('float-right');
                for (let i = 0; i <= Object.keys(monthlyPrices).length - 1; i++) {
                    pricesElements[i].innerText = `$${monthlyPrices[Object.keys(monthlyPrices)[i]]}/mo`;
                }
                selectedPlanChoices = 'monthly';
                orderDetails.subscriptionPeriod = 'monthly';
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
    step4BulletElement.classList.remove('selected-step-bullet');

    const addOnsElements = document.querySelectorAll('.addon-option');

    if (!addOnsEventListenersAdded) {
        for (let addOn of addOnsElements) {
            addOn.addEventListener('click', () => {
                addOn.classList.toggle("selected-plan");
                addOn.children[0].children[0].checked = !addOn.children[0].children[0].checked;
                let addonKey = addOn.id.split("-").map((x, i) => i === 1 ? x = x.charAt(0).toUpperCase() + x.slice(1) : x).join("");
                orderDetails.addOns[addonKey] = !orderDetails.addOns[addonKey];
            })
        }
        addOnsEventListenersAdded = true;
    }

}

function selectStep4() {
    step1Element.classList.add('hidden');
    step2Element.classList.add('hidden');
    step3Element.classList.add('hidden');
    step4Element.classList.remove('hidden');
    step5Element.classList.add('hidden');
    step3BulletElement.classList.remove('selected-step-bullet');
    step4BulletElement.classList.add('selected-step-bullet');

    let planPrice = orderDetails.subscriptionPeriod === "monthly" ? orderDetails.price : orderDetails.price * 12;

    document.getElementById('plan-name').innerHTML = `${orderDetails.planName[0].toUpperCase() + orderDetails.planName.slice(1)} (${orderDetails.subscriptionPeriod[0].toUpperCase() + orderDetails.subscriptionPeriod.slice(1)})`;
    document.getElementById('plan-total-price').innerHTML = `$${planPrice} ${orderDetails.subscriptionPeriod === "monthly" ? "/mo" : "/y"}`

    if (!changePlanEventListenerAdded) {
        document.getElementById("change-plan").addEventListener('click', () => {
            step = 2;
            changePlanEventListenerAdded = true;
            selectStep();
        })
    }

    let totalPrice = planPrice;

    if (orderDetails.addOns.onlineService || orderDetails.addOns.largerStorage || orderDetails.addOns.customizableProfile) {
        document.getElementById('hr').classList.remove('hidden');
        document.getElementById("summary-addons").innerHTML = "";
        for (item in orderDetails.addOns) {
            if (orderDetails.addOns[item]) {
                let itemName = item.split(/(?=[A-Z])/).map((x,i) => i === 0 ? x[0].toUpperCase() + x.slice(1) : x[0].toLowerCase() + x.slice(1)).join(" ");
                let itemPrice = orderDetails.subscriptionPeriod === "monthly" ? addonPrices[item] : addonPrices[item] * 12;
                totalPrice += itemPrice;

                document.getElementById("summary-addons").innerHTML += 
                    `<div class="row mx-auto align-items-center p-1">
                        <div class="col-9">
                            <div id="selected-addon-name">${itemName}</div>
                        </div>
                        <div class="col-3" id="selected-addon-price">$${itemPrice} ${orderDetails.subscriptionPeriod === "monthly" ? `/mo` : `/y`}</div>
                    </div>`;
                    
            }
        }
    }

    document.getElementById('total').innerHTML = `Total (per ${orderDetails.subscriptionPeriod === 'monthly' ? "month" : "year"})`;
    document.getElementById('total-price').innerHTML = `$${totalPrice} ${orderDetails.subscriptionPeriod === "monthly" ? `/mo` : `/y`}`;
}

function selectStep5() {
    step4Element.classList.add('hidden');
    step5Element.classList.remove('hidden');
    step4BulletElement.classList.add('selected-step-bullet');

    document.getElementById('buttons-menu').classList.add('hidden');
    
}

function selectStep() {
    if (step === 1) {
        selectStep1();
    } else if (step === 2) {
        selectStep2();
    } else if (step === 3) {
        selectStep3();
    } else if (step === 4) {
        selectStep4();
    } else if (step === 5) {
        selectStep5();
    }
}