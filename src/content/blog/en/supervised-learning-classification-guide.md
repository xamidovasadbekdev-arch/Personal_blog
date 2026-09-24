---
title: "Supervised Learning: Building Classifier Models with Scikit-Learn"
excerpt: A practical guide to supervised machine learning algorithms,
  cross-validation, feature scaling, and model evaluation metrics.
date: 2026-08-02
category: ml
subcategory: Supervised Learning
tags:
  - Machine Learning
  - Supervised Learning
  - Python
  - Scikit-Learn
---

Supervised Machine Learning algorithms learn mappings from input features to target labels. In this article, we explore classification models using **Scikit-Learn**.

---

## 1. Data Preparation & Feature Scaling

```python
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier

# Split features and target
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Feature Scaling
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Train Classifier
model = RandomForestClassifier(n_estimators=100)
model.fit(X_train_scaled, y_train)
print(f"Accuracy Score: {model.score(X_test_scaled, y_test):.4f}")
```
