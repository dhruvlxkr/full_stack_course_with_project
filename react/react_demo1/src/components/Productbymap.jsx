import React from 'react'

const Productbymap = () => {
    let Product = [{
        'id' : 1,
        'name' : 'I Phone',
        'category' : 'Mobile',
        'price' : 129000, 
    },
   {
        'id' : 2,
        'name' : 'Lenova',
        'category' : 'Laptop',
        'price' : 51000, 
    },
    {
        'id' : 3,
        'name' : 'Ear Buds',
        'category' : 'Electronic',
        'price' : 5100, 
    },
    {
        'id' : 4,
        'name' : 'Samsung Tv',
        'category' : 'Electronic',
        'price' : 51052, 
    }
]



  return (
    <>
    <h1>Product</h1>
    {Product.map((data) => (
        <div key={data.id}>
            <h2>{data.id}</h2>
         <h3>{data.name}</h3>
         <p>{data.category}</p>
         <p>{data.price}</p>
    </div>
    ) )}
    </>
  );
}

export default Productbymap