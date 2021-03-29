declare class Logger {
    private fileWriter;
    Logger(filename: any): void;
    log(message: any): void;
}
export { Logger };
