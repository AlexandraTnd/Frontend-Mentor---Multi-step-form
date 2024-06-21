function performStep2() {
    if (orderDetails.planName === '') {
        document.getElementById('plan-warning').classList.remove('hidden');
    } else {
        document.getElementById('plan-warning').classList.add('hidden');
        step++;
    }
}