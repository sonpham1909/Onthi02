import { Alert, Button, FlatList, Image, Modal, PermissionsAndroid, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import TextInput1 from './TextInput1'
import {useDispatch,useSelector} from 'react-redux'
import { addXemayApi, deleteXemayApi, fetchXemayApi, updateXemayApi } from '../redux/action/ActionXemay'
import { launchImageLibrary } from 'react-native-image-picker'
const Listxemay = () => {
    const [data, setData] = useState([]);

    const dispatch = useDispatch();
    const [Id, setId] = useState('');
    const [img, setimg] = useState('');
    const [ten, setTen] = useState('');
    const [mau, setMau] = useState('');
    const [gia, setGia] = useState('');
    const [mota, setMota] = useState('');
    const [isVisitable, setIsVisitable] = useState(false);

    const handleAddXe = ()=>{
      if(Id !==''){
        let dlUP = {
            id:Id,
        
            ten : ten,
            mau: mau,
            gia : gia,
            mota: mota,
            hinh_anh : img
        }
        dispatch(updateXemayApi(dlUP))
        .then((result)=>{
            Alert.alert('sửa thành công',Id);
            dispatch(fetchXemayApi());
            
            setId('');
            setIsVisitable(false);
            reset();
        })
        .catch((error)=>{
            console.error("Error update",error);
        })
      }else{
        let duLieuAdd = {
            ten:ten,
            mau:mau,
            gia:gia,
            mota:mota,
            hinh_anh:img
        }
        dispatch(addXemayApi(duLieuAdd))
        .then(()=>{
            Alert.alert('Thêm thành công');
            setIsVisitable(false);
            dispatch(fetchXemayApi());
            setimg('');
        })
        .catch((error)=>{
            Alert.alert('Thêm xem mới không thành công')
        })
      }
    }

    const handleUpdate = (item)=>{
        setIsVisitable(true);

        setId(item.id);
        setTen(item.ten);
        setMau(item.mau);
        setGia(item.gia);
        setMota(item.mota);
        setimg(item.hinh_anh);
        console.log(Id);

    }


    

    const listXemay = useSelector((state)=>state.listXemay.listXemay);
    

    useEffect(()=>{
        dispatch(fetchXemayApi());

    },[dispatch]);

    useEffect(()=>{
        setData(listXemay);
        console.log(data);


    },[listXemay]);


    const checkCameraPermission = async ()=>{
        try {
            const checkCameraPermission = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
            if(checkCameraPermission === PermissionsAndroid.RESULTS.GRANTED){
                console.log('ok');
                const result = await launchImageLibrary({mediaType:'photo'});
                console.log(result);
                setimg(result.assets[0].uri);
            }else{
                console.log('Bị từ chối');
            }
            
        } catch (error) {
            console.log(error);
            
        }
    }

    const handleDelete = (id) =>{
        Alert.alert(
            'Xác nhận',
            'Bạn có muốn xóa không ?',
            [
                {
                    text:"Không",
                    style:"cancel"
                },
                {
                    text:'Có',
                    onPress: ()=>{
                        dispatch(deleteXemayApi(id))
                        .then((result)=>{
                            console.log("Xe máy đã xóa");
                        })
                        .catch((error)=>{
                            console.log('Xóa lỗi:',error);
                        })
                    }
                }
            ]
        )


    }
    const reset = () =>{
        setId('');
        setGia('');
        setMau('');
        setMota('');
        setimg('');
        setTen('')
    }



    const renderItem = ({item})=>{
        



        return(
            <View style={{flexDirection:'row',alignItems:'center',margin:5}}> 
                <Image source={{uri:item.hinh_anh}} style={{width:120,height:120,borderRadius:12}} />
              <View>
              <Text>{item.id}</Text>
              <Text>{item.ten}</Text>
                <Text>{item.mau}</Text>
                <Text>{item.gia}</Text>
                <Text>{item.mota}</Text>
                <Text onPress={()=>handleDelete(item.id)}>Xóa</Text>
              <Text
              onPress={()=>handleUpdate(item)}>Sửa</Text>
              </View>
             
            </View>
        )
    }




  return (
    <View style={{flex:1}}> 

        {/* modall */}
        <Modal visible={isVisitable}>
            <View>
               <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',padding:10}}>
               <Text>Thêm xe máy</Text>
                <Text onPress={()=>{setIsVisitable(false);
              reset();
                }}>Đóng</Text>
               </View>
               {
                (img ==='')?
                (
                    <TouchableOpacity onPress={()=>checkCameraPermission()} style={{alignSelf:'center'}}>
                <Image source={require('../image/imgepl.jpg')} style={{width:120,height:120,borderRadius:12}} />
               </TouchableOpacity>
                ):
                (
                    <TouchableOpacity onPress={()=>checkCameraPermission()} style={{alignSelf:'center'}}>
                <Image source={{uri:img}} style={{width:120,height:120,borderRadius:12}} />
               </TouchableOpacity>
                )
               }
               <TextInput1 plahoder={'Nhập tên xe'} value={ten} onChangeText={(txt)=>setTen(txt)} />
               <TextInput1 plahoder={'Nhập màu xe'} value={mau} onChangeText={(txt)=>setMau(txt)} />
               <TextInput1 plahoder={'Nhập giá xe'} value={gia} onChangeText={(txt)=>setGia(txt)} />
               <TextInput1 plahoder={'Nhập mô tả xe'} value={mota} onChangeText={(txt)=>setMota(txt)} />

               <Button title='Xác nhận' onPress={()=>handleAddXe()} />
            </View>
        </Modal>

      <Text>Danh sách xe wave</Text>
      <Button title='Thêm xe mới' onPress={()=>{setIsVisitable(true);
      reset();
    }} />
     <FlatList
     data={data}
     keyExtractor={(item) => item.id}
     renderItem={renderItem}
     />
    </View>
  )
}

export default Listxemay

const styles = StyleSheet.create({})