/********* create variables *********/
// useful variables might be: the cost per day, the number of days selected, and elements on the screen that will be clicked or will need to be modified. 
// Do any of these variables need to be initialized when the page is loaded? 
// When do they need to be reset or updated?
const dayCounter = {
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false
};
const rate = {
    half: 20,
    full: 35
};
let selectedDays = [];
let dailyRate = rate.full;



/********* colour change days of week *********/
// when the day buttons are clicked, we will apply the "clicked" class to that element, and update any other relevant variables. Then, we can recalculate the total cost.
// added challenge: don't update the dayCounter if the same day is clicked more than once. hint: .classList.contains() might be helpful here!
const days = document.querySelectorAll('.day-selector li');

days.forEach(day => {
    day.addEventListener('click', function() {
        const dayId = this.id;
        
        if (!dayCounter[dayId]) {
            this.classList.add('clicked');
            dayCounter[dayId] = true;
            selectedDays.push(dayId);
        } else {
            this.classList.remove('clicked');
            dayCounter[dayId] = false;
            selectedDays = selectedDays.filter(day => day !== dayId);
        }
        updateCost();
    });
});




/********* clear days *********/
// when the clear-button is clicked, the "clicked" class is removed from all days, any other relevant variables are reset, and the calculated cost is set to 0.
document.getElementById('clear-button').addEventListener('click', function() {
    days.forEach(day => day.classList.remove('clicked'));
    selectedDays = [];
    updateCost();
});





/********* change rate *********/
// when the half-day button is clicked, set the daily rate to $20, add the "clicked" class to the "half" element, remove it from the "full" element, and recalculate the total cost.
document.getElementById('half').addEventListener('click', function() {
    dailyRate = rate.half;
    document.getElementById('half').classList.add('clicked');
    document.getElementById('full').classList.remove('clicked');
    updateCost();
});


// when the full-day button is clicked, the daily rate is set back to $35, the clicked class is added to "full" and removed from "half", and the total cost is recalculated.
document.getElementById('full').addEventListener('click', function() {
    dailyRate = rate.full;
    document.getElementById('full').classList.add('clicked');
    document.getElementById('half').classList.remove('clicked');
    updateCost();
});




/********* calculate *********/
// when a calculation is needed, set the innerHTML of the calculated-cost element to the appropriate value
function updateCost() {
    const calculatedCost = selectedDays.length * dailyRate;
    document.getElementById('calculated-cost').textContent = calculatedCost;
}