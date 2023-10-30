import {Add_To_Cart_Request, Show_Product_Request} from './types';

export default ShowProductAction = params => {
  console.log('params',params);
  return {
    type: Show_Product_Request,
    params,
  };
};
