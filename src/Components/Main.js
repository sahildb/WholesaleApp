import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Colors from '../Colors';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import SearchBar from 'react-native-dynamic-search-bar';
import {useDispatch, useSelector} from 'react-redux';
import ShowProductAction from '../Redux/action/ShowProductAction';
const Main = () => {
  const [search, setSearch] = useState('');
  const [showSearchBar, setShowSearchBar] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const apidata = useSelector(state => state.showProduct);
  const dispatch = useDispatch();
  const [productData, setProductData] = useState();
  useEffect(() => {
    dispatch(
      ShowProductAction({
        q: ' ',
        filter: '01000110',
        zone: '111111',
      }),
    );
  }, []);

  useEffect(() => {
    const product = apidata && apidata.data && apidata.data[0].productList.data;
    console.log('data',product);
    setProductData(product);
    setIsLoading(false);
  }, [apidata]);

  //console.log('product', productData);

  const searchProduct = txt => {
    setSearch(txt),
      dispatch(
        ShowProductAction({
          q: txt,
          filter: '01000110',
          zone: '111111',
        }),
      );
  };

  const clearFilter = () => {
    setSearch(''),
      dispatch(
        ShowProductAction({
          q: ' ',
          filter: '01000110',
          zone: '111111',
        }),
      );
  };

  const renderItem = ({item}) => {
    const productFilter = () => {
      dispatch(
        ShowProductAction({
          q: item.prefix,
          filter: '01000110',
          zone: '111111',
        }),
      );
    };
    return (
      <View style={{margin: 10}}>
        <ImageBackground
          source={require('../Assets/Images/img1.jpeg')}
          style={styles.image}>
          <View style={styles.boxStyleTop}>
            <Text style={styles.name}>{item.order_handler_name}</Text>
          </View>
          <View style={styles.boxStyle}>
            <View style={{marginBottom: RFValue(20)}}>
              <Text style={styles.itemText}>{item.p_title}</Text>
            </View>
            <View style={{marginBottom: RFValue(20), flexDirection: 'row',justifyContent:"space-between"}}>
              <View style={{flex: 0.8, justifyContent: 'center'}}>
                <Text style={styles.orderText}>Order : {item.order_id}</Text>
              </View>
              <View style={{flex: 0.5}}>
                <TouchableOpacity
                  style={styles.prefixbtn}
                  onPress={() => productFilter(item.prefix)}>
                  <Text style={styles.prefixText}>{item.prefix}</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                marginBottom: RFValue(20),
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={styles.itemText}>Size : {item.size_name}</Text>
              <Text style={styles.zoneText}>Zone : {item.zone}</Text>
            </View>
            <View
              style={{
                marginBottom: RFValue(25),
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={styles.pnoText}>Pcs : {item.p_no}</Text>
              <Text style={styles.qtyText}>Qty : {item.cart_count}</Text>
              <Text style={styles.pcsText}>TPcs : {item.item_count}</Text>
            </View>
            <View
              style={{
                marginBottom: RFValue(3),
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Image
                source={require('../Assets/Images/call.png')}
                style={styles.callImg}
              />
              <Image
                source={require('../Assets/Images/printing.png')}
                style={styles.printingImg}
              />
              <TouchableOpacity style={styles.btn}>
                <Text style={styles.orederText}>OrderSent</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      {isLoading ? (
        <ActivityIndicator size={'large'} style={styles.indicatior} />
      ) : (
        <View>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => setShowSearchBar(!showSearchBar)}
              style={{justifyContent: 'center'}}>
              <Image
                source={require('../Assets/Images/search.png')}
                style={styles.search}></Image>
            </TouchableOpacity>
            <View style={styles.headerCom}>
              <Text style={styles.headerText}>Wholetex Pickup</Text>
            </View>
            <View style={styles.headerbtn}>
              <TouchableOpacity
                style={styles.clearBtn}
                onPress={() => clearFilter()}>
                <Text style={styles.clearText}>Clear Filter</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.SearchBar}>
            {!showSearchBar ? null : (
              <SearchBar
                placeholder="Search here"
                value={search}
                onChangeText={txt => searchProduct(txt)}
              />
            )}
          </View>
          <FlatList
            data={productData}
            renderItem={renderItem}
            keyExtractor={item => '' + item.order_id + item.id + item.order_item_id}
            contentContainerStyle={{paddingBottom: 150}}
            showsVerticalScrollIndicator={false}
            bounces={false}
            extraData={productData}
          />
        </View>
      )}
    </View>
  );
};

export default Main;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    backgroundColor: Colors.White,
    padding: RFValue(15),
    borderBottomWidth: 1,
    justifyContent: 'space-between',
  },
  indicatior: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  search: {
    height: RFValue(20),
    width: RFValue(20),
  },
  headerCom: {
    justifyContent: 'center',
  },
  headerText: {
    fontSize: RFValue(20),
    fontWeight: 'bold',
  },
  headerbtn: {
    justifyContent: 'center',
  },
  clearBtn: {
    backgroundColor: Colors.Black,
    padding: 5,
    borderRadius: 10,
  },
  clearText: {
    color: Colors.White,
    padding: RFValue(4),
    fontWeight: 'bold',
  },
  SearchBar: {
    marginVertical: RFValue(20),
  },
  image: {
    height: RFPercentage(68),
    width: RFPercentage(45),
    alignSelf: 'center',
    justifyContent: 'space-between',
    borderRadius: RFValue(20),
    overflow: 'hidden',
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  boxStyle: {
    padding: 20,
    backgroundColor: '#000000a0',
    width: Dimensions.get('window').width - 32,
  },
  boxStyleTop: {
    padding: RFValue(8),
    width: RFPercentage(14),
    backgroundColor: '#000000f0',
    borderBottomRightRadius: 20,
    justifyContent: 'center',
  },
  name: {
    color: Colors.White,
    fontSize: RFValue(13),
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  itemText: {
    color: Colors.White,
    fontSize: RFValue(14),
    fontWeight: 'bold',
  },
  orderText: {
    color: Colors.White,
    fontSize: RFValue(14),
    fontWeight: 'bold',
  },
  prefixText: {
    color: Colors.White,
    fontSize: RFValue(14),
    fontWeight: 'bold',
  },
  prefixbtn: {
    borderColor: Colors.White,
    borderWidth: RFValue(2),
    paddingVertical: RFValue(5),
    paddingHorizontal: RFValue(10),
    borderRadius: 20,
    alignSelf: 'center',
  },
  zoneText: {
    color: Colors.White,
    fontSize: RFValue(14),
    fontWeight: 'bold',
    marginRight: RFValue(34),
  },
  qtyText: {
    color: Colors.White,
    fontSize: RFValue(14),
    fontWeight: 'bold',
  },
  pnoText: {
    color: Colors.White,
    fontSize: RFValue(14),
    fontWeight: 'bold',
  },
  pcsText: {
    color: Colors.White,
    fontSize: RFValue(14),
    fontWeight: 'bold',
    marginRight: RFValue(36),
  },
  callImg: {
    width: RFPercentage(3),
    height: RFPercentage(3),
    alignSelf: 'center',
  },
  printingImg: {
    width: RFPercentage(3),
    height: RFPercentage(3),
    alignSelf: 'center',
  },
  btn: {
    borderColor: Colors.White,
    borderWidth: RFValue(2),
    paddingVertical: RFValue(5),
    paddingHorizontal: RFValue(50),
    borderRadius: RFValue(20),
    alignSelf: 'center',
    marginRight: RFValue(10),
  },
  orederText: {
    color: Colors.White,
    fontWeight: 'bold',
    fontSize: RFValue(14),
  },
});
