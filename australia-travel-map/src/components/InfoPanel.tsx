import React from 'react';

interface InfoPanelProps {
  routeData: any;
  onClose: () => void;
}

const InfoPanel: React.FC<InfoPanelProps> = ({ routeData, onClose }) => {
  if (!routeData) {
    return null;
  }

  const { travel_tips, emergency_contacts } = routeData;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-6 rounded-t-xl">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-bold mb-2">澳洲旅遊實用資訊</h2>
              <p className="text-green-100">出發前必讀的重要資訊</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 text-3xl font-bold"
            >
              ×
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Emergency Contacts */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-red-600 mb-4 flex items-center">
              <span className="mr-3">🚨</span>
              緊急聯絡方式
            </h3>
            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <div className="font-bold text-red-700 mb-2">🚑 緊急救援</div>
                    <div className="text-lg font-mono">{emergency_contacts.emergency}</div>
                    <div className="text-sm text-gray-600">警察、消防、救護車</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <div className="font-bold text-gray-700 mb-2">🏛️ 領事館</div>
                    <div className="text-sm">{emergency_contacts.consulate}</div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <div className="font-bold text-blue-700 mb-2">👥 團隊領隊</div>
                    <div className="text-sm">{emergency_contacts.tour_leader}</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <div className="font-bold text-green-700 mb-2">🇹🇼 台灣聯絡</div>
                    <div className="text-sm">{emergency_contacts.taiwan_contact}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Traffic Rules */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-blue-600 mb-4 flex items-center">
              <span className="mr-3">🚗</span>
              交通注意事項
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="font-bold text-blue-800 mb-3">🚙 駕駛規則</h4>
                <ul className="space-y-2">
                  {travel_tips.driving_rules.map((rule: string, index: number) => (
                    <li key={index} className="flex items-start text-sm">
                      <span className="text-blue-500 mr-2 mt-1">▶</span>
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-green-50 p-6 rounded-lg">
                <h4 className="font-bold text-green-800 mb-3">🅿️ 停車資訊</h4>
                <ul className="space-y-2">
                  {travel_tips.parking_notes.map((note: string, index: number) => (
                    <li key={index} className="flex items-start text-sm">
                      <span className="text-green-500 mr-2 mt-1">▶</span>
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Public Transport */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-purple-600 mb-4 flex items-center">
              <span className="mr-3">🚌</span>
              公共交通
            </h3>
            <div className="bg-purple-50 p-6 rounded-lg">
              <ul className="space-y-3">
                {travel_tips.public_transport.map((transport: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="text-purple-500 mr-3 mt-1">🎫</span>
                    <span className="text-gray-700">{transport}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Climate and Culture */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-yellow-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-yellow-700 mb-4 flex items-center">
                <span className="mr-3">🌤️</span>
                氣候與穿著
              </h3>
              <div className="space-y-3 text-sm text-gray-700">
                <div className="bg-white p-3 rounded">
                  <div className="font-semibold">冬季 (7-8月)</div>
                  <div>溫度：10-21°C，早晚涼爽</div>
                </div>
                <div className="bg-white p-3 rounded">
                  <div className="font-semibold">建議穿著</div>
                  <div>洋蔥式分層穿搭，攜帶外套</div>
                </div>
              </div>
            </div>

            <div className="bg-orange-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-orange-700 mb-4 flex items-center">
                <span className="mr-3">💰</span>
                貨幣與支付
              </h3>
              <div className="space-y-3 text-sm text-gray-700">
                <div className="bg-white p-3 rounded">
                  <div className="font-semibold">貨幣</div>
                  <div>澳元 (AUD)</div>
                </div>
                <div className="bg-white p-3 rounded">
                  <div className="font-semibold">支付方式</div>
                  <div>信用卡普及，少量現金備用</div>
                </div>
                <div className="bg-white p-3 rounded">
                  <div className="font-semibold">小費</div>
                  <div>無強制小費文化</div>
                </div>
              </div>
            </div>
          </div>

          {/* Food Recommendations */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-green-600 mb-4 flex items-center">
              <span className="mr-3">🍽️</span>
              澳洲必試美食
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { name: '肉派 (Meat Pie)', desc: '澳洲國民美食，搭配番茄醬' },
                { name: '炸魚薯條', desc: '經典澳式快餐，海邊享用最佳' },
                { name: '摩頓灣小龍蝦', desc: '昆士蘭特產，肉質鮮甜' },
                { name: '帕芙洛娃蛋糕', desc: '蛋白霜甜點，配鮮奶油水果' },
                { name: '萊明頓蛋糕', desc: '巧克力椰絲海綿蛋糕' },
                { name: '澳式早午餐', desc: '酪梨吐司配水波蛋' }
              ].map((food, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow border-l-4 border-green-400">
                  <div className="font-semibold text-gray-800">{food.name}</div>
                  <div className="text-sm text-gray-600 mt-1">{food.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Cultural Tips */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-2xl font-bold text-gray-700 mb-4 flex items-center">
              <span className="mr-3">🤝</span>
              文化禮儀提醒
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
              <div className="space-y-2">
                <div className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">✓</span>
                  <span>澳洲人友好直接，保持微笑眼神接觸</span>
                </div>
                <div className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">✓</span>
                  <span>公共場合排隊是基本禮儀</span>
                </div>
                <div className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">✓</span>
                  <span>討論原住民議題時保持尊重</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-start">
                  <span className="text-red-500 mr-2 mt-1">✗</span>
                  <span>嚴禁攜帶未申報食物入境</span>
                </div>
                <div className="flex items-start">
                  <span className="text-red-500 mr-2 mt-1">✗</span>
                  <span>室內公共場所嚴禁吸菸</span>
                </div>
                <div className="flex items-start">
                  <span className="text-red-500 mr-2 mt-1">✗</span>
                  <span>避免在公共場合大聲喧嘩</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoPanel;