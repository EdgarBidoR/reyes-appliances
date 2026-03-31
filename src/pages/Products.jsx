import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import productsData from '../data/products.json';
import categoriesData from '../data/categories.json';
import ProductCard from '../components/ProductCard';
import { Search, Filter, X } from 'lucide-react';

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('categoria') || 'Todos';

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [priceRange, setPriceRange] = useState(100000); // max price filter
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  useEffect(() => {
    // If URL param changes, sync state
    const cat = searchParams.get('categoria');
    if (cat) {
      setSelectedCategory(cat);
    }
  }, [searchParams]);

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    if (cat === 'Todos') {
      searchParams.delete('categoria');
    } else {
      searchParams.set('categoria', cat);
    }
    setSearchParams(searchParams);
  };

  const filteredProducts = useMemo(() => {
    return productsData.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'Todos' || product.category === selectedCategory;
      const matchesPrice = product.price <= priceRange;
      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [searchTerm, selectedCategory, priceRange]);

  const maxAvailablePrice = Math.max(...productsData.map(p => p.price));

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-DO', { style: 'currency', currency: 'DOP' }).format(price);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Catálogo de Productos</h1>
        <div className="relative w-full md:w-96">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow shadow-sm"
            placeholder="Buscar por nombre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {/* Mobile Filter Button */}
        <button 
          className="md:hidden flex items-center gap-2 w-full justify-center bg-white border border-gray-200 py-3 rounded-xl font-medium shadow-sm hover:bg-gray-50"
          onClick={() => setIsMobileFiltersOpen(true)}
        >
          <Filter className="w-5 h-5" />
          Filtrar
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-8 relative">
        {/* Overlay for mobile filters */}
        {isMobileFiltersOpen && (
          <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setIsMobileFiltersOpen(false)} />
        )}

        {/* Filters Sidebar */}
        <aside className={`
          fixed md:sticky top-0 right-0 h-full md:h-fit w-72 bg-white md:bg-transparent shadow-xl md:shadow-none z-50 md:z-auto p-6 md:p-0 overflow-y-auto transform transition-transform duration-300 ease-in-out
          ${isMobileFiltersOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}
          md:w-64 shrink-0
        `}>
          <div className="flex justify-between items-center md:hidden mb-6">
            <h2 className="text-xl font-bold">Filtros</h2>
            <button onClick={() => setIsMobileFiltersOpen(false)} className="p-2 bg-gray-100 rounded-full">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="bg-white md:p-6 md:rounded-2xl md:border md:border-gray-100 md:shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Categorías</h3>
            <div className="space-y-2 mb-8">
              <button
                onClick={() => handleCategoryChange('Todos')}
                className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                  selectedCategory === 'Todos' ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                Todas las categorías
              </button>
              {categoriesData.map(cat => (
                 <button
                 key={cat.id}
                 onClick={() => handleCategoryChange(cat.name)}
                 className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                   selectedCategory === cat.name ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-50'
                 }`}
               >
                 {cat.name}
               </button>
              ))}
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-4">Precio Máximo</h3>
            <div className="space-y-4">
              <input 
                type="range" 
                min="0" 
                max={maxAvailablePrice} 
                step="500"
                value={priceRange} 
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-blue-600"
              />
              <div className="flex justify-between text-sm text-gray-600 font-medium">
                <span>{formatPrice(0)}</span>
                <span className="text-blue-600 font-bold bg-blue-50 px-2 py-1 rounded-md">{formatPrice(priceRange)}</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <p className="text-xl text-gray-500 mb-4">No se encontraron productos que coincidan con tu búsqueda.</p>
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('Todos');
                  setPriceRange(maxAvailablePrice);
                  searchParams.delete('categoria');
                  setSearchParams(searchParams);
                }}
                className="text-blue-600 font-semibold hover:underline"
              >
                Limpiar filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
