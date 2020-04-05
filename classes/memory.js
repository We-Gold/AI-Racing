function Memory(memSize) {
    this.mem = [];
    this.memSize = memSize;

    this.addMem = function(mem) {
        if (this.mem.length < this.memSize) {
            this.mem.push(mem);
        } else {
            this.mem.pop();
            this.mem.unshift(mem);
        }
    }
    
    this.getInputs = function() {
        return this.mem.map(mem => {
            return mem[0];
        });
    }

    this.getOutputs = function() {
        return this.mem.map(mem => {
            return mem[1];
        });
    }
}