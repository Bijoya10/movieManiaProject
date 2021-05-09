import {Header,Icon} from "react-native-elements"
import * as React from "react"


export default class AppHeader extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
      return(
        <Header 
            leftComponent={<Icon color="#383940" type="font-awesome" name="bars" onPress={()=>{
                this.props.navigation.toggleDrawer();
            }}/>}
            centerComponent={{text:this.props.title, style:{color:"#383940",fontSize:20}}}
            rightComponent={<Icon color="#383940" type="font-awesome" name="search" onPress={()=>{
                this.props.navigation.navigate("Movie")
            }}/>}
            backgroundColor={"#A98AB0"}
        />
    )  
    }
    
}