// utils/face.js
// Utilidad para comparar descriptores faciales (embeddings) usando distancia euclidiana

function euclideanDistance(desc1, desc2) {
  if (!desc1 || !desc2 || desc1.length !== desc2.length) return Infinity;
  let sum = 0;
  for (let i = 0; i < desc1.length; i++) {
    sum += (desc1[i] - desc2[i]) ** 2;
  }
  return Math.sqrt(sum);
}

function findBestMatch(descriptor, candidates, threshold = 0.5) {
  let best = { distance: Infinity, doctor: null };
  for (const c of candidates) {
    if (!c.faceDescriptor) continue;
    const dist = euclideanDistance(descriptor, c.faceDescriptor);
    if (dist < best.distance) {
      best = { distance: dist, doctor: c };
    }
  }
  return best.distance < threshold ? best.doctor : null;
}

module.exports = { euclideanDistance, findBestMatch };
