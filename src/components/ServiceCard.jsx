import { Fan, Snowflake, Droplet, Wrench } from 'lucide-react';

const icons = {
  Fan: Fan,
  Snowflake: Snowflake,
  Droplet: Droplet,
  Wrench: Wrench
};

export default function ServiceCard({ service }) {
  const IconComponent = icons[service.icon] || Wrench;

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all border border-gray-100 group">
      <div className="h-14 w-14 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
        <IconComponent className="h-7 w-7" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
      <p className="text-gray-600 mb-6 leading-relaxed">
        {service.description}
      </p>
      <div className="inline-flex items-center px-4 py-2 rounded-full bg-gray-50 text-gray-700 text-sm font-medium border border-gray-200">
        Estimado: {service.priceRange}
      </div>
    </div>
  );
}
