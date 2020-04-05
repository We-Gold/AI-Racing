let bg;
let car;
let sensorDisplay;
let w = 600;
let h = 400;
let maps;
let mapSelect;
let speedSlider;
let training = false;

function preload() {
    bg = loadImage('graphics/maps/loop.jpg');
}

function setup() {
    createCanvas(w, h);
    frameRate(30);
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
    car.resetPosition();
}

function draw() {
    image(bg, 0, 0, w, h);

    car.vel = speedSlider.value();
    
    car.render();
    car.move();
    loadPixels();
    car.sense();
    car.stayInLane();

    // Things to draw on top of the map and car
    sensorDisplay.showSensors(car.sensors);

    textSize(15);
    fill(255, 0, 0);
    text("Speed: " + car.vel, w - 70, 20);
    textSize(15);
    fill(255, 0, 0);
    text("Speed: " + car.vel, w - 70, 20);

    if(!training && !car.modelTrained) {
        textSize(15);
        fill(255, 0, 0);
        text("AI Status: Gathering Data", w - 180, 40);
    }

    if(training && !car.modelTrained) {
        textSize(15);
        fill(255, 0, 0);
        text("AI Status: Training", w - 130, 40);
    }

    if(training && car.modelTrained) {
        textSize(15);
        fill(255, 0, 0);
        text("AI Status: Active", w - 112, 40);
    }

    if(!training && frameCount % 30 == 0 && car.memory.mem.length == car.memory.memSize) {
        training = true;
        car.initModel();
    }
}