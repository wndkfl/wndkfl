# app.py

import streamlit as st
from real_time_weather import RealTimeWeather
from crop_advisory import CropAdvisory
from huggingface_model import HuggingFaceModel

# API 키 입력
OPENWEATHER_API_KEY = "8295d56ac0bf7b3a965caf08ff754ad2"

weather_agent = RealTimeWeather(OPENWEATHER_API_KEY)
crop_advisor = CropAdvisory()
huggingface_model = HuggingFaceModel()

def display_weather_and_advisory():
    st.title("🌦️실시간 날씨 분석 및 작물 유의사항 AI agent")

    city_name = st.text_input("도시 이름을 입력하세요:")
    crop_name = st.selectbox("작물을 선택하세요:🍅🥬", ["tomato", "lettuce"])

    if city_name:
        # 날씨 정보 가져오기
        temp, humidity, description = weather_agent.load_weather_data(city_name)
        if temp is not None:
            st.write(f"현재 {city_name}의 기온은 {temp}°C, 습도는 {humidity}%, 날씨는 {description}입니다.")
            # 작물별 유의사항
            advisory = crop_advisor.get_crop_advisory(crop_name, temp, humidity)
            st.write(f"{crop_name.capitalize()}에 대한 유의사항: {advisory}")
            
            # Hugging Face 모델을 사용하여 추가 분석 요청
            weather_info = {'temperature': temp, 'humidity': humidity, 'description': description}
            analysis = huggingface_model.generate_analysis(weather_info)
            st.write(f"Hugging Face 분석: {analysis}")
        else:
            st.write("날씨 정보를 불러올 수 없습니다. 도시 이름을 확인하세요.")

def main():
    display_weather_and_advisory()

if __name__ == "__main__":
    main()
