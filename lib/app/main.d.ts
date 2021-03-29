import * as sfcore from '@salesforce/core/lib/connection';
export default class main {
    static start(conn: sfcore.Connection, profileNames: string[]): Promise<void>;
}
