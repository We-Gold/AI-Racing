function Car(x, y, dir, vel) {
    this.x = x;
    this.y = y;
    this.vel = vel;
    this.viewDistance = 50;
    this.pixels = 10;
    this.viewAngle = 120;
    this.dir = p5.Vector.fromAngle(radians(dir));
    this.width = 20;
    this.length = 40;
    this.sensors = [];

    this.getPointAtDistance = function(dist, angle) {
        // let x = this.x + (dist*sin(angle));
        // let y = this.y + (dist*cos(angle));
        let pos = p5.Vector.fromAngle(this.dir.heading() + radians(angle), dist);

        let x = this.x + pos.x;
        let y = this.y + pos.y;

        stroke(255);
        line(this.x, this.y, x, y);

        return this.getPixel(x,y);
    }

    this.getPixel = function(x, y) {
        // Requires that the loadPixels() function has been run 
        x = Math.round(x)
        y = Math.round(y)       
        let start = 4 * (y * width + x);
        return [pixels[start], pixels[start+1], pixels[start+2], pixels[start+3]];
    }

    this.sense = function() {
        this.sensors = [];
        for(let s = -this.viewAngle/2; s <= this.viewAngle/2; s += this.viewAngle/this.pixels) {
            this.sensors.push(this.getPointAtDistance(this.viewDistance, s));
        }

        // console.log(sensors);
    }

    this.classifySensor = function(sensor) {
        let offset = 30;
        let knownColors = {
            "green" : 344,
            "black" : 0
        };
        let sensedColor = sensor[0] + sensor[1] + sensor[2];

        let colorsArr = Object.keys(knownColors);

        let classifiedColor = null;

        colorsArr.forEach(color => {
            if(abs(sensedColor - knownColors[color]) <= offset) {
                classifiedColor = color;
            }
        });

        return classifiedColor;
    }

    this.classifySensors = function(sensors) {
        let classified = [];
        sensors.forEach(sensor => {
            classified.push(this.classifySensor(sensor));
        });
        return classified;
    }

    this.stayInLane = function() {
        let classified = this.classifySensors(this.sensors);

        let rotationRate = 1; // Arbitrary

        let leftDistToBlack = 0;
        let rightDistToBlack = classified.length - 1;

        while(classified[leftDistToBlack] != "black" && leftDistToBlack < classified.length) {
            leftDistToBlack++;
        }

        while(classified[rightDistToBlack] != "black" && rightDistToBlack >= 0) {
            rightDistToBlack--;
        }

        rightDistToBlack = classified.length - 1 - rightDistToBlack;

        this.rotateCar(rotationRate * (leftDistToBlack - rightDistToBlack));
    }

    this.rotateCar = function(angle) {
        this.dir.rotate(radians(angle));
    }

    this.move = function() {
        this.x += this.dir.x * this.vel;
        this.y += this.dir.y * this.vel;
    }

    this.render = function() {
        fill(255);
        noStroke();
        push();
        translate(this.x, this.y);
        rotate(this.dir.heading());
        rectMode(CENTER);
        rect(0, 0, this.length, this.width);
        rectMode(CORNER);
        fill(255,0,0);
        rect(this.length/2 - this.length/4, -this.width/2, this.length/4, this.width);
        pop();
    }
}