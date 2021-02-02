import React, { useEffect, useState } from "react";
import { Text, View, ActivityIndicator, TouchableOpacity, Image, ScrollView } from "react-native";
import { api } from "../services";
import { theme, text } from "../styles";

import arrow from '../assets/leftArrow.png';
const ProductDetails = ({ route: { params: { id } } }) => {
    const [product, setProduct] = useState({
        id: null,
        name: null,
        description: null,
        price: null,
        imgUrl: null,
        date: null,
        categories: [],
    });
    const [loading, setLoading] = useState(false);

    async function loadProductData() {
        setLoading(true);
        const res = await api.get(`products/${id}`);
        setProduct(res.data);
        setLoading(false);
    }

    useEffect(() => {
        loadProductData();
    }, []);

    return (
        <View>
            {loading ? <ActivityIndicator size="large" /> : (            
            <View>
                <TouchableOpacity>
                    <Image source={arrow} />
                    <Text>Voltar</Text>
                </TouchableOpacity>
                <View> 
                    <Image source={{ uri: product.imgUrl }}  style={{ width: 150, height:150 }}/>                     
                </View>
                <Text>{product.name}</Text>
                <View>
                    <Text>R$</Text>
                    <Text>{product.price}</Text>    
                </View>
                <ScrollView>
                    <Text>{product.description}</Text>
                </ScrollView>                
            </View>)}
        </View>
    )
}

export default ProductDetails;