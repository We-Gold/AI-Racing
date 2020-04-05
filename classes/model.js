function Model() {
    this.model;

    this.inputMax;
    this.inputMin;
    this.labelMax;
    this.labelMin;
    
    this.createModel = function() {
        this.model = tf.sequential(); 
        this.model.add(tf.layers.dense({inputShape: [16], units: 1, useBias: true}));
        this.model.add(tf.layers.dense({units: 1, useBias: true}));
    }

    this.getData = function(memory) {
        return tf.tidy(() => {
            let inputs = memory.getInputs();
            let labels = memory.getOutputs();

            let inputTensor = tf.tensor2d(inputs, [inputs.length, 16]);
            let labelTensor = tf.tensor2d(labels, [labels.length, 1]);

            // let inputMax = inputTensor.max();
            // let inputMin = inputTensor.min();  
            // let labelMax = labelTensor.max();
            // let labelMin = labelTensor.min();

            // let normalizedInputs = inputTensor.sub(inputMin).div(inputMax.sub(inputMin));
            // let normalizedLabels = labelTensor.sub(labelMin).div(labelMax.sub(labelMin));

            return {
                inputs: inputTensor, //normalizedInputs,
                labels: labelTensor //normalizedLabels,

                // inputMax,
                // inputMin,
                // labelMax,
                // labelMin,
            }
        });
    }

    this.trainModel = async function(memory) {
        let data = this.getData(memory);

        // this.inputMax = data.inputMax;
        // this.inputMin = data.inputMin;
        // this.labelMax = data.labelMax;
        // this.labelMin = data.labelMin;

        this.model.compile({
            optimizer: tf.train.adam(),
            loss: tf.losses.meanSquaredError,
            metrics: ['mse'],
        });
        
        const batchSize = 32;
        const epochs = 50;
        
        return await this.model.fit(data.inputs, data.labels, {
            batchSize,
            epochs,
            shuffle: true,
            callbacks: tfvis.show.fitCallbacks(
                { name: 'Training Performance' },
                ['loss', 'mse'], 
                { height: 200, callbacks: ['onEpochEnd'] }
            )
        });
    }

    this.predictItem = async function(mem) {
        // mem = mem.map(m => {
        //     return map(m, 0, 1, this.inputMin, this.inputMax);
        // });

        let tensor = tf.tensor2d([mem], [1, 16]);

        let pred = await this.model.predict(tensor);
        pred = await pred.array();
        pred = pred[0][0];

        // pred = map(pred, 0, 1, this.labelMin, this.labelMax);

        return pred;
    }
}