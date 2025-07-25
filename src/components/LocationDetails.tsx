import React from 'react';

interface LocationDetailsProps {
  location: any;
  onClose: () => void;
}

const LocationDetails: React.FC<LocationDetailsProps> = ({ location, onClose }) => {
  const getLocationIcon = (type: string) => {
    const iconMap: { [key: string]: string } = {
      'hotel': '🏨',
      'attraction': '🎨',
      'education': '🎓',
      'shopping': '🛍️',
      'theme_park': '🎢',
      'food': '🍽️',
      'activity': '🚣'
    };
    return iconMap[type] || '📍';
  };

  const getTypeLabel = (type: string) => {
    const labelMap: { [key: string]: string } = {
      'hotel': '住宿酒店',
      'attraction': '旅遊景點',
      'education': '教育機構',
      'shopping': '購物場所',
      'theme_park': '主題樂園',
      'food': '美食地點',
      'activity': '活動體驗'
    };
    return labelMap[type] || '地點';
  };

  // Get detailed information based on location
  const getDetailedInfo = (location: any) => {
    // This would be enhanced with the detailed information from the travel guide
    const defaultInfo = {
      openingHours: '請查詢官方網站',
      ticketPrice: '詳情請洽現場',
      highlights: [location.description || '精彩體驗等您探索'],
      tips: ['建議提前規劃', '注意營業時間'],
      website: '#'
    };

    // Add specific information for key locations
    const locationInfo: { [key: string]: any } = {
      'lone_pine_sanctuary': {
        openingHours: '每日 9:00 AM - 5:00 PM',
        ticketPrice: '成人 A$59, 兒童 A$42',
        highlights: [
          '世界最大無尾熊保護區',
          '近距離接觸無尾熊和袋鼠',
          '每日動物表演和講解',
          '野生吸蜜鸚鵡餵食 9:45 AM',
          '猛禽飛行表演 10:30 AM & 1:00 PM'
        ],
        tips: [
          '建議安排4-5小時參觀',
          '無尾熊互動需另付費預約',
          '可搭乘430或445號公車直達'
        ],
        website: 'https://lonepinekoalasanctuary.com/'
      },
      'south_bank': {
        openingHours: '公園: 每日 5:00 AM - 12:00 AM, 市集: 週五-日',
        ticketPrice: '免費入場',
        highlights: [
          '人造沙灘 Streets Beach',
          '布里斯本摩天輪',
          '文創假日市集',
          '昆士蘭文化中心'
        ],
        tips: [
          '週末市集最為熱鬧',
          '免費BBQ設施可使用',
          '推薦參觀2-3小時'
        ]
      },
      'warner_bros_movie_world': {
        openingHours: '每日 10:00 AM - 5:00 PM',
        ticketPrice: '單日票約 A$109',
        highlights: [
          'DC超級英雄主題',
          'DC Rivals HyperCoaster',
          '好萊塢特技駕駛表演',
          '明星大遊行'
        ],
        tips: [
          '線上購票更便宜',
          '考慮購買快速通關',
          '下載官方App查看等待時間'
        ],
        website: 'https://movieworld.com.au/'
      }
    };

    return locationInfo[location.id] || defaultInfo;
  };

  const detailedInfo = getDetailedInfo(location);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-blue-600 to-green-600 text-white p-6 rounded-t-xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-200 text-2xl font-bold"
          >
            ×
          </button>
          
          <div className="flex items-center space-x-3 mb-2">
            <span className="text-3xl">{getLocationIcon(location.type)}</span>
            <div>
              <h2 className="text-2xl font-bold">{location.name}</h2>
              <p className="text-blue-100">{location.english_name}</p>
            </div>
          </div>
          
          <div className="inline-block bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">
            {getTypeLabel(location.type)}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Basic Info */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
              <span className="mr-2">📍</span>
              基本資訊
            </h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <div className="flex">
                <span className="font-semibold text-gray-600 w-20">地址:</span>
                <span className="text-gray-800 flex-1">{location.address}</span>
              </div>
              <div className="flex">
                <span className="font-semibold text-gray-600 w-20">開放時間:</span>
                <span className="text-gray-800 flex-1">{detailedInfo.openingHours}</span>
              </div>
              <div className="flex">
                <span className="font-semibold text-gray-600 w-20">門票價格:</span>
                <span className="text-gray-800 flex-1">{detailedInfo.ticketPrice}</span>
              </div>
              {location.visit_dates && (
                <div className="flex">
                  <span className="font-semibold text-gray-600 w-20">參觀日期:</span>
                  <span className="text-gray-800 flex-1">{location.visit_dates.join(', ')}</span>
                </div>
              )}
              {location.dates && (
                <div className="flex">
                  <span className="font-semibold text-gray-600 w-20">住宿日期:</span>
                  <span className="text-gray-800 flex-1">{location.dates.join(', ')}</span>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          {location.description && (
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
                <span className="mr-2">📝</span>
                簡介
              </h3>
              <p className="text-gray-700 bg-blue-50 p-4 rounded-lg">{location.description}</p>
            </div>
          )}

          {/* Highlights */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
              <span className="mr-2">⭐</span>
              參觀重點
            </h3>
            <ul className="space-y-2">
              {detailedInfo.highlights.map((highlight: string, index: number) => (
                <li key={index} className="flex items-start text-gray-700">
                  <span className="text-yellow-500 mr-2 mt-1">•</span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tips */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
              <span className="mr-2">💡</span>
              實用提醒
            </h3>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
              <ul className="space-y-1">
                {detailedInfo.tips.map((tip: string, index: number) => (
                  <li key={index} className="text-gray-700 text-sm">
                    <span className="text-yellow-600 mr-2">▸</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Website */}
          {detailedInfo.website && detailedInfo.website !== '#' && (
            <div className="text-center">
              <a
                href={detailedInfo.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <span className="mr-2">🌐</span>
                訪問官方網站
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocationDetails;