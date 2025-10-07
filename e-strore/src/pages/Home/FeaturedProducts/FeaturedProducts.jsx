import React from 'react';

// Mock product data
const products = [
    {
        name: 'Wireless Headphones',
        price: 59.99,
        image: 'https://images.pexels.com/photos/373945/pexels-photo-373945.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
        name: 'Smart Watch',
        price: 129.99,
        image: 'https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
        name: 'Running Shoes',
        price: 89.99,
        image: 'https://images.pexels.com/photos/2529147/pexels-photo-2529147.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
        name: 'Leather Wallet',
        price: 39.99,
        image: 'https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600',
    },
];

const FeaturedProducts = () => {
    return (
        <div className="w-full py-8 px-4">
            <h2 className="text-2xl font-bold mb-6 text-center">Featured Products</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product, idx) => (
                    <div
                        key={idx}
                        className="bg-white rounded-lg shadow-lg hover:scale-105 transition-transform cursor-pointer flex flex-col"
                    >
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-48 object-cover rounded-t-lg"
                        />
                        <div className="p-4 flex flex-col flex-1">
                            <h3 className="text-lg font-medium mb-2">{product.name}</h3>
                            <p className="text-gray-700 font-semibold mb-4">${product.price}</p>
                            <button className="mt-auto bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeaturedProducts;
