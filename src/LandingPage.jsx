/* eslint-disable react/prop-types */
import  { useState } from 'react';
import { ShoppingCart, Home, Clock, Settings, LogOut, Menu } from 'lucide-react';

const categories = [
  { name: 'Popular', icon: '⭐' },
  { name: 'Ice Cream', icon: '🍦' },
  { name: 'Rice Bowl', icon: '🍚' },
  { name: 'Coffee', icon: '☕' },
  { name: 'Snack', icon: '🍿' },
  { name: 'Dessert', icon: '🧁' },
  { name: 'Salad', icon: '🥗' },
];

const riceBowls = [
  {
    id: 1,
    name: 'Thai Rice Bowl',
    price: 27.09,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYm5zsbRQDgV9D7ZukLggvSbLRL9z8UJFkMw&s',
    description: 'Over Hard, Mild',
  },
  {
    id: 2,
    name: 'Smoke Salmon Rice Bowl',
    price: 27.09,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-RXxxDDefVAisDkb--7Pfwyqv9xJ6X7fD7Q&s',
    description: 'With Wasabi',
  },
  {
    id: 3,
    name: 'Healthy Rice Bowl',
    price: 27.09,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTandEjaSuAkbvCY3HTjgGWWblKy6l877djEw&s',
    description: 'Low Calorie',
  },
  {
    id: 4,
    name: 'Bibimbap Rice Bowl',
    price: 27.09,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT25oTaf6vPwnPQdA_ghmio5ubAlkuB3qrkbA&s',
    description: 'Spicy',
  },
  {
    id: 5,
    name: 'Golden Beef Rice Bowl',
    price: 27.09,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJ0NYO_TbVJhZSccc5aAHOtx9Zd7b-PKx5jw&sna',
    description: 'Medium Rare',
  },
];

const LandingPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('Popular');
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Miso Ramen', price: 7.09, quantity: 2, description: 'Over Hard, Mild' },
    { id: 2, name: 'Waffle', price: 7.09, quantity: 2, description: 'Vanilla Ice Cream' },
    { id: 3, name: 'Mocha Ice Cream', price: 7.09, quantity: 2, description: 'Cone' },
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPayment, setSelectedPayment] = useState('Cash');

  const addToCart = (item) => {
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems(cartItems.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId, delta) => {
    setCartItems(
      cartItems.map((item) => {
        if (item.id === itemId) {
          const newQuantity = Math.max(0, item.quantity + delta);
          return newQuantity === 0 ? null : { ...item, quantity: newQuantity };
        }
        return item;
      }).filter(Boolean)
    );
  };

  const calculateTotal = () => {
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const discount = 5.00;
    const tax = subtotal * 0.08;
    return {
      subtotal: subtotal.toFixed(2),
      discount: discount.toFixed(2),
      tax: tax.toFixed(2),
      total: (subtotal - discount + tax).toFixed(2)
    };
  };

  const filteredBowls = riceBowls.filter((bowl) =>
    bowl.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totals = calculateTotal();

  return (
    <div className="flex h-screen bg-gray-100">
      <nav className="w-20 bg-white shadow-lg">
        <div className="flex flex-col items-center h-full py-8 space-y-8">
          <div className="text-red-500">
            <Menu size={24} />
          </div>
          <div className="flex-1 space-y-8">
            <NavItem icon={<Home size={24} />} active />
            <NavItem icon={<ShoppingCart size={24} />} />
            <NavItem icon={<Clock size={24} />} />
            <NavItem icon={<Settings size={24} />} />
          </div>
          <NavItem icon={<LogOut size={24} />} />
        </div>
      </nav>

      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
          <div className="relative w-64">
            <input
              type="text"
              placeholder="Search menu..."
              className="w-full p-2 pl-8 rounded-lg bg-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <span>Lauren Smith</span>
            <div className="w-8 h-8 bg-gray-300 rounded-full" />
          </div>
        </header>

        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Choose Category</h2>
          <div className="flex space-x-4">
            {categories.map((category) => (
              <CategoryButton
                key={category.name}
                name={category.name}
                icon={category.icon}
                active={category.name === selectedCategory}
                onClick={() => setSelectedCategory(category.name)}
              />
            ))}
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Rice Bowl Menu</h2>
            <select className="p-2 rounded-lg bg-white">
              <option>Sort by A-Z</option>
            </select>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {filteredBowls.map((bowl) => (
              <MenuCard
                key={bowl.id}
                item={bowl}
                onAddToCart={() => addToCart(bowl)}
              />
            ))}
          </div>
        </div>
      </main>

      <aside className="w-96 bg-white p-8">
        <h2 className="text-xl font-bold mb-6">Bills</h2>
        <div className="space-y-4">
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onIncrement={() => updateQuantity(item.id, 1)}
              onDecrement={() => updateQuantity(item.id, -1)}
              onRemove={() => removeFromCart(item.id)}
            />
          ))}
        </div>
        <div className="mt-8 space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-500">Subtotal</span>
            <span>${totals.subtotal}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Discount</span>
            <span>${totals.discount}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Tax</span>
            <span>${totals.tax}</span>
          </div>
          <div className="flex justify-between font-bold mt-4">
            <span>Total</span>
            <span>${totals.total}</span>
          </div>
        </div>
        <div className="mt-8">
          <h3 className="font-bold mb-4">Payment Method</h3>
          <div className="flex space-x-4">
            {['Cash', 'Debit Card', 'QR'].map((method) => (
              <PaymentButton
                key={method}
                label={method}
                active={selectedPayment === method}
                onClick={() => setSelectedPayment(method)}
              />
            ))}
          </div>
          <button 
            className="w-full bg-red-500 text-white py-3 rounded-lg mt-6 hover:bg-red-600 transition-colors"
            onClick={() => alert(`Order placed! Payment method: ${selectedPayment}`)}
          >
            Add to Billing
          </button>
        </div>
      </aside>
    </div>
  );
};

const NavItem = ({ icon = null, active = false }) => (
  <div className={`p-3 rounded-lg cursor-pointer transition-colors ${active ? 'bg-red-100 text-red-500' : 'text-gray-400 hover:text-gray-600'}`}>
    {icon}
  </div>
);

const CategoryButton = ({ name = '', icon = '', active = false, onClick = () => {} }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center p-4 rounded-xl transition-colors ${
      active ? 'bg-red-100 text-red-500' : 'bg-white hover:bg-red-50'
    }`}
  >
    <span className="text-2xl mb-2">{icon}</span>
    <span className="text-sm">{name}</span>
  </button>
);

const MenuCard = ({ item = { name: '', price: 0, image: '', description: '' }, onAddToCart = () => {} }) => (
  <div className="bg-white rounded-xl p-4 transition-transform hover:scale-105">
    <img
      src={item.image}
      alt={item.name}
      className="w-full h-48 object-cover rounded-lg mb-4"
    />
    <h3 className="font-bold mb-2">{item.name}</h3>
    <p className="text-gray-500 text-sm mb-2">{item.description}</p>
    <div className="flex justify-between items-center">
      <span className="font-bold">${item.price}</span>
      <button
        onClick={onAddToCart}
        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
      >
        Add to Cart
      </button>
    </div>
  </div>
);

const CartItem = ({ 
  item = { name: '', price: 0, quantity: 0, description: '' },
  onIncrement = () => {},
  onDecrement = () => {},
  onRemove = () => {}
}) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center space-x-4">
      <img
        src="/api/placeholder/60/60"
        alt={item.name}
        className="w-12 h-12 rounded-lg object-cover"
      />
      <div>
        <h4 className="font-bold">{item.name}</h4>
        <span className="text-gray-500 text-sm">{item.description}</span>
      </div>
    </div>
    <div className="flex items-center space-x-4">
      <span>${item.price}</span>
      <div className="flex items-center space-x-2">
        <button 
          onClick={onDecrement}
          className="w-6 h-6 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
        >
          -
        </button>
        <span>{item.quantity}</span>
        <button 
          onClick={onIncrement}
          className="w-6 h-6 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
        >
          +
        </button>
      </div>
      <button 
        onClick={onRemove}
        className="text-gray-400 hover:text-red-500 transition-colors"
      >
        ×
      </button>
    </div>
  </div>
);

const PaymentButton = ({ label = '', active = false, onClick = () => {} }) => (
  <button
    onClick={onClick}
    className={`flex-1 py-2 rounded-lg transition-colors ${
      active ? 'bg-red-100 text-red-500' : 'bg-gray-100 hover:bg-gray-200'
    }`}
  >
    {label}
  </button>
);

export default LandingPage;