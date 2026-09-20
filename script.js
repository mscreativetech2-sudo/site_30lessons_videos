const lessonOrdinals = [
  'الأول', 'الثاني', 'الثالث', 'الرابع', 'الخامس', 'السادس', 'السابع', 'الثامن',
  'التاسع', 'العاشر', 'الحادي عشر', 'الثاني عشر', 'الثالث عشر', 'الرابع عشر',
  'الخامس عشر', 'السادس عشر', 'السابع عشر', 'الثامن عشر', 'التاسع عشر', 'العشرون',
  'الحادي والعشرون', 'الثاني والعشرون', 'الثالث والعشرون', 'الرابع والعشرون',
  'الخامس والعشرون', 'السادس والعشرون', 'السابع والعشرون', 'الثامن والعشرون',
  'التاسع والعشرون', 'الثلاثون', 'الحادي والثلاثون', 'الثاني والثلاثون'
];

const lessonTitles = Array.from({ length: 64 }, (_, index) => {
  const lessonOrdinal = lessonOrdinals[Math.floor(index / 2)];
  const titleType = index % 2 === 0 ? 'قصة' : 'أنشودة';
  return `${titleType} الدرس ${lessonOrdinal}`;
});

// استبدل روابط example.com بروابط الفيديوهات الحقيقية عند إضافتها.
const lessonVideos = [
  'https://github.com/so2020my/----Iqra-platform/releases/download/v1.0.0/alsadaqa.mp4',
  'https://github.com/so2020my/----Iqra-platform/releases/download/v1.0.0/belal.mp4',
  'https://github.com/so2020my/----Iqra-platform/releases/download/v1.0.0/milksaler.mp4',
  ...Array.from({ length: 61 }, (_, index) => `https://example.com/videos/lesson-${String(index + 4).padStart(2, '0')}.mp4`)
];

function getLessonNumber() {
  const number = Number(new URLSearchParams(window.location.search).get('lesson'));
  return Number.isInteger(number) && number >= 1 && number <= lessonTitles.length ? number : 1;
}

function renderLessons() {
  const grid = document.getElementById('lessons-grid');
  if (!grid) return;

  document.getElementById('lesson-count').textContent = lessonTitles.length;
  grid.innerHTML = lessonTitles.map((title, index) => {
    const number = index + 1;
    return `
      <a class="lesson-card" href="video.html?lesson=${number}" aria-label="مشاهدة ${title}">
        <span class="lesson-number">${String(number).padStart(2, '0')}</span>
        <span class="lesson-title">${title}</span>
      </a>
    `;
  }).join('');
}

function renderVideoTitle() {
  const titleElement = document.getElementById('video-title');
  if (!titleElement) return;

  const lessonNumber = getLessonNumber();
  const title = lessonTitles[lessonNumber - 1];
  titleElement.textContent = `${String(lessonNumber).padStart(2, '0')} - ${title}`;
  document.title = `${title} | فيديوهات ثلاثون درسا`;
}

function renderVideoPlayer() {
  const player = document.getElementById('video-player');
  if (!player) return;

  const lessonNumber = getLessonNumber();
  const videoUrl = lessonVideos[lessonNumber - 1];
  const isPlaceholderUrl = videoUrl.startsWith('https://example.com/');

  if (isPlaceholderUrl) {
    player.hidden = true;
    return;
  }

  player.src = videoUrl;
  player.hidden = false;
}

renderLessons();
renderVideoTitle();
renderVideoPlayer();
