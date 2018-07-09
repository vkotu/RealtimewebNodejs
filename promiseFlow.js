function delay(num) {
    return new Promise(function (res, rej) {
        setTimeout(res, 1000);
    });
}

delay(1000)
.then(function () {
    console.log("first");
    return delay(1000);
})
.then(function () {
    console.log("second");
    return delay(1000);
})
.then(function () {
    console.log("third");
    return delay(1000);
})
.then(function () {
    console.log("done");
})