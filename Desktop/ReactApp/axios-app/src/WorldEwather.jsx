//WorldWeather.jsx

import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  Zap,
  Droplets,
  Wind,
  Thermometer,
  Eye,
} from "lucide-react";

export default function WorldEwather() {
  const [weatherdata, setWeatherdata] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  //기초 데이터 생성
  const cities = [
    { nameKr: "서울", name: "Seoul", lat: 37.5665, lon: 126.978, country: "KR" },
    { nameKr: "도쿄", name: "Tokyo", lat: 35.6762, lon: 139.6503, country: "JP" },
    { nameKr: "뉴욕", name: "New York", lat: 40.7128, lon: -74.006, country: "US" },
    { nameKr: "런던", name: "London", lat: 51.5074, lon: -0.1278, country: "GB" },
    { nameKr: "파리", name: "Paris", lat: 48.8566, lon: 2.3522, country: "FR" },
    { nameKr: "시드니", name: "Sydney", lat: -33.8688, lon: 151.2093, country: "AU" },
  ];
  const API_KEY = "4be5d5a5379852a4f269284657432443";

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setLoading(true);
        const promises = cities.map((city) => {
          return axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
            params: {
              lat: city.lat,
              lon: city.lon,
              appid: API_KEY,
              units: "metric",
              lang: "kr",
            },
          });
        });
        //모든 요청이 완료될 때까지 대기
        const results = await Promise.all(promises);
        //결과에서 데이터 추출하고 한글 이름 추가
        const weatherData = results.map((res, index) => ({
          ...res.data,
          nameKr: cities[index].nameKr,
        }));
        setWeatherdata(weatherData);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching weather data:", error.message);
        setError(error);
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  //날씨 아이콘 설정
  const getWeatherIcon = (weatherMain) => {
    if (!weatherMain) return <Cloud className="w-12 h-12 text-grey-400" />;

    switch (weatherMain.toLowerCase()) {
      case "clear":
        return <Sun className="w-12 h-12 text-yellow-400" />;
      case "clouds":
        return <Cloud className="w-12 h-12 text-grey-400" />;
      case "rain":
        return <CloudRain className="w-12 h-12 text-blue-400" />;
      case "snow":
        return <CloudSnow className="w-12 h-12 text-blue-200" />;
      case "thunderstorm":
        return <Zap className="w-12 h-12 text-yellow-600" />;
      default:
        return <Cloud className="w-12 h-12 text-grey-400" />;
    }
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-purple-600 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-2">
          🌍 세계 주요 도시 날씨
        </h1>

        {error && (
          <div className="bg-yellow-500 bg-opacity-80 text-white px-4 py-2 rounded-lg text-center mb-6">
            ⚠️ {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {weatherdata.map((weather, index) => (
            <div
              key={index}
              className="bg-indigo-300 bg-opacity-20 backdrop-blur-lg rounded-2xl p-6 text-white shadow-xl hover:scale-105 transition-transform cursor-pointer"
              onClick={() => setSelectedCity(weather)}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold">
                    {weather.nameKr}
                  </h2>
                  <p className="text-sm opacity-80">{weather.sys.country}</p>
                </div>
                {getWeatherIcon(weather.weather?.[0]?.main)}
              </div>

              <div className="text-5xl font-bold mb-2">
                {Math.round(weather.main?.temp || 0)}°C
              </div>

              <div className="text-lg mb-4 opacity-90">
                {weather.weather?.[0]?.description || "날씨 정보 없음"}
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <Droplets className="w-4 h-4" />
                  <span>습도: {weather.main?.humidity || 0}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <Wind className="w-4 h-4" />
                  <span>풍속: {weather.wind?.speed || 0}m/s</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedCity && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedCity(null)}
          >
            <div
              className="bg-white rounded-2xl p-8 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-gray-800">
                  {selectedCity.nameKr}
                </h2>
                {getWeatherIcon(selectedCity.weather?.[0]?.main)}
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b">
                  <span className="text-black flex items-center gap-2">
                    <Thermometer className="w-5 h-5" /> 현재 온도
                  </span>
                  <span className="text-2xl font-bold text-blue-600">
                    {Math.round(selectedCity.main?.temp || 0)}°C
                  </span>
                </div>

                <div className="flex justify-between items-center py-3 border-b">
                  <span className="text-black">체감 온도</span>
                  <span className="text-xl font-semibold text-black">
                    {Math.round(selectedCity.main?.feels_like || 0)}°C
                  </span>
                </div>

                <div className="flex justify-between items-center py-3 border-b">
                  <span className="text-black flex items-center gap-2">
                    <Droplets className="w-5 h-5" /> 습도
                  </span>
                  <span className="text-xl font-semibold text-black">
                    {selectedCity.main?.humidity || 0}%
                  </span>
                </div>

                <div className="flex justify-between items-center py-3 border-b">
                  <span className="text-black flex items-center gap-2">
                    <Wind className="w-5 h-5" /> 풍속
                  </span>
                  <span className="text-xl font-semibold text-black">
                    {selectedCity.wind?.speed || 0} m/s
                  </span>
                </div>

                <div className="flex justify-between items-center py-3 border-b">
                  <span className="text-black flex items-center gap-2">
                    <Eye className="w-5 h-5" /> 가시거리
                  </span>
                  <span className="text-xl font-semibold text-black">
                    {((selectedCity.visibility || 0) / 1000).toFixed(1)} km
                  </span>
                </div>

                <div className="flex justify-between items-center py-3 border-b">
                  <span className="text-black">기압</span>
                  <span className="text-xl font-semibold text-black">
                    {selectedCity.main?.pressure || 0} hPa
                  </span>
                </div>

                <div className="flex justify-between items-center py-3">
                  <span className="text-black">날씨</span>
                  <span className="text-xl font-semibold text-black">
                    {selectedCity.weather?.[0]?.description || "정보 없음"}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setSelectedCity(null)}
                className="mt-6 w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
              >
                닫기
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
