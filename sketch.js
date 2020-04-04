let bg;
let car;
let sensorDisplay;

function preload() {
    bg = loadImage('graphics/maps/loop.jpg');
}

function setup() {
    createCanvas(600, 400);
    pixelDensity(1);
    car = new Car(50,200, -90, 2);
    sensorDisplay = new SensorDisplay(20, 20);
}

function draw() {
    image(bg, 0, 0, 600, 400);
    
    car.render();
    car.move();
    //car.rotateCar(1);
    loadPixels();
    car.sense();
    car.stayInLane();

    sensorDisplay.showSensors(car.sensors);
}