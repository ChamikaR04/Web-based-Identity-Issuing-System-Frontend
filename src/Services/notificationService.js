import { Await } from 'react-router-dom';
import api from './api'

export const notificationService={
    getByUserId:async(userId)=>{
        try {
            const response=await api.get(`/notification/getNotifyByUserId`,{params:{userId:userId}},);
            console.log("response",response.data);
            return response.data;
            
        } catch (error) {
            console.error("Error fetching notifications:", error);
            return [];
        }
        
    }
,
    sendNotification: async (userId, type) => {
    try {
      const response = await api.post(`/notification/sendNotification`, null, {
        params: { userId: userId, type: type },
      });
      console.log("Notification sent:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error sending notification:", error);
      return null;
    }
  },

  deleteNotification: async (userId) => {
    try {
        const response = await api.delete(`/notification/deleteNotificationByUserId`, {
        params: { userId: userId },
      });
      console.log("Notification deleted:", response.data);
      return response.data;
    } catch (error) {
        console.error("Error deleting notification:", error);
      return null;
    }
  },
}

