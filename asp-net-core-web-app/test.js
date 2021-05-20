const Cloudant = require("@cloudant/cloudant");

cloudant();

async function cloudant(){
	try{
        console.log("Creating cloudant connection")
        const cloudant= Cloudant({
            url:"https://2ee02e8d-6b6d-4f5e-b98b-851bea914ada-bluemix.cloudantnosqldb.appdomain.cloud",
            plugins:{
                iamauth:{
                    iamApiKey:"wB7WNlzO-dYLmdMBfxuJBbqooW4d6K_HNWKnmLiph8Du"
                }                
            }
        })
        console.log("Created cloudant connection")

        console.log("Getting cloudant dbs..")
        let allDBS=await cloudant.db.list();
        console.log(`Cloudant dbs[${allDBS}]`)

        console.log(`Setting the db that we are going to use!!`)
        const db = cloudant.db.use("bd-alumnos");

        const doc0 = {"_id": "canidae:dog", "name":"Dog", "latin":"Canis Lupus Familaris"};

        let res=""

        res=await db.insert(doc0);
        console.log(res)
        console.log(`Added doc to database ${res}`)

        console.log(`Get doc from databse`)
        res=await db.get(doc0._id);
        console.log(res)


        doc0["_rev"]=res._rev
        doc0.latin="Canis Lupus No Familaris(Edited)"
        res=await db.insert(doc0);
        console.log(res)
        console.log(`Edited doc to database ${res}`)

        console.log(`Get doc from database`)
        res=await db.get(doc0._id);
        console.log(res)


	}catch(err){
		console.error(`Error -> ${err}`);
        
	}
}