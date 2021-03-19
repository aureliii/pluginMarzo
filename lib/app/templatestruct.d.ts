export default class templatestruct {
    static getTemplate(): {
        Profile: {
            "-xmlns": string;
            name: string[];
            apexClass: string[];
            field: string[];
            tab: string[];
            flow: string[];
        };
    };
}
