import { createReducer } from '../action/common/util';
import Constant from '../action/common/constant';

const initialState = {
    loading: false,
    loadingMessage: '',
};

export default createReducer(initialState, {
    [Constant.REQUEST_STARTED]: (state, payload) => Object.assign({}, state, {
        loading: true,
        loadingMessage: payload,
    }),
    [Constant.REQUEST_COMPLETED]: state => Object.assign({}, state, {
        loading: false,
        loadingMessage: '',
    }),
    [Constant.REQUEST_FAIL]: state => Object.assign({}, state, {
        loading: false,
        loadingMessage: '',
    }),
});
