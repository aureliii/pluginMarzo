
var fs = require('fs');
var js2xmlparser = require("js2xmlparser");
var dirname='./main/default/profiles/';
var format = require('xml-formatter');

export default class writeprofile {
    public static async write(orgMeta: Map<any, any>){
        try{
            for(const k of orgMeta.keys()){
                let metadataProfile = orgMeta.get(k);
                metadataProfile["@"]={"xmlns":"http://soap.sforce.com/2006/04/metadata"};
                var options = {
                  declaration: {
                      "encoding": "UTF-8"
                  }
                };
        
                var xml=js2xmlparser.parse("Profile", metadataProfile, options);
                fs.writeFile(dirname + metadataProfile.fullName+'.profile-meta.xml', format(xml, {collapseContent: true}), function(err: any, data: any) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('profili updated!');
                    }
                }); 
            }
            return orgMeta;
        }catch (err) {
            console.error(err);
        }
    }
}

