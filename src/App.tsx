import React from 'react';
import { MapPin } from 'lucide-react';
import Map from './components/Map';
import Header from './components/Header';

const App: React.FC = () => {
  const defaultCenter = {
    lat: 40.7556,
    lng: 30.3783
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="h-[600px]">
            <Map center={defaultCenter} zoom={14} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;