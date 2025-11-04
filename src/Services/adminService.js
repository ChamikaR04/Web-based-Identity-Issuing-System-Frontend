import api from './api'
import React from 'react'

export const adminService = {
    loginAdmin:async(adminData)=>{
        try {
            const response=await api.post('/auth/adminLogin',adminData);
            return response.data;
        } catch (error) {
            throw error.response?.data || 'Admin Login Failed';
        }
    },

    addAdmin:async(adminData)=>{
        try {
            const response=await api.post('/admin/createAdmin',adminData);
            return response.data;
        } catch (error) {
            throw error.response?.data || 'Add Admin Failed';
        }
    },
    
    updateAdmin:async(id,updatedData)=>{
        try {
            const response=await api.put('/admin/updateAdmin',{...updatedData},{params:{id:id},});
            return response.data;
        } catch (error) {
            throw error.response?.data||"Failed to update Admin profile";
        }
    },

    deleteAdmin:async(id)=>{
        try {
            const response=await api.delete('/admin/deleteAdmin',{params:{id:id},});
            return response.data;
        } catch (error) {
            throw error.response?.data||"Failed to delete Admin profile";
        }
    },
     
    getAllAdmins:async()=>{
        try {
            const response=await api.get('/admin/getAllAdmin');
            return response.data;
        } catch (error) {
            throw error.response?.data||"Failed to fetch Admins";
        }
    }
  
}
