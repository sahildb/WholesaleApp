import {put,call,takeEvery,take} from 'redux-saga/effects';
import Api from  '../../Common/Api'
import { Show_Prodcut_Failed, Show_Product_Request, Show_Product_Success } from '../action/types';

export function* ShowData({params}) {
    try {
        const response = yield call(Api.response,params)
        //console.log('respone',response);
        yield put({type:Show_Product_Success,payload:response})
    } catch (error) {
        yield put({type:Show_Prodcut_Failed,payload:error})
    }
}

export function* ShowProductSaga() {
    yield takeEvery(Show_Product_Request,ShowData)
}