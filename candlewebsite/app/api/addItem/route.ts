var fs = require('fs');
import axios from "axios";
export async function POST(request:Request){

        const data = await request.json();
        data.id = 11;

        fs.readFile('db.json','utf8',function callback(err:string,jsonData:string){
            if(err){
                console.log(err);
            }
            else{
                let obj = JSON.parse(jsonData);
                console.log(obj);
                obj.items.push(data);
                let json = JSON.stringify(obj);

                fs.writeFile('db.json',json,'utf8',function callback(err:string){
                })

            }

        })
        return Response.json("success");

        
      
    
}