"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import { mkdtempSync } from 'fs';
class profileRetriever {
    static async retrieveProfile(conn, profileNames) {
        const profileMap = new Map();
        console.log('Retrieve profiles in retriever: ' + profileNames);
        await conn.metadata.readSync('Profile', profileNames, function (err, retrievedMetadata) {
            if (err) {
                console.error("Error has occured: " + err);
            }
            if (Array.isArray(retrievedMetadata)) { //if the Read function returns an array of profile
                retrievedMetadata.forEach(element => {
                    //console.log("Retrieved: " + element.fullName);
                    profileMap.set(element.fullName, element);
                });
            }
            else { //if the Read function returns only one profile
                profileMap.set(retrievedMetadata.fullName, retrievedMetadata);
            }
        });
        return profileMap;
    }
    static async retrieveProfileNames(conn) {
        console.log('Retrieve profile names');
        let profileNames = new Array();
        var types = [{ type: 'Profile', folder: null }];
        const profileList = await conn.metadata.list(types, conn.version);
        profileList.forEach(element => {
            profileNames.push(element.fullName);
        });
        return profileNames;
    }
    static async retriveProfileMTD(conn) {
        let profileNames = await profileRetriever.retrieveProfileNames(conn);
        //		var profileList = new Map<String, sfmeta.MetadataInfo>();
        var mtd = new Map();
        var i, j, tempArray, chunk = 10;
        for (i = 0, j = profileNames.length; i < j; i += chunk) {
            tempArray = profileNames.slice(i, i + chunk);
            console.log("temArray len: " + tempArray.length);
            var temp = await profileRetriever.retrieveProfile(conn, tempArray);
            temp.forEach((value, key) => {
                mtd.set(key, value);
            });
        }
        return mtd;
    }
}
exports.default = profileRetriever;
//# sourceMappingURL=profileRetriever.js.map