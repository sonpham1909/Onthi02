import {createAsyncThunk} from '@reduxjs/toolkit'

<<<<<<< HEAD
const api_url = 'http://192.168.0.103:3000/xemay';
=======
const api_url = 'http://192.168.0.104:3000/xemay';
>>>>>>> origin/main

export const fetchXemayApi = createAsyncThunk(
    'xemay/fetchXemay',
    async ()=>{
        try{
            const response = await fetch(api_url);
            const data = await response.json();
            return data;
        }catch(error){
            console.error('Error fetching xemay: ',error);
            throw error;
        }
    }
);

export const addXemayApi = createAsyncThunk(
    'xemay/addXemayApi',
    async(xemay,thunkAPI)=>{
        try {
            const response = await fetch(api_url,{
                method:'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'

                },
                body: JSON.stringify(xemay)
            });
            const data = await response.json();
            if(response.ok){
                return data;
            }else{
                const errorData = await response.json();
                return thunkAPI.rejectWithValue(errorData);
            }
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
            
        }
    }
);

export const deleteXemayApi = createAsyncThunk(
    'xemay/deleteXemayApi',
    async (id,thunkAPI)=>{
        try {
            const response = await fetch(`${api_url}/${id}`,{
                method:'DELETE'
            });

            if(response.ok){
                return id;
            }else{
                const errorData = await response.json();
                return thunkAPI.rejectWithValue(errorData);
            }
        } catch (error) {
            return thunkAPI.rejectWithValue(error.mesage);
            
        }
    }
);

export const updateXemayApi =createAsyncThunk(
    'xemay/updateXemayApi',
    async (objUpdate,thunkAPI)=>{
        try {
            const response = await fetch(`${api_url}/${objUpdate.id}`,{
                method:'PUT',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
<<<<<<< HEAD
                body:JSON.stringify(objUpdate)
=======
                body:JSON.stringify(objUpdate.data)
>>>>>>> origin/main
            });
            const data = await response.json();
            if(response.ok){
                return data;
            }else{
                const errorData = await response.json();
                return thunkAPI.rejectWithValue(errorData);
            }
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
            
        }

    }
)