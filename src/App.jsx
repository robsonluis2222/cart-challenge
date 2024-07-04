/*
? DESAFIO - Shopping Cart:

Você deve desenvolver um carrinho de compras funcional.
Funcionalidades que esperamos que você desenvolva:

x - inserção de novos produtos no carrinho
x - remoção de produtos já inseridos
x - alteração de quantidade de cada item 
x - cálculo do preço total dos itens inseridos

todo - FUNCIONALIDADE EXTRA: aplicação de cupom de desconto
*/
import './styles.scss';
import { api } from './api';
import PageHeader from './layout/PageHeader';
import PageTitle from './layout/PageTitle';
import Summary from './Summary';
import TableRow from './TableRow';
import { useEffect, useState } from 'react';

function App() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    api.get('/cart')
      .then(function (response) {
        setCart(response.data);
        calculateTotal(response.data); // Calcular o total ao obter os produtos
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const addProduct = () => {
    let precoItem = Math.floor(Math.random() * 900) + 100;
    api.post('/cart', {
      name: 'Nome do produto',
      category: 'Categoria',
      count: 1,
      totalThis: precoItem,
      price: precoItem
    })
      .then(function (response) {
        console.log('>>>> Adicionado novo produto <<<<');
        getProducts(); // Atualiza a lista de produtos após adicionar
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const updateProduct = (operator, id, nome, categoria, preco, quantidade) => {
    let newCount = operator === 'menos' ? quantidade - 1 : quantidade + 1;

    api.put(`/cart/${id}`, {
      name: nome,
      category: categoria,
      count: newCount,
      totalThis: newCount * preco,
      price: preco
    })
      .then(function (response) {
        console.log(`${operator === 'menos' ? 'Removi um' : 'Adicionei um'} no id: ${id}`);
        getProducts(); // Atualiza a lista de produtos após a atualização
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const removeProduct = (id) => {
    api.delete(`/cart/${id}`)
      .then(function (response) {
        console.log(`Item removido com sucesso: ${id}`);
        getProducts(); // Atualiza a lista de produtos após a remoção
      })
      .catch(function (error) {
        console.log(`Não consegui remover o item: ${id}`);
      });
  };

  const calculateTotal = (cartItems) => {
    let totalPrice = cartItems.reduce((total, product) => total + product.totalThis, 0);
    setTotal(totalPrice); // Atualiza o estado `total` com o preço total calculado
  };

  return (
    <>
      <PageHeader />
      <main>
        <PageTitle data={'E-COMMERCE CART'} />
        <button onClick={addProduct}>Adicionar Item</button><br />
        <div className='content'>
          <section>
            <table>
              <thead>
                <tr>
                  <th>Produto</th>
                  <th>Preço</th>
                  <th>Quantidade</th>
                  <th>Total</th>
                  <th>-</th>
                </tr>
              </thead>
              <tbody hidden={!cart.length}>
                {cart.map(product => (
                  <TableRow
                    key={product._id}
                    id={product._id}
                    nome={product.name}
                    categoria={product.category}
                    quantidade={product.count}
                    totalDele={product.totalThis}
                    preco={product.price}
                    removeProduct={removeProduct}
                    updateProduct={updateProduct}
                  />
                ))}
                {/* Aqui dentro do tbody, calculamos o total dos itens */}
              </tbody>
            </table>
          </section>
          <aside>
            <Summary total={total} />
          </aside>
        </div>
      </main>
    </>
  );
}

export default App;
