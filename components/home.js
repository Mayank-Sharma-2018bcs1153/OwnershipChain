import React,{Component} from 'react';
import {StyleSheet,View,Text, Image, Alert,ScrollView} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import {username2} from './loginScreen1'
let imag=""
class List extends Component{
    constructor(props){
        super(props);
        this.state={
            dataPeople:[],
            // username:'',
        };
    }
    componentDidMount=()=>{
        this.fetchItem()
    }
    componentDidUpdate=()=>{
        this.fetchItem()
    }
    getListViewItem=(item)=>{
        // Alert.alert(item.photo);
        imag=item.photo;
        this.props.navigation.navigate('Images')
    }
    fetchItem=()=>{
        fetch('https://ownershipchain1.000webhostapp.com/ownership_chain_imagesearch.php',{method:'POST',header:{
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        body:JSON.stringify({
            username:username2,
        })
    }).then((response)=>response.json()).then((responseJson)=>{
        console.log(responseJson);
        this.setState({
            dataPeople:responseJson.item,
        });
    }).catch((error)=>{
        console.error(error)
    })
    };
    itemComponent=({item})=>{
        return(
            <ScrollView>
                <View style={{flex:1,flexDirection:'column',marginBottom:3}}>
                    <Image style={{width:350,height:250,margin:5}} source={{uri:item.photo}}/>
                    {/* <Image style={{width:80,height:80,margin:5}} source={require('./images/Login1.jpeg')}/> */}
                    <View style={{flex:1,justifyContent:'center',margin:5}}>
                        <Text styel={{fontsize:18,color:'green',marginBottom:15}} onPress={this.getListViewItem.bind(this,item)}>
                            {item.description}
                        </Text>
                        <Text styel={{fontsize:16,color:'red'}} onPress={this.getListViewItem.bind(this,item)}>
                            {item.date_time}
                        </Text>
                    </View>
                </View>
            </ScrollView>
        )
    }
    seperatorComponent=()=>{
        return(
            <View style={{backgroundColor:'grey',height:0.5}}></View>
        )
    }
    render(){
        return(
            <FlatList
            data={this.state.dataPeople}
            renderItem={this.itemComponent}
            keyExtractor={(item,index)=>index.toString()}
            ItemSeparatorComponent={this.seperatorComponent}/>
        )
    }
}
export default List;
