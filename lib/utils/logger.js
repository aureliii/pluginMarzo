"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
class Logger {
    constructor() {
        this.fileWriter = require('fs');
    }
    Logger(filename) {
    }
    log(message) {
        this.fileWriter.writeFile('file.log', message + "\n", function (err) {
            if (err) {
                console.log("Error has occurred: ", err);
            }
        });
    }
}
exports.Logger = Logger;
;
//# sourceMappingURL=logger.js.map