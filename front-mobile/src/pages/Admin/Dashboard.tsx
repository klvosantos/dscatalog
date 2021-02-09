import React, { useState } from "react";
import { View } from "react-native";
import { TabBar } from "../../components";

import Categories from "./Categories";
import Users from "./Users";

// Products
import Products from "./Products/ListProducts";
import FormProduct from './Products/FormProduct';

const Dashboard: React.FC = () => {
    const [ screen, setScreen ] = useState("products");
    return (
        <View>
            <TabBar screen={screen} setScreen={setScreen}/>  
            {screen === "products" && <Products setScreen={setScreen}/>}
            {screen === "newProduct" && <FormProduct setScreen={setScreen}/>}
            {screen === "categories" && <Categories />}
            {screen === "users" && <Users />}
        </View>
    );
};

export default Dashboard;