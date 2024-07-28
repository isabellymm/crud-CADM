import { useNavigation } from '@react-navigation/native';
import { useEffect, useState , useCallback } from "react";
import { View, Text, Modal, Pressable, ScrollView, TouchableOpacity, Image, StyleSheet } from "react-native";
import { ProductDatabase, useProductDatabase } from "@/database/useProductDatabase";
import { useFocusEffect } from '@react-navigation/native';

const ListProducts = () => {
  const navigation = useNavigation();
  const productDatabase = useProductDatabase();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    try {
      const response = await productDatabase.show();
      console.log(response)
      if (response && response.length > 0) {
        setProducts(response);
      } else {
        setProducts([]);
        console.log('No products found');
      }
    } catch (error) {
      console.error('Failed to fetch products:', error);
      setProducts([]);
    }
  };
  
  useFocusEffect(
    useCallback(() => {
      loadProducts();
    }, [])
  );

  const deleteProducts = async (id) => {
    try {
      await productDatabase.remove(id);
      loadProducts();
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  };

  const handleConfirmDelete = () => {
    if (selectedProduct && selectedProduct.id) {
      console.log('Deleted product:', selectedProduct);
      deleteProducts(selectedProduct.id);
      setModalVisible(false);
    } else {
      console.error('No product selected');
    }
  };

  const handleDeletePress = (product) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Produtos</Text>
      <ScrollView style={styles.productsContainer}>
        {products.map((product, index) => (
          <View key={index} style={styles.product}>
            <View style={styles.productInfo}>
              <Text style={styles.productTitle}>Produto:  {product.nome}</Text>
              <Text style={styles.productText}>Categoria: {product.categoria}</Text>
              <Text style={styles.productText}>Descrição: {product.descricao}</Text>
              <Text style={styles.productText}>Preço: {product.preco}</Text>
              <Text style={styles.productText}>Quantidade: {product.quantidade}</Text>
            </View>
            <View style={styles.iconContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('UpdateProducts', { productId: product.id })}>
              <Image source={require('../../assets/images/editar.png')} style={styles.icon} />
            </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeletePress(product)}>
                <Image source={require('../../assets/images/excluir.png')} style={styles.icon} />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
      <Pressable style={styles.createButton} onPress={() => navigation.navigate('CreateProducts')}>
        <Text style={styles.buttonText}>Criar Produto</Text>
      </Pressable>

      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Tem certeza que deseja excluir este produto?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalButton, styles.deleteButton]} onPress={handleConfirmDelete}>
                <Text style={styles.buttonText}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 50,
  },
  productsContainer: {
    marginBottom: 20,
    marginTop: 20,

  },
  product: {
    backgroundColor: '#edf2fb',
    padding: 15,
    borderRadius: 10,
    marginBottom: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  productInfo: {
    flex: 1,
    marginRight: 10,
  },
  productTitle: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  productText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 30,
    height: 30,
    marginLeft: 16,
  },
  createButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    width: '45%',
  },
  cancelButton: {
    backgroundColor: '#6c757d',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
  },
});

  export default ListProducts;