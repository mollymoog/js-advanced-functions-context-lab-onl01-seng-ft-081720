/* Your Code Here */

let createEmployeeRecord = function(array) {
    return {
        firstName: array[0], 
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployeeRecords = function(arrayArray) {
    return arrayArray.map(array => createEmployeeRecord(array))
}

function createTimeInEvent(dateStamp) {
    let [date, time] = dateStamp.split(" ");
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(time, 10),
        date
    })
    return this;
}

function createTimeOutEvent(dateStamp) {
    let [date, time] = dateStamp.split(" ");
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(time, 10),
        date
    })
    return this;
}

function hoursWorkedOnDate(dateStamp) {

    let inObj = this.timeInEvents.find(function(k) {
        return k.date === dateStamp;
    });
    let inHour = inObj.hour / 100;

    let outObj = this.timeOutEvents.find(function(k) {
        return k.date === dateStamp;
    });
    let outHour = outObj.hour / 100;

    return (outHour - inHour);
}

function wagesEarnedOnDate(dateStamp) {
    let payPerHour = this.payPerHour;
    let hWork = hoursWorkedOnDate.call(this, dateStamp);

    return (parseFloat((payPerHour * hWork).toString()));
}

let findEmployeeByFirstName = function(srcArray, firstName) {
    return srcArray.find(function(empObj) {
        return empObj.firstName == firstName;
    }
    )
}

let calculatePayroll = function(srcArray) {
    return srcArray.reduce(function(total, empObj) {
        return total + allWagesFor.call(empObj);
    }, 0)
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}