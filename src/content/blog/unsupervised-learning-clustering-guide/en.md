---
title: "Unsupervised Learning: K-Means & Hierarchical Clustering Patterns"
excerpt: "Explore how unsupervised algorithms discover hidden structures in unlabelled dataset clusters using K-Means and PCA dimensionality reduction."
date: 2026-07-20
category: ml
subcategory: "Unsupervised Learning"
tags: ["Unsupervised Learning", "Clustering", "K-Means", "PCA"]
---

Unsupervised learning algorithms process data without explicit target labels to discover natural groupings and clusters.

---

## 1. K-Means Clustering Example

```python
from sklearn.cluster import KMeans
from sklearn.decomposition import PCA

# Reduce dimensions with PCA
pca = PCA(n_components=2)
X_pca = pca.fit_transform(X)

# K-Means Clustering
kmeans = KMeans(n_clusters=3, random_state=42)
labels = kmeans.fit_predict(X_pca)
```
