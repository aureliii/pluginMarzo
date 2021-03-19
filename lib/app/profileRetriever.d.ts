import * as sfcore from '@salesforce/core/lib/connection';
export default class profileRetriever {
    static retrieveProfile(conn: sfcore.Connection, profileNames: string[]): Promise<Map<any, any>>;
    static retrieveProfileNames(conn: sfcore.Connection): Promise<string[]>;
    static retriveProfileMTD(conn: sfcore.Connection): Promise<Map<any, any>>;
}
