import streamlit as st
from real_time_weather import RealTimeWeather
from crew import run_weather_crop_crew
from dotenv import load_dotenv
import os

load_dotenv()
weather = RealTimeWeather(os.getenv("OPENWEATHER_API_KEY"))

st.title("🌾 작물 재배 조언 에이전트 (GPT 기반)")

city = st.text_input("도시를 입력하세요")
crop = st.selectbox("작물을 선택하세요", ["tomato", "lettuce", "peppers"])

if city:
    temp, humidity, desc, rain = weather.load_weather_data(city)
    summary = f"{city}의 기온은 {temp}°C, 습도는 {humidity}%, 날씨는 {desc}, 강수량은 {rain}mm입니다."
    result = run_weather_crop_crew(city, crop, summary)
    st.markdown(f"### 결과\n\n{result}")
