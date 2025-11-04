// src/services/idcardService.js
import api from './api';
import { notificationService } from './notificationService';

export const idcardService = {
  generateId: async (userId, image) => {
    try {
      const formdata = new FormData();
      formdata.append("userId", userId);
      formdata.append("image", image);

      const response = await api.post('/id_card/generateId', formdata, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      console.log("Response:", response.data);
      alert("ID card generated successfully!");
      return response.data;
    } catch (error) {
      console.log("Error generating ID card:", error);
      alert("Failed to generate ID card!");
    }
  },
  checkStatus: async(userId)=>{
    try {
        const response=await api.get('/id_card/isApply',{params:{userId:userId},})
        return response.data;
    } catch (error) {
       console.error("Error Checking membership status : ",error);
       return false;
    }
  },
  getIdByUserId: async(userId)=>{
    try {
        const response=await api.get('/id_card/getCardByUserId',{params:{userId:userId}},);
        return response.data;
    } catch (error) {
        console.error("Error getting Membership status : ",error);
        return false;
    }
  },
  isActive: async(userId)=>{
    try {
        const response=await api.get('/id_card/isActive',{params:{userId:userId}},);
        return response.data;
    } catch (error) {
        console.error("Error finding Membership Status : ",error);
        return false;
    }
  },

  requestList: async()=>{
    try {
        const response=await api.get('/id_card/getIdCardByStatus',{params:{status:"pending"}}, );
        console.log("Fetched ID card requests : ",response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching ID card requests : ",error);
        return [];
    }
  },

  acceptRequest: async(userId)=>{
    try {
        const response=await api.get('/id_card/verify',{params:{userId:userId},});
        console.log("Accepted ID card request : ",response.data);
        return response.data;
    } catch (error) {
        console.error("Error accepting ID card request : ",error);
        return null;
    }
  },
  rejectRequest: async(userId)=>{
    try {
        const response=await api.delete('/id_card/rejectCard',{params:{userId:userId},});
        return response.data;
    } catch (error) {
        console.error("Error rejecting ID card request : ",error);
        return null;
    }
  },
};
