import { use } from 'react';
import api from './api';

export const userService={
    registerUser: async (userData)=>{
      try {
        //call the api/user/addUser 
        const response= await api.post('/user/addUser',userData);
         return response.data;
      } catch (error) {
        throw error.response?.data || 'Registration Failed';
      }  
    },

    loginUser:async(userData)=>{
        try {
            const response=await api.post('/auth/login',userData);
            return response.data;
        } catch (error) {
            throw error.response?.data || 'Login Failed';
        }
    },

    getUserByUsername:async(username)=>{
      try {
        const response=await api.get('/user/getUser',{params:{username:username},});
        return response.data;
        
      } catch (error) {
        throw error.response?.data||"Failed to fetch user";
      }
    },
    updateUserprofile:async(id,updatedData)=>{
      try {
        const response=await api.put('/user/updateUser',{...updatedData},{params:{id:id},});
        return response.data;
      } catch (error) {
        throw error.response?.data||"Failed to update profile";
        
      }
    },

    getAllMembers:async()=>{
      try {
        const response=await api.get('/user/getAllUsers');
        return response.data;
      } catch (error) {
        throw error.response?.data||"Failed to fetch members";
      } 
    },
    deleteMember:async(id)=>{
      try {
        const response=await api.delete('/user/deleteUser',{params:{id:id},});
        return response.data;
      } catch (error) {
        throw error.response?.data||"Failed to delete member";
      }
    },
    deleteAuth:async(userId)=>{
      try {
        const response=await api.delete('auth/deleteAuth',{params:{userId:userId},});
        return response.data;
      } catch (error) {
        throw error.response?.data||"failed to delete auth record";
      }
    }

}