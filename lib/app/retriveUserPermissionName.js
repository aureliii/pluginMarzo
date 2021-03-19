"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class retriveUserPermissionName {
    static async retrieveUserPermissions(conn) {
        let permissionName = [];
        await conn.sobject("UserPermissionAccess").describe(function (err, metadata) {
            if (err) {
                return console.error(err);
            }
            //         console.log('Label: ' + metadata.label);
            //        console.log('Number of Fields: ' + metadata.fields.length);
            metadata.fields.forEach(element => {
                if (element.name.startsWith('Permissions'))
                    permissionName.push(element.name.replace('Permissions', ''));
            });
        });
        //       console.log('All permissionName: ', permissionName);
        return permissionName;
    }
}
exports.default = retriveUserPermissionName;
//# sourceMappingURL=retriveUserPermissionName.js.map