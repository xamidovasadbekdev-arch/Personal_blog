---
title: "Nazoratsiz O'rganish: K-Means va Klasterlash Usullari"
excerpt: "Belgilanmagan ma'lumotlar to'plamida K-Means va PCA o'lchamlarini qisqartirish yordamida yashirin tuzilmalarni aniqlashni o'rganing."
---

Nazoratsiz o'rganish (Unsupervised Learning) algoritmlari aniq maqsadli belgilarsiz ma'lumotlarni qayta ishlab, ularning tabiiy guruhlanishlarini va klasterlarini aniqlaydi.

---

## 1. K-Means Klasterlash Misoli

```python
from sklearn.cluster import KMeans
from sklearn.decomposition import PCA

# PCA yordamida o'lchamlarni kamaytirish
pca = PCA(n_components=2)
X_pca = pca.fit_transform(X)

# K-Means Klasterlash
kmeans = KMeans(n_clusters=3, random_state=42)
labels = kmeans.fit_predict(X_pca)
```
