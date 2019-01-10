import { Dimensions, } from 'react-native';

var { width } = Dimensions.get('window')

export default {
  container: {
    backgroundColor: "#FAFAFA"
  },
  text: {
    alignSelf: "center",
    marginBottom: 7
  },
  header: {
    marginTop: 10,
    marginLeft: 15,
    fontSize: 25,
    fontFamily: 'DBRegular',
  },
  mb: {
    marginBottom: 15
  },
  NewsLeft: {
    width: 400
  },
  NewsText: {
    fontSize: 25, 
    fontFamily: 'DBRegular', 
    width: width - 150
  },
  NewsThumbnail: {
    borderRadius: 5,
    width: 100,
    margin: 10,
  },
  NewsView: {
    //backgroundColor:'#000',
    borderBottomColor: '#E0E0E0',
    borderBottomWidth: 1,
    width: width,
    //margin: 5,
  },
};
