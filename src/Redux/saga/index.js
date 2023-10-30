import {all} from 'redux-saga/effects';

import { ShowProductSaga } from './ShowProductSaga';
export default function* rootSaga() {
  yield all([ShowProductSaga()]);
}
