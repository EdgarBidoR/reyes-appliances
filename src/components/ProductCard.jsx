import { ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import storeData from '../data/store.json';

export default function ProductCard({ product }) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-DO', {
      style: 'currency',
      currency: 'DOP',
    }).format(price);
  };

  const genericWaMessage = storeData.whatsappMessageTemplate.replace('{productName}', product.name);
  const wpLink = `https://wa.me/${storeData.whatsapp}?text=${encodeURIComponent(genericWaMessage)}`;

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full">
      <Link to={`/productos/${product.id}`} className="relative aspect-[4/3] overflow-hidden bg-gray-50 block">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-700 shadow-sm">
          {product.category}
        </div>
      </Link>
      
      <div className="p-5 flex flex-col flex-grow">
        <Link to={`/productos/${product.id}`}>
          <h3 className="font-semibold text-lg text-gray-900 line-clamp-2 hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-gray-500 mt-2 line-clamp-2">{product.description}</p>
        
        <div className="mt-auto pt-4 flex items-center justify-between">
          <p className="text-xl font-bold text-gray-900">{formatPrice(product.price)}</p>
        </div>
        
        <a 
          href={wpLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1DA851] text-white py-2.5 px-4 rounded-xl font-medium transition-colors shadow-sm"
        >
          Consultar por WhatsApp
        </a>
      </div>
    </div>
  );
}
