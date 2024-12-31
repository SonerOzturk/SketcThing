import React from 'react';
import { MapPin } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center">
        <MapPin className="h-8 w-8 text-red-500 mr-2" />
        <h1 className="text-2xl font-bold text-gray-900">Restoran Bulucu</h1>
      </div>
    </header>
  );
};

export default Header;