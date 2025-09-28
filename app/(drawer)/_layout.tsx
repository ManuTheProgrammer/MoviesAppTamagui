import { colorTokens } from '@tamagui/themes';
import Drawer from 'expo-router/drawer';
import { Ionicons } from '@expo/vector-icons';

//il vero layout con drawer screen
const DrawerLayout = () =>{
return(
    <Drawer screenOptions={{
        headerShown:true,
        drawerHideStatusBarOnOpen:true,
        drawerActiveBackgroundColor: colorTokens.dark.blue.blue7,
        drawerActiveTintColor: "#fff",
       drawerLabelStyle: {marginLeft: -20},
    }}>
        <Drawer.Screen name="home" options={{
            title:"MovieStar",
            headerShown: false,
            drawerIcon: ({color, size}) => <Ionicons name="home"
            size={size} color={color}/>
        }}/>
         <Drawer.Screen name="favorites" options={{
            title:"Preferiti",
            headerShown: false,
            drawerIcon: ({color, size}) => <Ionicons name="star"
            size={size} color={color}/>
        }}/>   
    </Drawer>
);

};
export default DrawerLayout;