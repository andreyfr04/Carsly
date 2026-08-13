const JOURNEY_MULTIPLIER = {
    city: 0.8,
    mixed: 1.0,
    highway: 1.2
    
};


export function calculateMaintenanceCost(journeyType, baseCost) {
    const multiplier = JOURNEY_MULTIPLIER[journeyType] || 1;   // look up the multiplier based on the journey type, default to 1 if not found
    const intervalMiles = Math.round(type.baseMiles * multiplier);   
    const intervalMonths = Math.round(type.baseMonths * multiplier); // apply multiplier to miles/months

    const baseMileage = car.mileage; 
    const baseDate = car.registeredDate;

    const dueMileage = baseMileage + intervalMiles;  //simple calculation to determine when the next maintenance is due based on mileage
    const mileageRemaining = dueMileage - car.mileage; // how many miles remaining until maintenance

    const registeredOn = new Date(baseDate);
    const dueDate = new Date(registeredOn);
    dueDate.setMonth(dueDate.getMonth() + intervalMonths);  

    const today = new Date();
    const daysRemainingByTime = Math.round((dueDate - today) / (1000 * 60 * 60 * 24)); // we get milliseconds here so we convert into days remaining

    const daysRemainingByMileage = car.weeklyMileage > 0
       ? Math.round((mileageRemaining / car.weeklyMileage) * 7) // convert to  days
       : 9999;

    const daysUntilDue = Math.min(daysRemainingByTime, daysRemainingByMileage); // take the smallest number on a "whichever comes first" basis

    let status = 'ok';
    if( daysUntilDue <= 0) status = 'overdue';
    else if (daysUntilDue <= 30) status = 'due soon';

    return {
        type,
        intervalMiles,
        dueMileage,
        mileageRemaining,
        daysUntilDue,
        status,

    };
}



