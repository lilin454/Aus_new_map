import React from 'react';

interface TimelineProps {
  itineraryData: any;
  selectedDay: number;
  onDaySelect: (day: number) => void;
}

const Timeline: React.FC<TimelineProps> = ({ itineraryData, selectedDay, onDaySelect }) => {
  if (!itineraryData) {
    return (
      <div className="p-6 text-center">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-300 rounded mb-2"></div>
          <div className="h-4 bg-gray-300 rounded mb-2"></div>
          <div className="h-4 bg-gray-300 rounded"></div>
        </div>
      </div>
    );
  }

  const getDayIcon = (day: any) => {
    if (day.city.includes('台灣')) return '✈️';
    if (day.title.includes('TAFE') || day.title.includes('昆士蘭大學')) return '🎓';
    if (day.title.includes('華納兄弟')) return '🎢';
    if (day.title.includes('探索') || day.title.includes('文化')) return '🎨';
    if (day.title.includes('VR') || day.title.includes('STEM')) return '💻';
    if (day.title.includes('Riverlife')) return '🚣';
    return '📍';
  };

  const getCityColor = (city: string) => {
    if (city.includes('布里斯本')) return 'from-blue-500 to-blue-600';
    if (city.includes('黃金海岸')) return 'from-yellow-500 to-orange-500';
    if (city.includes('台灣')) return 'from-green-500 to-green-600';
    return 'from-gray-500 to-gray-600';
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white p-6">
        <h2 className="text-2xl font-bold mb-2">16天行程時間軸</h2>
        <p className="text-blue-100">點擊任一天查看該日地點</p>
      </div>

      {/* Timeline Content */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-3">
          {itineraryData.daily_itinerary.map((day: any) => (
            <div
              key={day.day}
              onClick={() => onDaySelect(day.day)}
              className={`relative cursor-pointer transition-all duration-300 rounded-lg p-4 border-2 ${
                selectedDay === day.day
                  ? 'border-blue-500 bg-blue-50 shadow-lg scale-105'
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
              }`}
            >
              {/* Day Number Badge */}
              <div
                className={`absolute -left-2 -top-2 w-8 h-8 rounded-full bg-gradient-to-r ${
                  getCityColor(day.city)
                } text-white text-sm font-bold flex items-center justify-center shadow-lg`}
              >
                {day.day}
              </div>

              {/* Day Content */}
              <div className="ml-4">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-xl">{getDayIcon(day)}</span>
                  <span className="text-sm font-semibold text-gray-600">{day.date}</span>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600">
                    {day.city}
                  </span>
                </div>

                <h3 className="font-bold text-gray-800 mb-2 text-lg leading-tight">
                  {day.title}
                </h3>

                <div className="space-y-1">
                  {day.activities.map((activity: string, index: number) => (
                    <div key={index} className="text-sm text-gray-600 flex items-start">
                      <span className="text-blue-500 mr-2 mt-1">•</span>
                      <span className="flex-1">{activity}</span>
                    </div>
                  ))}
                </div>

                {/* Hotel Info */}
                {day.hotel && (
                  <div className="mt-3 pt-2 border-t border-gray-100">
                    <div className="flex items-center text-sm text-gray-500">
                      <span className="mr-1">🏨</span>
                      <span>
                        {itineraryData.hotels.find((h: any) => h.id === day.hotel)?.name || '住宿酒店'}
                      </span>
                    </div>
                  </div>
                )}

                {/* Location Count */}
                {day.locations && day.locations.length > 0 && (
                  <div className="mt-2">
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      {day.locations.length} 個地點
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary Footer */}
      <div className="bg-gray-50 p-4 border-t">
        <div className="grid grid-cols-2 gap-4 text-center text-sm">
          <div>
            <div className="font-bold text-gray-800">總天數</div>
            <div className="text-blue-600 font-semibold">16天</div>
          </div>
          <div>
            <div className="font-bold text-gray-800">主要城市</div>
            <div className="text-green-600 font-semibold">2個</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;