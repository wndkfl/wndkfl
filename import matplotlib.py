import pandas as pd
import matplotlib.pyplot as plt
import matplotlib.font_manager as fm

# CSV 파일로부터 데이터 불러오기
crime_data = pd.read_csv('/Users/juari/Documents/  ㄴㅇ/서브플롯/5대+범죄+발생현황_20231214143854.csv', thousands=',', encoding='utf-8')

# '자치구별(1)', '자치구별(2)' 행 제거
crime_data = crime_data[~crime_data['자치구별(1)'].isin(['자치구별(1)', '자치구별(2)'])]

# '자치구별(2)' 열이 '소계'인 데이터 제거
crime_data = crime_data[crime_data['자치구별(2)'] != '소계']

# '자치구별(1)', '자치구별(2)', '2022', '2022.1' 열만 선택
crime_by_type = crime_data[['자치구별(1)', '자치구별(2)', '2022', '2022.1']]

# '발생', '검거' 열의 데이터 타입을 숫자로 변환
crime_by_type['2022'] = pd.to_numeric(crime_by_type['2022'], errors='coerce').fillna(0)
crime_by_type['2022.1'] = pd.to_numeric(crime_by_type['2022.1'], errors='coerce').fillna(0)

# 열 이름 변경
crime_by_type.columns = ['자치구', '범죄유형', '발생', '검거']

# '범죄유형', '발생', '검거' 열을 기준으로 피벗 테이블 생성
crime_pivot = crime_by_type.pivot_table(index='범죄유형', aggfunc='sum')

# D2Coding 폰트 설정
font_path = '/System/Library/Fonts/Supplemental/Arial Unicode.ttf'  # D2Coding 폰트 파일의 실제 위치로 바꿔주세요.
font_name = fm.FontProperties(fname=font_path, size=10).get_name()
plt.rc('font', family=font_name)

# 데이터 시각화
crime_pivot.plot(kind='bar', stacked=True, figsize=(10,7))

plt.title('서울시 범죄 유형별 발생 및 검거 현황')
plt.xlabel('자치구')
plt.ylabel('건수')

plt.xticks(rotation=45)
plt.tight_layout()  # 그래프의 레이아웃을 조정합니다.
plt.show()

