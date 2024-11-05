import { useState } from 'react';
import { Package, Truck, CheckCircle, Clock, Search, Filter, ChevronDown, BookOpen, Undo2, MessageCircleHeart, ShoppingBag } from 'lucide-react';
import { formatPrice } from '../utils/format';
import FeedbackModel from '../components/FeedbackModel';
import { Input } from '../components/ui/input';

const orders = [
  {
    id: 'ORD-2024-001',
    date: '2024-03-15',
    total: 89.97,
    status: 'Delivered',
    trackingNumber: 'TRK123456789',
    estimatedDelivery: '2024-03-20',
    items: [
      {
        id: '1',
        title: 'The Midnight Library',
        price: 24.99,
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=200'
      },
      {
        id: '2',
        title: 'Atomic Habits',
        price: 19.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=200'
      }
    ]
  },
  {
    id: 'ORD-2024-002',
    date: '2024-03-10',
    total: 47.98,
    status: 'In Transit',
    trackingNumber: 'TRK987654321',
    estimatedDelivery: '2024-03-25',
    items: [
      {
        id: '3',
        title: 'Project Hail Mary',
        price: 27.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=200'
      },
      {
        id: '4',
        title: 'The Psychology of Money',
        price: 19.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1554774853-719586f82d77?auto=format&fit=crop&q=80&w=200'
      }
    ]
  }
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'Delivered':
      return <CheckCircle className="h-6 w-6 text-green-500" />;
    case 'In Transit':
      return <Truck className="h-6 w-6 text-primary-500" />;
    default:
      return <Clock className="h-6 w-6 text-gray-500" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Delivered':
      return 'bg-green-100 text-green-800';
    case 'In Transit':
      return 'bg-primary-100 text-primary-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default function Orders() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [openFeedback, setOpenFeedback] = useState(false);
  const [sortBy, setSortBy] = useState('date');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredOrders = orders
    .filter(order => 
      (statusFilter === 'All' || order.status === statusFilter) &&
      (order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
       order.items.some(item => item.title.toLowerCase().includes(searchQuery.toLowerCase())))
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'total':
          return b.total - a.total;
        default:
          return 0;
      }
    });

  return (
    <>
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
          <p className="mt-1 text-sm text-gray-500">
            Track and manage your orders
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center space-x-2">
          <Package className="h-5 w-5 text-gray-400" />
          <span className="text-gray-600">{orders.length} orders</span>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by order ID or Item name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full rounded-lg border-gray-300 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <Filter className="h-5 w-5 text-gray-400" />
                <span>Filters</span>
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </button>
              
              {isFilterOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10 border border-gray-200">
                  <div className="p-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Status</h4>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="w-full rounded-md border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="All">All</option>
                      <option value="Delivered">Delivered</option>
                      <option value="In Transit">In Transit</option>
                    </select>
                    
                    <h4 className="text-sm font-medium text-gray-900 mt-4 mb-2">Sort By</h4>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full rounded-md border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="date">Date</option>
                      <option value="total">Total</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-6">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Order Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center space-x-4">
                    {getStatusIcon(order.status)}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{order.id}</h3>
                      <p className="text-sm text-gray-500">Placed on {order.date}</p>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0 flex items-center space-x-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                    <span className="text-lg font-semibold text-gray-900">
                      {formatPrice(order.total)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="p-6">
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-20 w-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-900">{item.title}</h4>
                        <p className="text-sm text-gray-500">
                          Quantity: {item.quantity} × {formatPrice(item.price)}
                        </p>
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                        {formatPrice(item.price * item.quantity)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Footer */}
              <div className="bg-gray-50 px-6 py-4">
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center">
                  <button className="flex items-center bg-primary-600 p-3 rounded-md text-white font-medium text-sm me-2 hover:bg-primary-900">
                    <ShoppingBag className="h-4 w-4 mx-2" />
                    View Order Details
                  </button>
                  {order.status === "Delivered" && (
                    <div className="flex items-center space-x-2">
                      <button className="flex items-center bg-red-600 text-white p-3 rounded-md font-medium text-sm hover:bg-red-900">
                        <Undo2 className="h-4 w-4 mx-2" />
                        Return your order
                      </button>
                      <button 
                      onClick={() => setOpenFeedback(true)}
                      className="flex items-center bg-green-700 text-white p-3 rounded-md font-medium text-sm hover:bg-green-900">
                        <MessageCircleHeart className="h-4 w-4 mx-2" />
                        We want to hear from you!
                      </button>
                    </div>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Order Total</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {formatPrice(order.total)}
                  </p>
                </div>
              </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-4 text-lg font-medium text-gray-900">No Orders Found</h3>
            <p className="mt-2 text-sm text-gray-500">
              {searchQuery || statusFilter !== 'All'
                ? "No orders match your search criteria. Try adjusting your filters."
                : "You haven't placed any orders yet. Start shopping to see your orders here."}
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setStatusFilter('All');
                setSortBy('date');
              }}
              className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </main>
    <FeedbackModel 
        isOpen={openFeedback}
        onClose={() => setOpenFeedback(false)}
      />
    </>
  );
}