const axios= require("axios");

export const getTasks=async(_id,status,callback)=>{
  
    let id = { id: _id };
    axios.post("http://localhost:4000/gettasks", id).then((res) => {
        console.log("tasksssss",res.data);
        let data=res.data
        if(status==="all"){
            callback(data)
            
        }
        else if(status==="completed"){
           let filteredData = data.filter(data=>{
               return data.iscompleted===true
            })
            
            callback(filteredData)
            
        }
        else if(status==="active"){
            let filteredData = data.filter(data=>{
                return data.iscompleted===false
             })
             
             callback(filteredData)

        }
        
    }) 

}