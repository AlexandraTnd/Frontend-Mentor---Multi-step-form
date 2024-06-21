function selectStep() {
    if (step === 1) {
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
    } else if (step == 2) {
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

        if (orderDetails.selectedPlanChoices === "monthly") {
            document.getElementById('monthly-plan').classList.add('selected-plan-choices');
            document.getElementById('yearly-plan').classList.remove('selected-plan-choices');
        } else if (orderDetails.selectedPlanChoices === "yearly") {
            document.getElementById('monthly-plan').classList.remove('selected-plan-choices');
            document.getElementById('yearly-plan').classList.add('selected-plan-choices');
        }

        const togglePlanChoices = document.getElementById("toggle-month-year");
        const pricesElements = document.querySelectorAll('.plan-price');


        togglePlanChoices.addEventListener('click', () => {
            if (orderDetails.selectedPlanChoices === "monthly") {
                document.getElementById('monthly-plan').classList.remove('selected-plan-choices');
                document.getElementById('yearly-plan').classList.add('selected-plan-choices');
                document.getElementById('switch-month-year').classList.toggle('float-right');
                for (let i = 0; i <= orderDetails.prices.length - 1; i++) {
                    pricesElements[i].innerText = `$${orderDetails.prices[i] * 12}/y`;
                }
                orderDetails.selectedPlanChoices = 'yearly';
            } else if (orderDetails.selectedPlanChoices === "yearly") {
                document.getElementById('monthly-plan').classList.add('selected-plan-choices');
                document.getElementById('yearly-plan').classList.remove('selected-plan-choices');
                document.getElementById('switch-month-year').classList.toggle('float-right');
                for (let i = 0; i <= orderDetails.prices.length - 1; i++) {
                    pricesElements[i].innerText = `$${orderDetails.prices[i]}/mo`;
                }
                orderDetails.selectedPlanChoices = 'monthly';
            }
        })


    }
}