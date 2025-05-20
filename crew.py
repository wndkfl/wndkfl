from crewai import Crew, Task
from agents import weather_agent, crop_advisor_agent

def run_weather_crop_crew(city_name, crop_name, weather_summary):
    # ✅ 날씨 요약 Task
    weather_task = Task(
        description=(
            f"{city_name}의 현재 날씨 정보는 다음과 같습니다:\n"
            f"{weather_summary}\n\n"
            "이 정보를 바탕으로 **다른 에이전트에게 질문하지 말고**, "
            "당신이 직접 **100자 내외의 자연스러운 한국어 문장**으로 요약해 주세요."
        ),
        agent=weather_agent,
        expected_output="100자 내외로 요약된 한국어 문장"
    )

    # ✅ 작물 조언 Task
    advisory_task = Task(
        description=(
            f"{city_name}의 날씨는 {weather_summary}입니다.\n"
            f"이 기상 조건에서 '{crop_name}' 작물을 재배할 때 주의사항이나 권장사항을 "
            "**다른 에이전트에게 질문하지 말고**, "
            "**친절한 한국어로 직접 설명해 주세요.**"
        ),
        agent=crop_advisor_agent,
        expected_output="200자 이내의 작물 재배 조언 (한국어)"
    )

    crew = Crew(
        agents=[weather_agent, crop_advisor_agent],
        tasks=[weather_task, advisory_task],
        verbose=True
    )

    return crew.kickoff()
