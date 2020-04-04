let bg;
let car;
let sensorDisplay;
let w = 600;
let h = 400;
let maps;
let mapSelect;
let speedSlider;

function preload() {
    bg = loadImage('graphics/maps/loop.jpg');
}

function setup() {
    createCanvas(w, h);
    pixelDensity(1);
    car = new Car(50,200, -90, 5);
    sensorDisplay = new SensorDisplay(20, 20);
    maps = ['loop', '90s'];

    mapSelect = createSelect();
    maps.forEach(op => {
        mapSelect.option(op);
    });
    mapSelect.position(w + 20, 8);
    mapSelect.changed(changeMap);

    speedSlider = createSlider(0, 25, 4, 1);
    speedSlider.position(w + 20, 30);
}

function changeMap() {
    bg = loadImage('graphics/maps/' + mapSelect.value() + '.jpg');
    car = new Car(50,200, -90, 5);
}

function draw() {
    image(bg, 0, 0, w, h);

    car.vel = speedSlider.value();
    
    car.render();
    car.move();
    loadPixels();
    car.sense();
    car.stayInLane();

    sensorDisplay.showSensors(car.sensors);
}