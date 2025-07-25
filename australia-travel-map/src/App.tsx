import React from 'react';
import InteractiveMap from './components/InteractiveMap';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <div className="relative">
        {/* Header */}
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-green-600 to-yellow-500 text-white">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="relative container mx-auto px-4 py-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                澳洲16天數位城市之旅
              </h1>
              <p className="text-xl md:text-2xl mb-6">
                布里斯本 ↔ 黃金海岸 互動式行程地圖
              </p>
              <div className="flex justify-center items-center space-x-4 text-lg">
                <span>🗓️ 2025.07.26 - 2025.08.10</span>
                <span>•</span>
                <span>🏫 TAFE數位媒體學習</span>
                <span>•</span>
                <span>🎢 主題樂園體驗</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <InteractiveMap />
      </div>
    </div>
  );
}

export default App;