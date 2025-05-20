# huggingface_model.py

from transformers import pipeline

class HuggingFaceModel:
    def __init__(self):
        # Hugging Face GPT-2 모델을 사용한 텍스트 생성 파이프라인 설정
        self.generator = pipeline("text-generation", model="gpt2")

    def generate_analysis(self, weather_info):
        # 명확한 프롬프트 제공: 농업 조언에 대한 텍스트를 정확히 요청
        prompt = (
            f"기온: {weather_info['temperature']}°C, 습도: {weather_info['humidity']}%, 날씨: {weather_info['description']}입니다. "
            "이 정보를 바탕으로 농업에 관한 조언을 제공해 주세요."
        )

        # 모델이 불필요한 내용 없이 정확한 농업 조언을 생성하도록 max_new_tokens로 설정
        result = self.generator(prompt, max_new_tokens=100, num_return_sequences=1, temperature=0.7)

        # 모델의 생성된 텍스트에서 불필요한 부분 제거
        generated_text = result[0]['generated_text']

        # 프롬프트 부분을 제거하고, 농업 조언만 남기도록 처리
        cleaned_text = generated_text.replace(prompt, "").strip()

        # 결과가 없을 경우 None을 반환하지 않도록 처리
        if cleaned_text:
            return cleaned_text
        else:
            return "모델이 유효한 농업 조언을 생성하지 못했습니다."  # 결과가 없을 경우 기본 메시지
