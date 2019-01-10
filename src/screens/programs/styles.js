import { Dimensions, } from 'react-native';

var { width } = Dimensions.get('window')
const height = Math.round(width * 9/16) 

export default {
  
  container: {
    backgroundColor: "#D32A3D"
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
    width: 100, 
    margin: 10,
  },
  News_Thumbnail: {
    width: 100, 
    margin: 5,
  },
  NewsView: {
    borderBottomColor: '#E0E0E0', 
    borderBottomWidth: 1, 
    width: width - 20, 
    margin: 5,
  },
  liveHead: {
    backgroundColor: '#B73358',
  },
  texth: {
    color:'#fff',
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 5,
    fontFamily: 'DBRegular',
    fontSize: 27,
  },
  liveBody: {
    justifyContent: 'center',
    marginLeft: 20,
    marginTop: 20,
    
  },
  text:{
    fontFamily: 'DBRegular',
    marginRight: 5,
    fontSize: 25,
  }
};
