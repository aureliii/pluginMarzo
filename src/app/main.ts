import  retriveObjName  from "./retriveObjName";
import  retriveTabs  from "./retriveTabs";
import  retriveUserPermissionName  from "./retriveUserPermissionName";
import profileRetriever from "./profileRetriever";
import tabFix from "./tabFix";
import userPermissionFix from "./userPermissionFix";
import objectPermissionFix from "./objectPermissionFix";
import writeprofile from "./writeprofile";
import * as sfcore from '@salesforce/core/lib/connection';

// import * as sfmeta from '@Types/jsforce/api/metadata';

export default class main {
    public static async  start(conn : sfcore.Connection){
		console.log(`Current directory: ${process.cwd()}`);


		var tabs = await retriveTabs.getTabsName(conn);
		console.log('retriveTabs ',tabs);
    
	 	var objectsName = await retriveObjName.getObjsName(conn);
     	let userPermissionName = await retriveUserPermissionName.retrieveUserPermissions(conn);
     	console.log('objectsName',objectsName);
  //   	console.log('userPermissionName', userPermissionName);

		let profileMtd = await profileRetriever.retriveProfileMTD(conn);
		profileMtd = await tabFix.fix(tabs,profileMtd);
		
		profileMtd = await userPermissionFix.fix(profileMtd,userPermissionName);
		profileMtd = await objectPermissionFix.fix(profileMtd,objectsName);

		profileMtd = await writeprofile.write(profileMtd);
	
		
   	};
}