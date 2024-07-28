import { useSQLiteContext } from "expo-sqlite"

export type ProductDatabase = {
  id: number
  name : string,
  category : string,
  desc : string,
  quantity : number,
  price : number,
}

export function useProductDatabase() {
  const database = useSQLiteContext()

  async function create(data: Omit<ProductDatabase, "id">) {
    const statement = await database.prepareAsync(
      "INSERT INTO produtos (nome, categoria, descricao, quantidade, preco) VALUES ($name, $category, $desc, $quantity, $price)"
    )

    try {
      const result = await statement.executeAsync({
        $name : data.name,
        $category : data.category,
        $desc : data.desc,
        $quantity : data.quantity,
        $price : data.price,
      })

      const insertedRowId = result.lastInsertRowId.toLocaleString()

      return { insertedRowId }
    } catch (error) {
      throw error
    } finally {
      await statement.finalizeAsync()
    }
  }

   async function getProductById(id : number) {
    const query = "SELECT * FROM produtos WHERE id = ?";
    const product = await database.getFirstAsync<ProductDatabase>(query, [id]);
    return product;
  }
  
  async function update(data : any) {
    const statement = await database.prepareAsync(
      "UPDATE produtos SET nome = $nome, categoria = $categoria, descricao = $descricao, quantidade = $quantidade, preco = $preco WHERE id = $id"

    );
    const dataX = {
      $id: data.id, 
      $nome: data.nome,
      $categoria: data.categoria,
      $descricao: data.descricao,
      $quantidade: data.quantidade,
      $preco: data.preco
    };
    
    try {
      const r = await statement.executeAsync(dataX);
      console.log('Result', r);
      if (r.changes === 0) {
        console.log('No changes made. Check if the ID exists or if data actually needs updating.');
      }
    } catch (error) {
      console.error('Failed to update product:', error);
      console.log(error); 
    } finally {
      await statement.finalizeAsync();
    }
  }
  
  
  async function remove(id: number) {
    try {
      await database.execAsync("DELETE FROM produtos WHERE id = " + id)
    } catch (error) {
      throw error
    }
  }

  async function show() {
    try {
      const query = "SELECT * FROM produtos";
      const response = await database.getAllAsync<ProductDatabase>(query);
      return response;
    } catch (error) {
      throw error;
    }
  }
  

  return { create, update, remove, show, getProductById }
}