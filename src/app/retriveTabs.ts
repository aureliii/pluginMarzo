let objects = [];



export default class retriveTabs{ 

    public static   async  getTabsName(conn) {
        
        
        try {
        //   await conn.login();

            let soql = "SELECT Id,  Name, SobjectName, DurableId, IsCustom, Label FROM TabDefinition ";
            
            await conn.query(soql)
            .on("record", (record) => {
                objects.push(record.Name);
            })
            .on("end", async () => {
                console.log(`Fetched objects. Total records fetched: ${objects.length}`);
            })
            .on("error", (err) => {
                console.error(err);
            })
            .run({
                autoFetch: true,
                maxFetch: 10000 //lo setto quanto vuoi (si usa max fatch se vogliamo retrivare + di 2k) 
            });
           //console.log('ciao retrive objname',objects);
            return objects;
        } catch (err) {
            console.error(err);
        }
    };
}
