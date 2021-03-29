class Logger{

    private fileWriter = require('fs');

    Logger(filename){

    }

    public log(message){
        this.fileWriter.writeFile('file.log', message+"\n",  function(err){
            if(err){
                console.log("Error has occurred: ", err);
            }
        });
    }

};

export { Logger };