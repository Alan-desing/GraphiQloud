import { gql } from '@apollo/client'
import { useQuery } from '@apollo/client/react'

const GET_DATA = gql`
  query {
    users {
      name
    }

    products {
      name
      price
    }

    orders {
      status
    }
  }
`

function App() {
  const { loading, error, data } = useQuery(GET_DATA)

  if (loading) return <h1>Cargando...</h1>

  if (error) return <h1>Error: {error.message}</h1>

  return (
    <div style={{ padding: "20px" }}>
      <h1>GraphiQloud</h1>

      <h2>Usuarios</h2>
      <ul>
        {data.users.map((user, index) => (
          <li key={index}>{user.name}</li>
        ))}
      </ul>

      <h2>Productos</h2>
      <ul>
        {data.products.map((product, index) => (
          <li key={index}>
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>

      <h2>Pedidos</h2>
      <ul>
        {data.orders.map((order, index) => (
          <li key={index}>{order.status}</li>
        ))}
      </ul>
    </div>
  )
}

export default App