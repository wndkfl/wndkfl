class CropAdvisory:
    def __init__(self):
        self.crop_guidelines = {
            "tomato": {
                "high_temp": "고온 (30도 이상)에서는 토마토가 고사할 수 있습니다. 그늘에서 키우거나 물을 충분히 줘야 합니다.🥵",
                "high_rain": "과도한 비 (50mm 이상)는 병충해의 위험을 증가시킵니다. 배수 처리가 필요합니다.",
                "low_temp": "저온 (10도 이하)에서는 토마토의 성장이 멈추거나, 열매가 제대로 자라지 않을 수 있습니다. 온도 조절이 필요합니다.🥶",
                "low_rain": "강수량이 부족하면 토마토가 건조해질 수 있습니다. 물을 자주 주고, 토양의 수분 상태를 체크해야 합니다."
            },
            "lettuce": {
                "high_temp": "고온에서는 상추가 시들 수 있습니다. 그늘에서 기르는 것이 좋습니다🥵.",
                "low_rain": "상추는 수분을 많이 필요로 하므로 강수량이 부족한 경우, 추가 급수가 필요합니다.",
                "low_temp": "상추는 차가운 날씨에 잘 자라지 않습니다. 온도를 높여주는 방법을 고려해야 합니다.🥶",
                "dry_conditions": "건조한 날씨에서는 상추가 시들 수 있습니다. 물을 자주 주고, 배수성 좋은 토양을 사용하는 것이 중요합니다."
            }
        }

    def get_crop_advisory(self, crop_name, temp, rain):
        advisory = ""
        
        if crop_name in self.crop_guidelines:
            # 고온에 대한 유의사항
            if temp > 30:
                advisory += self.crop_guidelines[crop_name].get("high_temp", "고온에 대한 유의사항이 없습니다.") + "\n"
            # 저온에 대한 유의사항
            if temp < 10:
                advisory += self.crop_guidelines[crop_name].get("low_temp", "저온에 대한 유의사항이 없습니다.") + "\n"
            # 강수량이 많은 경우
            if rain > 50:
                advisory += self.crop_guidelines[crop_name].get("high_rain", "과도한 비에 대한 유의사항이 없습니다.") + "\n"
            # 강수량이 부족한 경우
            if rain < 10:
                advisory += self.crop_guidelines[crop_name].get("low_rain", "강수량 부족에 대한 유의사항이 없습니다.") + "\n"
            # 건조한 날씨에 대한 유의사항
            if rain < 5:  # 강수량이 5mm 이하일 경우 건조한 상태로 간주
                advisory += self.crop_guidelines[crop_name].get("dry_conditions", "건조한 날씨에 대한 유의사항이 없습니다.") + "\n"
                
        return advisory if advisory else "이 작물에 대한 유의사항이 없습니다."