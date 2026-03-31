import { Link } from 'react-router-dom';
import productsData from '../data/products.json';
import categoriesData from '../data/categories.json';
import storeData from '../data/store.json';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const featuredProducts = productsData.filter(p => p.isFeatured).slice(0, 4);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=2000&auto=format&fit=crop" 
            alt="Hero background" 
            className="w-full h-full object-cover opacity-30" 
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
            Equipa tu hogar con lo <span className="text-blue-500">mejor</span>
          </h1>
          <p className="mt-4 text-xl max-w-2xl text-gray-300 mb-10">
            Descubre nuestra amplia gama de electrodomésticos modernos. Calidad garantizada, asesoría experta y los mejores precios del mercado.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              to="/productos" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg font-semibold transition-all shadow-lg hover:shadow-blue-500/30"
            >
              Ver Catálogo
            </Link>
            <a 
              href={`https://wa.me/${storeData.whatsapp}?text=${encodeURIComponent("Hola, me gustaría recibir más información sobre sus ofertas actuales.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white px-8 py-3 rounded-full text-lg font-semibold transition-all"
            >
              Contáctanos
            </a>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl shadow-sm inline-block px-4 py-2 bg-white rounded-xl border border-gray-100">
              Categorías Principales
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categoriesData.map((cat) => (
              <Link key={cat.id} to={`/productos?categoria=${cat.name}`} className="group space-y-3">
                <div className="relative aspect-square overflow-hidden rounded-2xl bg-white shadow-sm border border-gray-100 group-hover:shadow-md transition-all duration-300">
                  <img src={cat.image} alt={cat.name} className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300"></div>
                </div>
                <h3 className="text-center font-medium text-gray-800 group-hover:text-blue-600 transition-colors">
                  {cat.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products List */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Nuestras Recomendaciones
              </h2>
              <p className="mt-2 text-lg text-gray-500">
                Los productos más vendidos este mes.
              </p>
            </div>
            <Link to="/productos" className="hidden sm:block text-blue-600 hover:text-blue-800 font-medium">
              Ver todos →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-8 sm:hidden text-center">
            <Link to="/productos" className="text-blue-600 hover:text-blue-800 font-medium text-lg">
              Ver todos los productos →
            </Link>
          </div>
        </div>
      </section>
      
      {/* Intro about the store */}
      <section className="py-20 bg-blue-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 tracking-tight">Sobre {storeData.name}</h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Con más de 15 años de experiencia en el mercado, nos especializamos en brindar las mejores soluciones en electrodomésticos para el hogar dominicano. 
              Nuestro compromiso es tu comodidad, por eso ofrecemos garantía, servicio de instalación y soporte constante.
            </p>
            <Link to="/contacto" className="inline-block border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-full font-semibold transition-colors duration-300">
              Conócenos Más
            </Link>
        </div>
      </section>
    </div>
  );
}
