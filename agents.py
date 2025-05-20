from crewai import Agent
from langchain_groq import ChatGroq
import os
from dotenv import load_dotenv

load_dotenv()

llm = ChatGroq(
    model="llama3-8b-8192",
    api_key=os.getenv("GROQ_API_KEY")
)

weather_agent = Agent(
    role="날씨 요약 전문가",
    goal="실시간 날씨 데이터를 분석하여 요약합니다.",
    backstory="기상청에서 10년 근무한 AI 기상 전문가입니다.",
    verbose=True,
    llm=llm,
    allow_delegation=False  # ✅ 에이전트 위임 금지
)

crop_advisor_agent = Agent(
    role="작물 조언 전문가",
    goal="현재 기후 조건에서 적합한 작물 재배 조언을 제공합니다.",
    backstory="농촌진흥청 작물 연구팀에서 15년간 활동한 농업 컨설턴트입니다.",
    verbose=True,
    llm=llm,
    allow_delegation=False  # ✅ 위임 금지
)
