import {createSlice} from '@reduxjs/toolkit'
import { deleteXemayApi, fetchXemayApi, updateXemayApi } from '../action/ActionXemay';


const initialState = {
    listXemay:[]
}

const motoSlice = createSlice({
    name:'xemay',
    initialState,
    reducers:{
        addXemay: (state,action) =>{
            state.listXemay.push(action.payload);
        },

    },
    extraReducers: (builder) =>{
        builder.addCase(fetchXemayApi.pending,(state) =>{

        })
        .addCase(fetchXemayApi.fulfilled,(state,action)=>{
            state.listXemay = action.payload;
        })
        .addCase(fetchXemayApi.rejected, (state,action)=>{
            console.log("fetching failed");
        });


        builder.addCase(deleteXemayApi.fulfilled,(state,action)=>{
            state.listXemay=state.listXemay.filter(row=>row.id!==action.payload);
        }).addCase(deleteXemayApi.rejected,(state,action)=>{
            console.log('delete moto rejected: ',action.error.message);
        });

        builder.addCase(updateXemayApi.fulfilled,(state,action)=>{
            const {id,ten,mau,gia,mota,hinh_anh} = action.payload;
            const xemay = state.listXemay.find(row=>row.id);
            if(xemay){
                xemay.ten = ten;
                xemay.mau  = mau;
                xemay.gia =gia;
                xemay.mota = mota;
                xemay.hinh_anh = hinh_anh
            }
        })
    }
})

export const {addXemay} = motoSlice.actions;
export default motoSlice.reducer;