export default class templatestruct {
    static getTemplate(): {
        Profile: {
            "-xmlns": string;
            userPermissions: string[];
            apexClass: string[];
            fieldPermissions: string[];
            tabVisibilities: string[];
            flow: string[];
        };
    };
}
