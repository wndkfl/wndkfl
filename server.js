const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 5000;

// 미들웨어
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// uploads 폴더 생성
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// 영상 저장 설정
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 500 * 1024 * 1024 }, // 500MB 제한
  fileFilter: (req, file, cb) => {
    const allowedTypes = /mp4|avi|mov|wmv|mkv/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error('영상 파일만 업로드 가능합니다!'));
    }
  }
});

// 데이터 저장소 (실제로는 DB 사용)
let videos = [];

// API: 모든 영상 목록 조회
app.get('/api/videos', (req, res) => {
  res.json(videos);
});

// API: 특정 영상 조회
app.get('/api/videos/:id', (req, res) => {
  const video = videos.find(v => v.id === req.params.id);
  if (video) {
    res.json(video);
  } else {
    res.status(404).json({ error: '영상을 찾을 수 없습니다.' });
  }
});

// API: 영상 업로드
app.post('/api/videos/upload', upload.single('video'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: '영상 파일이 없습니다.' });
    }

    const { cropName, variety, region, description } = req.body;

    const newVideo = {
      id: uuidv4(),
      cropName: cropName || '미분류',
      variety: variety || '',
      region: region || '',
      description: description || '',
      filename: req.file.filename,
      originalName: req.file.originalname,
      videoUrl: `http://localhost:${PORT}/uploads/${req.file.filename}`,
      size: req.file.size,
      uploadDate: new Date().toISOString()
    };

    videos.unshift(newVideo); // 최신 영상을 앞에 추가
    res.status(201).json(newVideo);
  } catch (error) {
    res.status(500).json({ error: '업로드 중 오류가 발생했습니다.' });
  }
});

// API: 영상 삭제
app.delete('/api/videos/:id', (req, res) => {
  const videoIndex = videos.findIndex(v => v.id === req.params.id);
  
  if (videoIndex === -1) {
    return res.status(404).json({ error: '영상을 찾을 수 없습니다.' });
  }

  const video = videos[videoIndex];
  const filePath = path.join(__dirname, 'uploads', video.filename);

  // 파일 삭제
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }

  videos.splice(videoIndex, 1);
  res.json({ message: '영상이 삭제되었습니다.' });
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`🚀 서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});