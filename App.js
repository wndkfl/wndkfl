import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = 'http://localhost:5000/api';

function App() {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [uploadData, setUploadData] = useState({
    cropName: '',
    variety: '',
    region: '',
    description: '',
    videoFile: null
  });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await axios.get(`${API_URL}/videos`);
      setVideos(response.data);
    } catch (error) {
      console.error('영상 불러오기 실패:', error);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    
    if (!uploadData.videoFile) {
      alert('영상 파일을 선택해주세요!');
      return;
    }

    const formData = new FormData();
    formData.append('video', uploadData.videoFile);
    formData.append('cropName', uploadData.cropName);
    formData.append('variety', uploadData.variety);
    formData.append('region', uploadData.region);
    formData.append('description', uploadData.description);

    setUploading(true);
    try {
      await axios.post(`${API_URL}/videos/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      alert('영상이 성공적으로 업로드되었습니다! 🎉');
      setShowUploadForm(false);
      setUploadData({
        cropName: '',
        variety: '',
        region: '',
        description: '',
        videoFile: null
      });
      fetchVideos();
    } catch (error) {
      alert('업로드 실패: ' + (error.response?.data?.error || error.message));
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('정말 이 영상을 삭제하시겠습니까?')) return;

    try {
      await axios.delete(`${API_URL}/videos/${id}`);
      alert('영상이 삭제되었습니다.');
      fetchVideos();
      if (selectedVideo?.id === id) {
        setSelectedVideo(null);
      }
    } catch (error) {
      alert('삭제 실패: ' + (error.response?.data?.error || error.message));
    }
  };

  const closeVideoModal = () => {
    setSelectedVideo(null);
  };

  // 인기 작물 (가장 많이 업로드된)
  const cropCounts = videos.reduce((acc, video) => {
    acc[video.cropName] = (acc[video.cropName] || 0) + 1;
    return acc;
  }, {});
  const popularCrops = Object.entries(cropCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <div className="App">
      <header className="header">
        <div className="header-content">
          <h1>🌾 농작물 성장 영상 플랫폼</h1>
          <button 
            className="upload-btn-header"
            onClick={() => setShowUploadForm(true)}
          >
            📹 영상 업로드
          </button>
        </div>
      </header>

      <main className="main-container">
        <div className="content-wrapper">
          <div className="main-content">
            {showUploadForm && (
              <div className="modal-overlay" onClick={() => setShowUploadForm(false)}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                  <button className="modal-close" onClick={() => setShowUploadForm(false)}>✕</button>
                  <h2>📹 새 영상 업로드</h2>
                  <form onSubmit={handleUpload}>
                    <div className="form-group">
                      <label>작물 이름 *</label>
                      <input
                        type="text"
                        placeholder="예: 토마토, 상추, 딸기 등"
                        value={uploadData.cropName}
                        onChange={(e) => setUploadData({...uploadData, cropName: e.target.value})}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>품종</label>
                      <input
                        type="text"
                        placeholder="예: 완숙 토마토, 청상추 등"
                        value={uploadData.variety}
                        onChange={(e) => setUploadData({...uploadData, variety: e.target.value})}
                      />
                    </div>

                    <div className="form-group">
                      <label>재배 지역</label>
                      <input
                        type="text"
                        placeholder="예: 경기도 양평, 전라남도 순천 등"
                        value={uploadData.region}
                        onChange={(e) => setUploadData({...uploadData, region: e.target.value})}
                      />
                    </div>

                    <div className="form-group">
                      <label>설명</label>
                      <textarea
                        placeholder="작물의 특징, 재배 방법 등을 자유롭게 작성해주세요"
                        value={uploadData.description}
                        onChange={(e) => setUploadData({...uploadData, description: e.target.value})}
                        rows="4"
                      />
                    </div>

                    <div className="form-group">
                      <label>영상 파일 *</label>
                      <input
                        type="file"
                        accept="video/*"
                        onChange={(e) => setUploadData({...uploadData, videoFile: e.target.files[0]})}
                        required
                      />
                      {uploadData.videoFile && (
                        <p className="file-info">
                          선택된 파일: {uploadData.videoFile.name} 
                          ({(uploadData.videoFile.size / 1024 / 1024).toFixed(2)} MB)
                        </p>
                      )}
                    </div>

                    <div className="form-actions">
                      <button type="submit" disabled={uploading} className="submit-btn">
                        {uploading ? '업로드 중...' : '업로드'}
                      </button>
                      <button 
                        type="button" 
                        onClick={() => setShowUploadForm(false)}
                        className="cancel-btn"
                      >
                        취소
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {selectedVideo && (
              <div className="modal-overlay" onClick={closeVideoModal}>
                <div className="modal-content video-modal" onClick={(e) => e.stopPropagation()}>
                  <button className="modal-close" onClick={closeVideoModal}>✕</button>
                  
                  <div className="video-player">
                    <video controls autoPlay width="100%">
                      <source src={selectedVideo.videoUrl} type="video/mp4" />
                      브라우저가 비디오를 지원하지 않습니다.
                    </video>
                  </div>

                  <div className="video-info">
                    <h2>{selectedVideo.cropName}</h2>
                    
                    <div className="info-tags">
                      {selectedVideo.variety && (
                        <span className="tag">🌱 {selectedVideo.variety}</span>
                      )}
                      {selectedVideo.region && (
                        <span className="tag">📍 {selectedVideo.region}</span>
                      )}
                      <span className="tag">📅 {new Date(selectedVideo.uploadDate).toLocaleDateString('ko-KR')}</span>
                    </div>

                    {selectedVideo.description && (
                      <div className="description">
                        <h3>📝 설명</h3>
                        <p>{selectedVideo.description}</p>
                      </div>
                    )}

                    <button 
                      className="delete-btn"
                      onClick={() => handleDelete(selectedVideo.id)}
                    >
                      🗑️ 영상 삭제
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="videos-grid">
              {videos.length === 0 ? (
                <div className="empty-state">
                  <h2>📹 아직 업로드된 영상이 없습니다</h2>
                  <p>첫 번째 영상을 업로드해보세요!</p>
                  <button 
                    className="upload-btn-large"
                    onClick={() => setShowUploadForm(true)}
                  >
                    📹 영상 업로드하기
                  </button>
                </div>
              ) : (
                videos.map(video => (
                  <div 
                    key={video.id} 
                    className="video-card"
                    onClick={() => setSelectedVideo(video)}
                  >
                    <div className="video-thumbnail">
                      <video preload="metadata">
                        <source src={`${video.videoUrl}#t=0.5`} type="video/mp4" />
                      </video>
                      <div className="play-overlay">▶</div>
                    </div>
                    <div className="video-card-info">
                      <h3>{video.cropName}</h3>
                      <div className="video-meta">
                        {video.region && <span>📍 {video.region}</span>}
                        {video.variety && <span>🌱 {video.variety}</span>}
                      </div>
                      <p className="video-date">
                        {new Date(video.uploadDate).toLocaleDateString('ko-KR')}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* 오른쪽 사이드바 */}
          <aside className="sidebar">
            {/* 인기 작물 */}
            {popularCrops.length > 0 && (
              <div className="sidebar-card">
                <h3>🔥 인기 작물</h3>
                <div className="popular-crops">
                  {popularCrops.map(([crop, count], index) => (
                    <div key={crop} className="popular-item">
                      <span className="popular-rank">#{index + 1}</span>
                      <span className="popular-name">{crop}</span>
                      <span className="popular-count">{count}개</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 오늘의 추천 메뉴 */}
            <div className="sidebar-card highlight">
              <h3>⭐ 오늘의 추천 메뉴</h3>
              <div className="recommendation">
                <div className="rec-emoji">🍅</div>
                <div className="rec-title">토마토 파스타</div>
                <p className="rec-desc">
                  신선한 토마토로 만드는 건강한 이탈리아 요리
                </p>
                <div className="rec-tips">
                  <div className="tip">🍝 메인: 토마토</div>
                  <div className="tip">⏱️ 조리시간: 30분</div>
                  <div className="tip">👨‍🍳 난이도: 쉬움</div>
                  <div className="tip">🔥 칼로리: 350kcal</div>
                </div>
              </div>
            </div>

            {/* 가을 제철 농산물 */}
            <div className="sidebar-card">
              <h3>🍂 가을 제철 농산물</h3>
              <div className="season-crops">
                <div className="season-item">🥔 고구마</div>
                <div className="season-item">🌰 밤</div>
                <div className="season-item">🍎 사과</div>
                <div className="season-item">🍇 포도</div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

export default App;