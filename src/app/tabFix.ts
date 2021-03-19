
import * as fs from "fs";
//import * as  parser from '@types/xml2json'; 
//import path = require('path');
//import * as parser from "xml2js";
//const path = require('path');
import templatestruct from './templatestruct';

var jsonTemplate ;
var myMap = new Map();
myMap.set('apexClass', "classAccesses");
myMap.set('fieldPermissions', "fieldPermissions");
myMap.set('flow', "flowAccesses");
myMap.set('layout', "layoutAssignments");
myMap.set('object', "objectPermissions");
myMap.set('tabVisibilities', "tabVisibilities");
myMap.set('userPermissions', "userPermissions");


export default class tabFix{ 
    public static async fix(metadata: Map<any, any>){
      
        try{  
          let data;
          console.log(`Current directory nel tab fix: ${process.cwd()}`);
          var dirpath =  process.cwd();
          console.log(`Current directory rirpath:`+dirpath);

          try {
       //     console.log('path.resolve '+process.cwd()+'/ProfileTemplate.json');
           
            data = fs.readFileSync(process.cwd()+'/ProfileTemplate.json');
      //      console.log('data ',data);
            
          } catch (error) {
           console.error('sono nel catch '+error);
            data = null;
          }
              
              if (data != null) {
                console.log('template preso da xml ');
                jsonTemplate = JSON.parse(data);
      //          console.log('jsonTemplate ',jsonTemplate);
              } else {
                console.log('template preso da json ');
                jsonTemplate = templatestruct.getTemplate();//JSON.parse(parser.toJson(data, {reversible: false}));
              }
              
         //     console.log('template ',jsonTemplate);
         //     console.log(JSON.stringify(jsonTemplate));
  
              for(const k of metadata.keys()){
                let metadataProfile = metadata.get(k);
  
                for (var key of myMap.keys()) {
                      var object = metadataProfile[myMap.get(key)];
                    if(typeof object !== 'undefined' && typeof jsonTemplate["Profile"][key] !== 'undefined' && jsonTemplate["Profile"][key]){
                          var objectFiltered = object.filter(function(value: { [x: string]: any; }, index: any, arr: any){
                            return jsonTemplate["Profile"][key].indexOf(value[key]) < 0;
                          });      
                          metadataProfile[myMap.get(key)] = objectFiltered;
                    }
                }
                metadata.set(k, metadataProfile);
              }
              console.log('ho fatto il remuve from template');
            return metadata;
        }catch (err) {
            console.error(err);
        }
  }  
}
