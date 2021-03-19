"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const retriveObjName_1 = require("./retriveObjName");
const retriveTabs_1 = require("./retriveTabs");
const retriveUserPermissionName_1 = require("./retriveUserPermissionName");
const profileRetriever_1 = require("./profileRetriever");
const tabFix_1 = require("./tabFix");
const userPermissionFix_1 = require("./userPermissionFix");
const objectPermissionFix_1 = require("./objectPermissionFix");
const writeprofile_1 = require("./writeprofile");
// import * as sfmeta from '@Types/jsforce/api/metadata';
class main {
    static async start(conn) {
        console.log(`Current directory: ${process.cwd()}`);
        var tabs = await retriveTabs_1.default.getTabsName(conn);
        console.log('retriveTabs ', tabs);
        var objectsName = await retriveObjName_1.default.getObjsName(conn);
        let userPermissionName = await retriveUserPermissionName_1.default.retrieveUserPermissions(conn);
        //   	console.log('objectsName',objectsName);
        //   	console.log('userPermissionName', userPermissionName);
        let profileMtd = await profileRetriever_1.default.retriveProfileMTD(conn);
        profileMtd = await tabFix_1.default.fix(tabs, profileMtd);
        profileMtd = await userPermissionFix_1.default.fix(profileMtd, userPermissionName);
        profileMtd = await objectPermissionFix_1.default.fix(profileMtd, objectsName);
        profileMtd = await writeprofile_1.default.write(profileMtd);
        //		console.log('Profiles: ', profileMtd);
    }
    ;
}
exports.default = main;
//# sourceMappingURL=main.js.map