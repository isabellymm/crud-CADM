import React, { useState, useEffect } from 'react';
import { View, TextInput, Pressable, StyleSheet, Text, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ProductDatabase, useProductDatabase } from '@/database/useProductDatabase';

const UpdateProducts = () => {
  const navigation = useNavigation();
  const productDatabase = useProductDatabase();
  const route = useRoute();
  const productId = route.params.productId;

  const [product, setProduct] = useState({
    nome: '',
    categoria: '',
    descricao: '',
    quantidade: '',
    preco: '',
  });
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const fetchedProduct = await productDatabase.getProductById(productId);
        if (fetchedProduct) {
          setProduct({
            nome: fetchedProduct.nome || '',
            categoria: fetchedProduct.categoria || '',
            descricao: fetchedProduct.descricao || '',
            quantidade: String(fetchedProduct.quantidade) || '',
            preco: String(fetchedProduct.preco) || ''
          });
        }
      } catch (error) {
        console.error('Failed to fetch product:', error);
      }
    };
  
    fetchProduct();
  }, [productId]);

  const updateProducts = async () => {
    try {
      await productDatabase.update({
        id: productId,
        nome: product.nome,
        categoria: product.categoria,
        descricao: product.descricao,
        quantidade: parseInt(product.quantidade, 10),
        preco: parseFloat(product.preco)
      });
      navigation.goBack();
    } catch (error) {
      console.error('Failed to update product:', error);
    }
  };
  
  const handleSubmit = () => {
    updateProducts();
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Editar Produtos</Text>
      <Text style={styles.label}>Nome:</Text>
      <TextInput
        style={styles.input}
        value={product.nome}
        onChangeText={(text) => setProduct({...product, nome: text})}
        placeholder="Enter product name"
      />
      <Text style={styles.label}>Categoria:</Text>
      <TextInput
        style={styles.input}
        value={product.categoria}
        onChangeText={(text) => setProduct({...product, categoria: text})}
        placeholder="Enter product category"
      />
      <Text style={styles.label}>Descrição:</Text>
      <TextInput
        style={styles.input}
        value={product.descricao}
        onChangeText={(text) => setProduct({...product, descricao: text})}
        placeholder="Enter product description"
      />
      <Text style={styles.label}>Quantidade:</Text>
      <TextInput
        style={styles.input}
        value={product.quantidade}
        onChangeText={(text) => setProduct({...product, quantidade: text})}
        placeholder="Enter product quantity"
        keyboardType="number-pad"
      />
      <Text style={styles.label}>Preço:</Text>
      <TextInput
        style={styles.input}
        value={product.preco}
        onChangeText={(text) => setProduct({...product, preco: text})}
        placeholder="Enter product price"
        keyboardType="number-pad"
      />
      <Pressable style={styles.createButton} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Editar Produto</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
  },
  input: {
    height: 40,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
  label: {
    fontWeight: 'bold',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 50,
  },
  createButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default UpdateProducts;
