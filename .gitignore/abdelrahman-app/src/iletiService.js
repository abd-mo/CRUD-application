import axios from 'axios';
//const url='http://abdelrahman-app.herokuapp.com/api/iletiler/';
const url = 'api/iletiler/';
class iletiService{

    //get posts
static getPosts()
{
    return new Promise( async(resolve,reject)=>{

        try {
            const res= await axios.get(url);
            const data=res.data;
            resolve(
                data.map(ileti=>({
                    ...ileti,
                    createdAt : new Date(ileti.createdAt)
                }))
            );
        } catch (err) {
            reject(err);
            
        }
    });
}
    //create post

static inserPost(text){

    return axios.post(url,{
        text:text
    });
}

    //delete posts
static deletPost(id){
    return axios.delete(`${url}${id}`);
}

static updatePost(id,text){
    return axios.put(`${url}${id}`,{
        text:text
    });
}


    //
}
export default iletiService;