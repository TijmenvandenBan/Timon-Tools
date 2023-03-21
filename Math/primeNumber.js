// Prime number worker

function nextPrime(number) {
    number++;
    while (!isPrime(number)) {
        number++;
    }
    return number;
}


function isPrime(number) {
    for (let i = 2; i < number; i++) {
        if (number % i === 0) {
            return false;
        }
    }
    return true;
}

onmessage = function(msg) {
    let asw = nextPrime(msg.data.number);
    postMessage({asw});
}