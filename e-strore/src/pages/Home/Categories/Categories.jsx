import React from 'react';

const categories = [
    { 
        name: 'Electronics', 
        image: 'https://images.pexels.com/photos/1054397/pexels-photo-1054397.jpeg?auto=compress&cs=tinysrgb&w=600' 
    },
    { 
        name: 'Clothes', 
        image: 'https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg?auto=compress&cs=tinysrgb&w=600' 
    },
    { 
        name: 'Shoes', 
        image: 'https://images.pexels.com/photos/267202/pexels-photo-267202.jpeg?auto=compress&cs=tinysrgb&w=600' 
    },
    { 
        name: 'Accessories', 
        image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=600' 
    },
];

const Categories = () => {
    return (
        <div className="w-full py-8 px-4">
            <h2 className="text-2xl font-bold mb-6 text-center">Shop by Category</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
                {categories.map((category, idx) => (
                    <div
                        key={idx}
                        className="bg-white rounded-lg shadow-lg hover:scale-105 transition-transform cursor-pointer"
                    >
                        <img
                            src={category.image}
                            alt={category.name}
                            className="w-full h-32 sm:h-36 md:h-40 lg:h-44 object-cover rounded-t-lg"
                        />
                        <h3 className="text-center font-medium py-2">{category.name}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Categories;
