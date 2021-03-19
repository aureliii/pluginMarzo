export default class userPermissionFix{
    public static async  fix(orgMeta: Map<any, any>, userPermissionStart: any[]){
        var userPermissionNames = userPermissionStart;
        
         
        try {

            for(const k of orgMeta.keys()){ 
                let metadataProfile = orgMeta.get(k);
                const objectNames = [];

                if(metadataProfile.hasOwnProperty('userPermissions') && typeof metadataProfile.userPermissions !== 'undefined'){
                    if(metadataProfile.custom === 'false'){
                        metadataProfile.userPermissions = [];
                        orgMeta.set(k, metadataProfile);
                    } else {
                          if (!Array.isArray(metadataProfile.userPermissions)) {
                            if (objectNames.includes(metadataProfile.userPermissions.name)) {
                                  objectNames.push(metadataProfile.userPermissions.name);
                            }             
                              metadataProfile.userPermissions = Object.entries(metadataProfile.userPermissions);
                          } else {
                            //console.log('metadataProfile.userPermission.lenght: '+metadataProfile.userPermission.length);
                            for(var userPermission of metadataProfile.userPermissions){
                                  if ( userPermission  !== null && userPermission.name !== null  && !objectNames.includes(userPermission.name)) {
                                    //console.log('User Permission Name: '+ userPermission.name);
                                    objectNames.push(userPermission.name);
                                  }
                            }
                        }

           //             console.log('objectNames: ', objectNames);

                        //console.log('User Permission Name First Elem: '+ userPermissionNames[0]);
                        let difference = userPermissionNames.filter((x: any) => !objectNames.includes(x));

                        //console.log('difference.length: '+difference.length);

           //             console.log('objectNames: '+ metadataProfile.fullName);
         //               console.log('DIFFERENCE: '+JSON.stringify(difference));

                          Object.entries(difference).forEach(([key, value]) => {
                            var newObjPerm = {
                                enabled: 'false',
                                name: value
                            };
                            //console.log('newObjPerm:'+ JSON.stringify(newObjPerm));
                            metadataProfile.userPermissions.push(newObjPerm);               
                          });

                          metadataProfile.userPermissions = metadataProfile.userPermissions.sort((a: { name: number; }, b: { name: number; }) => (a.name > b.name) ? 1 : -1);
                    }

                    orgMeta.set(k, metadataProfile);
                }

            };

               return orgMeta;
        } catch (error) {
            console.log('sono nel catch di f() userPermission!' + error.message);
        }
    }
}
