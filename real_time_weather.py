import requests

class RealTimeWeather:
    def __init__(self, api_key):
        self.api_key = api_key
        self.base_url = "http://api.openweathermap.org/data/2.5/weather"
    
    def get_weather_data(self, city_name):
        params = {
            "q": city_name,
            "appid": self.api_key,
            "units": "metric"  # 섭씨 온도로 받기
        }
        response = requests.get(self.base_url, params=params)
        if response.status_code == 200:
            return response.json()  # 실시간 날씨 데이터를 JSON 형식으로 반환
        else:
            return None
    
    def load_weather_data(self, city_name):
        weather_data = self.get_weather_data(city_name)
        if weather_data:
            # 필요한 날씨 정보 추출
            temp = weather_data['main']['temp']
            humidity = weather_data['main']['humidity']
            description = weather_data['weather'][0]['description']
            rain = weather_data.get('rain', {}).get('1h', 0.0)
            return temp, humidity, description, rain
        else:
            return None, None, None, None