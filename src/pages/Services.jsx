import servicesData from '../data/services.json';
import ServiceCard from '../components/ServiceCard';
import storeData from '../data/store.json';

export default function Services() {
  const genericWaMessage = "Hola, necesito información sobre sus servicios de reparación y mantenimiento.";
  const wpLink = `https://wa.me/${storeData.whatsapp}?text=${encodeURIComponent(genericWaMessage)}`;

  return (
    <div className="flex flex-col">
      {/* Header Banner */}
      <section className="bg-gradient-to-br from-gray-900 to-blue-900 py-20 text-center text-white">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">Servicios de Reparación</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Mantenimiento preventivo, diagnóstico y reparación de electrodomésticos con los mejores técnicos del país.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gray-50 flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {servicesData.map(service => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>

          {/* Call to action */}
          <div className="bg-white rounded-3xl p-10 mt-10 text-center border border-gray-100 shadow-sm max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">¿Tienes una emergencia con tu equipo?</h2>
            <p className="text-gray-600 mb-8 max-w-xl mx-auto">
              Contáctanos inmediatamente por WhatsApp. Nuestro equipo responderá rápidamente para agendar la visita de un técnico a tu domicilio.
            </p>
            <a 
              href={wpLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1DA851] text-white py-3 px-8 rounded-full font-bold text-lg transition-colors shadow-lg"
            >
              Agendar Visita por WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
