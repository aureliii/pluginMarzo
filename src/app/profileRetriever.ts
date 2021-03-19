//import * as sftypes from '@salesforce/ts-types/lib/index';
import * as sfcore from '@salesforce/core/lib/connection';
import * as sfmeta from '@Types/jsforce/api/metadata';
//import { mkdtempSync } from 'fs';

export default class profileRetriever{ 
    public static async retrieveProfile(conn : sfcore.Connection, profileNames : string[]){

        const profileMap = new Map();
    
        console.log('Retrieve profiles in retriever: ' + profileNames);
    
        await conn.metadata.readSync('Profile', profileNames, function(err, retrievedMetadata : sfmeta.MetadataInfo | sfmeta.MetadataInfo[]) {
            if (err) { console.error("Error has occured: " + err); }
            if(Array.isArray(retrievedMetadata)){ //if the Read function returns an array of profile
                retrievedMetadata.forEach(element => {
                    //console.log("Retrieved: " + element.fullName);
                    profileMap.set(element.fullName, element);
                });
            }
            else{ //if the Read function returns only one profile
                profileMap.set(retrievedMetadata.fullName, retrievedMetadata);
            }
        });  
        return profileMap;
    }
    
    public static async retrieveProfileNames(conn :sfcore.Connection){
        console.log('Retrieve profile names');
        let profileNames: string[] = new Array<string>();
        var types = [{type: 'Profile', folder: null}];
        const profileList = await conn.metadata.list(types, conn.version);
    
        profileList.forEach(element => {
            profileNames.push(element.fullName);
        });  
        return profileNames;
    }

    public static async retriveProfileMTD(conn :sfcore.Connection){
        let profileNames = await profileRetriever.retrieveProfileNames(conn);

//		var profileList = new Map<String, sfmeta.MetadataInfo>();
        var mtd = new Map();
		var i, j, tempArray, chunk = 10;
        for (i=0, j=profileNames.length; i<j; i += chunk) {
			tempArray = profileNames.slice(i,i+chunk);
			console.log("temArray len: " + tempArray.length);
            var temp = await profileRetriever.retrieveProfile(conn, tempArray);
            temp.forEach((value, key) => {
                mtd.set(key, value);
            });
		}
        return mtd;
    }
}