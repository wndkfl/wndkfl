# 환경 설정 및 데이터 준비
install.packages('Ecdat') # Ecdat 패키지 설치
library(Ecdat)            # Ecdat 패키지 로드
str(Hdma)                 # Hdma 데이터셋의 구조 확인

# 대출 승인/거절 비율 시각화
tbl <- table(Hdma$deny) # 'deny' 변수의 빈도수 테이블 생성 (0:승인, 1:거절)
tbl <- tbl / sum(tbl)   # 전체 합계로 나누어 비율로 변환
tbl                     # 비율 테이블 출력
names(tbl) <- c('승인','거절') # 테이블 이름을 한글로 변경
barplot(tbl, main='주택담보대출 승인/거절',
        col=c('green','yellow'), 
        ylim=c(0,1),             # y축 범위(0부터 1까지) 지정
        ylab='비율')             # y축 레이블 지정

# 주택가격 대비 대출금 비율(lvr) 분포 시각화
hist(Hdma$lvr, main='주택가격대비 대출금 비율', # 'lvr' 변수로 히스토그램 생성
     col=rainbow(10))                          

# 인종별(흑인 vs 비흑인) 대출 거절률 비교 분석
black.yn <- table(Hdma$black) # 'black' 변수 빈도수 테이블 생성 (yes/no)

# 흑인 신청자 중 거절 비율 계산 (흑인 & 거절)의 수 / (흑인)의 총 수
black.deney <- sum(Hdma$black=='yes' & Hdma$deny=='yes') /
  black.yn['yes']

# 비흑인 신청자 중 거절 비율 계산 (비흑인 & 거절)의 수 / (비흑인)의 총 수
non.black.deney <- sum(Hdma$black=='no' & Hdma$deny=='yes') /
  black.yn['no']

# 계산된 거절률 출력
cat('흑인, 비흑인 거절률 : ', black.deney, non.black.deney, '\n')

#  인종별 신용등급 평균 비교 분석
# 흑인 신청자의 신용등급 평균 계산
black.credit <- mean(Hdma$ccs[Hdma$black=='yes']) 
# 비흑인 신청자의 신용등급 평균 계산
non.black.credit <- mean(Hdma$ccs[Hdma$black=='no'])

# 계산된 신용등급 평균 출력
cat('흑인, 비흑인 신용등급 : ', black.credit, non.black.credit, '\n')

#  다변량 데이터 시각화 및 상관관계 분석
# 분석에 사용할 변수들 선택 (부채/소득 비율, 주택/소득 비율, 신용등급 점수, 신용등급 불량 여부)
df <- Hdma[,c('dir','hir','ccs','mcs')] 

point.col <- c('green','red') 
# 데이터프레임의 산점도 행렬 생성: 각 변수 쌍 사이의 관계를 시각화 (deny에 따라 색상 구분)
plot(df, col= point.col[Hdma$deny]) 

# 선택된 변수들 간의 상관관계 행렬 계산 및 출력
cor(df)