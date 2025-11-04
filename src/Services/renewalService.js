import { Await } from 'react-router-dom';
import api from './api';

export const renewalService={
      createRenewal:async(userId, image)=>{
        try {
            // validate inputs early
            if (!userId) throw new Error("createRenewal: missing userId");
            if (!image) throw new Error("createRenewal: missing image file (expect File)");

            const formData = new FormData();
            formData.append("userId", String(userId));
            console.log("Image in service:", image, "type:", image?.type, "size:", image?.size);
            formData.append("image", image);

            // Ensure this request is sent as multipart/form-data (override any api defaults)
            const response = await api.post('/renewal/createRenewal', formData, {
                params: { userId: userId },
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            console.log("Renewal response", response.data);
            return response.data;
        } catch (error) {
            console.error("Error applying for renewal:", error);
            throw error;
        }
    },
    
   
    acceptRenewal:async(userId)=>{
        try {
            const response=await api.get('/renewal/verifyRenewal',{params:{userId:userId},});
            return response.data;
        } catch (error) {
            throw error.response?.data||"Failed to accept renewal";
        }
    },

    rejectRenewal:async(userId)=>{
        try {
            const response=await api.delete('/renewal/deleteRenewal',{params:{userId:userId},});
            return response.data;
        } catch (error) {
            throw error.response?.data||"Failed to reject renewal";
        }
    },
    getAllRenewalRequests:async()=>{
        try {
            const response=await api.get('/renewal/getRenewalsByStatus',{params:{status:"pending"}},);
            return response.data;
        } catch (error) {
            throw error.response?.data||"Failed to fetch renewal requests";
        }
    },
}
