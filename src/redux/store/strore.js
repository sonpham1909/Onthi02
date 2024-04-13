import {configureStore} from '@reduxjs/toolkit'

import RdeducerXemay from '../reducer/RdeducerXemay'


export default configureStore({
    reducer:{
        listXemay:RdeducerXemay
    }
})