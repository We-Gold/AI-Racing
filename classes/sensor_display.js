function SensorDisplay(x, y) {
    this.pixelWidth = 10;
    this.x = x;
    this.y = y;

    this.showSensors = function(sensors) {
        var x = this.x;
        noStroke();
        fill(255);
        rect(this.x - 1, this.y - 1, (this.pixelWidth * sensors.length) + 2, this.pixelWidth + 2);
        sensors.forEach(s => {
            noStroke();
            fill(s[0], s[1], s[2], s[3]);
            rect(x, this.y, this.pixelWidth, this.pixelWidth);
            x += this.pixelWidth;
        });
    }
}