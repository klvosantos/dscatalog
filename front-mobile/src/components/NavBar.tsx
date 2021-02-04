import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { TouchableOpacity, Image, View, Text } from "react-native";
import { nav } from "../styles";
import { TouchableNativeFeedback } from "react-native-gesture-handler";

import menu from "../assets/menu.png";
const NavBar: React.FC = () => {
    const [ show, setShow ] = useState(false);
    const navigation = useNavigation();
    const route = useRoute();
    

    function navigate(path: any) {
        if (path) {
            setShow(false);
            navigation.navigate(path); // esse navigate não tem ligação com o nome da função navigate.
        }
        setShow(false);
    }
    

    return (
        <TouchableOpacity 
            activeOpacity={0.8}
            style={nav.drawer}
            onPress={() => setShow(!show)}
        >
            <Image source={menu} />
            {show ? (
                <View style={nav.options}>
                    <TouchableNativeFeedback 
                    style={nav.option}
                    onPress={() => navigate("Home")}
                    >
                        <Text 
                        style={[
                            nav.textOption,
                            route.name === "Home" ? nav.textActive : null
                            ]}
                        >
                            Home
                        </Text>
                    </TouchableNativeFeedback>

                    <TouchableNativeFeedback 
                    style={nav.option} 
                    onPress={() => navigate("Catalog")}>
                        <Text style={[nav.textOption,
                            route.name === "Catalog" ? nav.textActive : null
                            ]}
                        >
                            Catalogo
                        </Text>
                    </TouchableNativeFeedback>

                    <TouchableNativeFeedback 
                    style={nav.option}
                    onPress={() => navigate("Login")}>
                        <Text style={[nav.textOption,
                            route.name === "ADM" ? nav.textActive : null
                            ]}
                            >
                            ADM
                        </Text>
                    </TouchableNativeFeedback>                    
                </View>
            ) : null}
        </TouchableOpacity>
    );
};

export default NavBar;