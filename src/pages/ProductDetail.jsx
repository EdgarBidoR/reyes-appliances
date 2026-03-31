import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import productsData from '../data/products.json';
import storeData from '../data/store.json';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const product = productsData.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Producto no encontrado</h2>
        <p className="text-gray-500 mb-6">El producto que buscas no existe o ha sido retirado.</p>
        <Link to="/productos" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium">
          Volver al catálogo
        </Link>
      </div>
    );
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-DO', { style: 'currency', currency: 'DOP' }).format(price);
  };

  const genericWaMessage = storeData.whatsappMessageTemplate.replace('{productName}', product.name);
  const wpLink = `https://wa.me/${storeData.whatsapp}?text=${encodeURIComponent(genericWaMessage)}`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      <button onClick={() => navigate(-1)} className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-blue-600 mb-8 transition-colors group">
        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
        Volver atrás
      </button>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          
          {/* Images Section */}
          <div className="bg-gray-50 p-8 lg:p-12 flex items-center justify-center relative">
            <span className="absolute top-6 left-6 bg-white px-4 py-1.5 rounded-full text-sm font-semibold text-gray-700 shadow-sm border border-gray-100">
              {product.category}
            </span>
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full max-w-md object-contain mix-blend-multiply drop-shadow-xl"
            />
          </div>

          {/* Info Section */}
          <div className="p-8 lg:p-12 flex flex-col justify-center">
            {product.available && (
              <div className="inline-flex items-center gap-1.5 text-green-600 text-sm font-medium bg-green-50 px-3 py-1 rounded-full w-fit mb-6">
                <CheckCircle2 className="w-4 h-4" /> En inventario
              </div>
            )}
            
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight mb-4">
              {product.name}
            </h1>
            
            <p className="text-4xl font-bold text-blue-600 mb-8">
              {formatPrice(product.price)}
            </p>

            <div className="prose prose-gray mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Descripción</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                {product.description}
              </p>
            </div>

            {product.features && product.features.length > 0 && (
              <div className="mb-10">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Características principales</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-600 bg-gray-50 px-4 py-2.5 rounded-xl border border-gray-100">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-auto">
              <a 
                href={wpLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#1DA851] text-white py-4 px-8 rounded-2xl font-bold text-lg transition-colors shadow-lg shadow-green-500/30"
              >
                Consultar por WhatsApp
              </a>
              <p className="text-center sm:text-left text-sm text-gray-500 mt-4">
                Al hacer click se abrirá un chat directo con un representante.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
