import axios from "axios";

class ContactApi{
async getContacts(){
    try {
        const response = await axios.get(`${process.env.REACT_APP_URL}/api/contact`,{
            method: "get",
          });

        //   console.log(response);
          if(response.status===200)
        return response.data;
        else
        return false;
    } catch (error) {
     console.log(error);   
    }
}
async createContacts(data){
    try {
        const response = await axios.post(`${process.env.REACT_APP_URL}/api/contact`,data,{
            method: "post",
          });

          console.log(response);
          if(response.status===200)
        return response.data;
        else
        return false;
    } catch (error) {
     console.log(error);   
    }
}
async updateContact(data,id){
    try {
        const response = await axios.put(`${process.env.REACT_APP_URL}/api/contact/${id}`,data,{
            method: "put",
          });

          console.log(response);
          if(response.status===200)
        return response.data;
        else
        return false;
    } catch (error) {
     console.log(error);   
    }
}
}
export const contactApi = new ContactApi();