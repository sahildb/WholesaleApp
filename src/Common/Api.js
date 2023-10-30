import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';

module.exports = {
  async response(params) {
    // const formData = new FormData();
    // formData.append('q', params);
    // formData.append('filter', '01000110');
    // formData.append('zone', '111111');
    try {
      const responseData = await axios.post(
        'http://dev.wholetex.com/api/getorderlistforpickup?page=1',
        params,
        {headers: {'Content-Type': 'multipart/form-data'}},
      );

      //console.log('response', responseData.data);
      return [responseData.data];
    } catch (error) {
      console.error('error', error);
    }
  },
};

// const response = async () => {
//   try {
//     const responseData = await axios.post(
//       'http://dev.wholetex.com/api/getorderlistforpickup?page=1',
//       formData,
//       {headers: {'Content-Type': 'multipart/form-data'}},
//     );

//     console.log('response', responseData.data);
//   } catch (error) {
//     console.error('error', error);
//   }
// };
