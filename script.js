// 간단한 차트 그리기 함수
function drawChart() {
    const canvas = document.getElementById('viewsChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width = canvas.offsetWidth;
    const height = canvas.height = 200;
    
    // 데이터 포인트
    const data = [1000, 1800, 1600, 2400, 2800, 3200, 2900];
    const labels = ['11/01', '11/02', '11/03', '11/04', '11/05', '11/06', '11/07'];
    const max = Math.max(...data);
    
    // 배경
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, width, height);
    
    // 그리드 라인
    ctx.strokeStyle = '#E0E0E0';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
        const y = (height - 40) * (i / 4) + 20;
        ctx.beginPath();
        ctx.moveTo(40, y);
        ctx.lineTo(width - 20, y);
        ctx.stroke();
    }
    
    // 선 그리기
    ctx.strokeStyle = '#00C875';
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    data.forEach((value, index) => {
        const x = 40 + (width - 60) * (index / (data.length - 1));
        const y = height - 40 - ((value / max) * (height - 60));
        
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    
    ctx.stroke();
    
    // 포인트 그리기
    data.forEach((value, index) => {
        const x = 40 + (width - 60) * (index / (data.length - 1));
        const y = height - 40 - ((value / max) * (height - 60));
        
        ctx.fillStyle = '#00C875';
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fill();
        
        // 포인트 주변 하이라이트
        ctx.fillStyle = 'rgba(0, 200, 117, 0.2)';
        ctx.beginPath();
        ctx.arc(x, y, 8, 0, Math.PI * 2);
        ctx.fill();
    });
    
    // X축 라벨
    ctx.fillStyle = '#666666';
    ctx.font = '12px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.textAlign = 'center';
    labels.forEach((label, index) => {
        const x = 40 + (width - 60) * (index / (data.length - 1));
        ctx.fillText(label, x, height - 10);
    });
    
    // Y축 라벨
    ctx.textAlign = 'right';
    for (let i = 0; i <= 4; i++) {
        const value = Math.round((max / 4) * (4 - i));
        const y = (height - 40) * (i / 4) + 25;
        ctx.fillText(value.toString(), 35, y);
    }
}

// 스무스 스크롤
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 검색 기능
const searchInput = document.querySelector('.search-input');
const searchBtn = document.querySelector('.search-btn');

if (searchBtn) {
    searchBtn.addEventListener('click', () => {
        const query = searchInput.value.trim();
        if (query) {
            console.log('검색어:', query);
            // 실제 검색 로직 구현
            alert(`"${query}" 검색 결과를 표시합니다.`);
        }
    });
}

if (searchInput) {
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchBtn.click();
        }
    });
}

// 탭 전환 기능
function setupTabs() {
    const tabContainers = document.querySelectorAll('.filter-tabs, .dashboard-tabs');
    
    tabContainers.forEach(container => {
        const tabs = container.querySelectorAll('.tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
            });
        });
    });
}

// 비디오 재생 버튼
function setupVideoPlayers() {
    const playButtons = document.querySelectorAll('.play-button');
    
    playButtons.forEach(button => {
        button.addEventListener('click', () => {
            alert('비디오 재생 기능은 실제 비디오 파일이 필요합니다.');
            // 실제 구현에서는 비디오 플레이어 모달을 열거나 비디오를 재생합니다
        });
    });
}

// 좋아요 기능
function setupLikes() {
    const likeButtons = document.querySelectorAll('.stat-item');
    
    likeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const icon = button.querySelector('.stat-icon');
            const number = button.querySelector('.stat-number');
            
            if (icon && icon.textContent === '❤️') {
                let count = parseInt(number.textContent);
                count++;
                number.textContent = count;
                button.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    button.style.transform = 'scale(1)';
                }, 200);
            }
        });
    });
}

// 카드 호버 효과 강화
function setupCardEffects() {
    const cards = document.querySelectorAll('.card, .video-card, .recommendation-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });
}

// 네비게이션 활성화
function setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
        });
    });
}

// 스크롤 이벤트로 헤더 스타일 변경
function setupScrollEffects() {
    const header = document.querySelector('.header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
        }
        
        lastScroll = currentScroll;
    });
}

// 이미지 레이지 로딩
function setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// 알림 표시 함수
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#00C875' : '#FF5C5C'};
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// 애니메이션 키프레임 추가
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .fade-in {
        animation: fadeIn 0.6s ease-out;
    }
`;
document.head.appendChild(style);

// 페이드인 효과
function setupFadeIn() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    const elements = document.querySelectorAll('.card, .variety-card, .video-card');
    elements.forEach(el => observer.observe(el));
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', () => {
    console.log('GFGH 플랫폼 초기화 중...');
    
    // 모든 기능 초기화
    drawChart();
    setupTabs();
    setupVideoPlayers();
    setupLikes();
    setupCardEffects();
    setupNavigation();
    setupScrollEffects();
    setupLazyLoading();
    setupFadeIn();
    setupNutritionModal();
    setupRecipeModal();
    setupRecipeModal();
    
    console.log('GFGH 플랫폼 준비 완료!');
    
    // 환영 메시지
    setTimeout(() => {
        showNotification('🌿 GFGH에 오신 것을 환영합니다!', 'success');
    }, 500);
});

// 영양성분 모달 설정
function setupNutritionModal() {
    const modal = document.getElementById('nutritionModal');
    const openBtn = document.getElementById('openNutritionModal');
    const closeBtn = document.getElementById('closeNutritionModal');
    
    if (!modal || !openBtn) return;
    
    // 모달 열기
    openBtn.addEventListener('click', () => {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // 스크롤 방지
    });
    
    // 모달 닫기 - X 버튼
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }
    
    // 모달 닫기 - 배경 클릭
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // ESC 키로 닫기
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

// 레시피 모달 설정
function setupRecipeModal() {
    const modal = document.getElementById('recipeModal');
    const openBtn = document.getElementById('openRecipeModal');
    const closeBtn = document.getElementById('closeRecipeModal');
    
    if (!modal || !openBtn) return;
    
    // 모달 열기
    openBtn.addEventListener('click', () => {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
    
    // 모달 닫기 - X 버튼
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }
    
    // 모달 닫기 - 배경 클릭
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // ESC 키로 닫기
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

// 레시피 모달 설정
function setupRecipeModal() {
    const modal = document.getElementById('recipeModal');
    const openBtn = document.getElementById('openRecipeModal');
    const closeBtn = document.getElementById('closeRecipeModal');
    
    if (!modal || !openBtn) return;
    
    // 모달 열기
    openBtn.addEventListener('click', () => {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
    
    // 모달 닫기 - X 버튼
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }
    
    // 모달 닫기 - 배경 클릭
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // ESC 키로 닫기
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}


// 윈도우 리사이즈 시 차트 다시 그리기
window.addEventListener('resize', () => {
    drawChart();
});

// 구매하기 버튼 이벤트
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-subscribe') || 
        e.target.textContent.includes('구매하기')) {
        e.preventDefault();
        showNotification('🛒 장바구니에 추가되었습니다!', 'success');
    }
});

// 프로필 이미지 클릭 이벤트
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('author-avatar') || 
        e.target.classList.contains('creator-avatar') ||
        e.target.classList.contains('dashboard-avatar')) {
        showNotification('👤 프로필 페이지로 이동합니다', 'success');
    }
});

// 해시태그 클릭 이벤트
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('hashtag')) {
        e.preventDefault();
        const tag = e.target.textContent;
        showNotification(`${tag} 관련 콘텐츠를 검색합니다`, 'success');
    }
});

// 모바일 메뉴 토글 (필요시)
function setupMobileMenu() {
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '☰';
    mobileMenuBtn.style.cssText = `
        display: none;
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 56px;
        height: 56px;
        background: var(--primary-green);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 24px;
        cursor: pointer;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
        z-index: 999;
    `;
    
    if (window.innerWidth <= 768) {
        document.body.appendChild(mobileMenuBtn);
        mobileMenuBtn.style.display = 'block';
    }
    
    mobileMenuBtn.addEventListener('click', () => {
        alert('모바일 메뉴 기능');
    });
}

setupMobileMenu();

window.addEventListener('resize', () => {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    if (mobileMenuBtn) {
        if (window.innerWidth <= 768) {
            mobileMenuBtn.style.display = 'block';
        } else {
            mobileMenuBtn.style.display = 'none';
        }
    }
});

// 콘솔에 개발 정보 표시
console.log(`
%c🌿 GFGH Platform 
%cGood Food, Good Health!
%c농작물 홍보 영상 플랫폼
`, 
'color: #00C875; font-size: 24px; font-weight: bold;',
'color: #666; font-size: 16px;',
'color: #999; font-size: 12px;'
);