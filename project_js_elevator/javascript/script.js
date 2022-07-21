const lift = document.getElementById("lift");
const liftText = document.getElementById("usedLiftAndText");
const floor = document.getElementById("floor");
const result = document.getElementById("result");
const selectFloor = document.getElementById("selectFloor");
const goBtn = document.getElementById("goBtn");

let toFloor = 0;
let onMotion = false;
let motion = null;

window.addEventListener("DOMContentLoaded", () => {
    onMotion = true;
    motion = setInterval(animateUp, 10);

    // the event which will be executed after the button click //
    goBtn.addEventListener("click", () => {
        let floor = parseInt(selectFloor.value);
        let y = liftText.getAttribute("y");
        toFloor = (floor * 50) - 50;
        if (onMotion == true) {
            result.innerText = "Elevator is on movement";
        } else {
            onMotion = true;
            motion = setInterval(animateTo, 10);
        }
    })
})

// function of the elevator animation //
const animateTo = () => {
    let y = parseInt(liftText.getAttribute("y"));
    let newY = 0;
    if (toFloor > y) {
        newY = parseInt(y) + 1;
    } else {
        newY = parseInt(y) - 1;
    }
    if (newY == toFloor) {
        let floorNum = (newY + 50) / 50;
        onMotion = false;
        result.innerText = "Elevator is stopped";
        clearInterval(motion);
        motion = null;
        lift.style.fill = "green";
    } else {
        lift.style.fill = "black";
        result.innerText = "Elevator is on movement";
        // setting the floor number and showing the green color/light
        if ((newY + 50) % 50 == 0) {
            lift.style.fill = "green";
        } else {
            lift.style.fill = "black";
        }

        let floorNum = (newY + 50) / 50;
        // use setFloor function to set the floor number

        // change the y attribute of svg element g which has a rect and text
        liftText.setAttribute("y", newY);

    }
}

// function with animation to put the elevator up
const animateUp = () => {
    let y = liftText.getAttribute("y");
    let newY = parseInt(y) - 1;
    animate(newY);
}

// function with animation to put the elevator down
const animateDown = () => {
    let y = liftText.getAttribute("y");
    let newY = parseInt(y) + 1;
    animate(newY);
}


// function to put the elevator up/down and give the position as an atribut
const animate = newY => {
    if (newY > 450) {
        onMotion = false;
        result.innerText = "Elevator is down";
        result.style.color = "red";
        clearInterval(motion); //todo
        motion = null;
    } else if (newY < 0) {
        onMotion = false;
        result.innerText = "Elevator is up";
        result.style.color = "green";
        clearInterval(motion); //todo
        motion = null;
    } else {
        result.innerText = "Elevator is moving";

        // gives the green color when the elevator goes to the selected floor
        if ((newY + 50) % 50 == 0) {
            lift.style.fill = "green";
        } else {
            lift.style.fill = "black";
        }

        let floorNum = (newY + 50) / 50;

        // change the y attribute of svg element g which has a rect and text
        liftText.setAttribute("y", newY);
    }
}