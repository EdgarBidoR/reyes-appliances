import { Phone, Mail, MapPin } from 'lucide-react';
import storeData from '../data/store.json';

// Inline SVG brand icons (lucide-react removed social brand icons in v0.4+)
function FacebookIcon({ className }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function TiktokIcon({ className }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.12-3.44-3.17-3.61-5.46-.17-2.31.81-4.66 2.65-6.04 1.44-1.07 3.23-1.47 4.96-1.18v4.06c-1.24-.26-2.58.12-3.37 1.13-.71.86-.88 2.05-.44 3.07.41.97 1.34 1.63 2.4 1.77 1.05.15 2.15-.19 2.85-.94.75-.82 1.1-1.95 1.07-3.05v-16.3z"/>
    </svg>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="space-y-4">
            <h3 className="text-2xl font-bold tracking-tight">{storeData.name}</h3>
            <p className="text-gray-400 max-w-xs">
              Tu tienda de confianza para electrodomésticos modernos, duraderos y al mejor precio del mercado.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href={storeData.socials.facebook} className="text-gray-400 hover:text-blue-500 transition-colors" target="_blank" rel="noopener noreferrer">
                <FacebookIcon className="h-5 w-5" />
              </a>
              <a href={storeData.socials.instagram} className="text-gray-400 hover:text-pink-500 transition-colors" target="_blank" rel="noopener noreferrer">
                <InstagramIcon className="h-5 w-5" />
              </a>
              <a href={storeData.socials.tiktok} className="text-gray-400 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
                <TiktokIcon className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contacto</h4>
            <div className="space-y-3 text-gray-400">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-gray-500" />
                <span>{storeData.displayPhone}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-gray-500" />
                <span>{storeData.email}</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-gray-500 shrink-0 mt-1" />
                <span>{storeData.address}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Horario</h4>
            <div className="space-y-2 text-gray-400">
              <p>Lunes - Viernes: 8:00 AM - 6:00 PM</p>
              <p>Sábados: 9:00 AM - 2:00 PM</p>
              <p>Domingos: Cerrado</p>
            </div>
          </div>
          
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {currentYear} {storeData.name}. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
