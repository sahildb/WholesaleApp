import { Show_Prodcut_Failed, Show_Product_Success } from "../action/types";

const INTIAL_STATE = [];

export default (state = INTIAL_STATE, action) => {
    switch (action.type) {
        case Show_Product_Success:
            //console.log('action_payload',action.payload);
            return { AddToCartSuccess: true, data: action.payload };

        case Show_Prodcut_Failed:
            return { AddToCartfailed: false, error: action.payload };

        default:
            return state;
    }
};