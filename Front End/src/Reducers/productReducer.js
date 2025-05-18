

export default function productReducer(currentState, action) {
    switch (action.type) {
      case 'delete':
        if (!action.payload?.id) return currentState;
        return currentState.filter(product => product.id !== action.payload.id);
      

case "Add":
  {
        // Convert price to number before sending
        const productToSend = {
            name: action.payload.name,
            price: action.payload.price ? parseFloat(action.payload.price) : 0 // Convert to number
        };


const updatedproducts =[...currentState,productToSend]


return updatedproducts

  }

case "update":
{


const updateproducts =currentState.map((t)=>
t.id === action.payload.id
?
{...t,name:action.payload.name,price:Number(action.payload.price)}
:
t
)


return updateproducts

}
      // Always include a default case
      default:
        return currentState;
    }


  }