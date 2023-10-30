import {applyMiddleware, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';
import Reducers from './Reducers';
import rootSaga from './saga';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(Reducers, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);
export default store;
