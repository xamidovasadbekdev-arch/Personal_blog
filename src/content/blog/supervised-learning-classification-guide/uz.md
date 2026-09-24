---
title: "Nazorat Qilinadigan O'rganish: Scikit-Learn Bilan Klassifikator Modellari"
excerpt: "Nazorat qilinadigan machine learning algoritmlari, kross-validatsiya, belgilarni masshtablash va modelni baholash bo'yicha amaliy qo'llanma."
---

Nazorat qilinadigan Machine Learning (Supervised Learning) algoritmlari kirish belgilaridan maqsadli belgilarga akslantirishni o'rganadi. Ushbu maqolada **Scikit-Learn** yordamida klassifikatsiya modellarini ko'rib chiqamiz.

---

## 1. Ma'lumotlarni Tayyorlash va Masshtablash

```python
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier

# Belgilar va maqsadli o'zgaruvchini bo'lish
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Masshtablash
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Modelni o'rgatish
model = RandomForestClassifier(n_estimators=100)
model.fit(X_train_scaled, y_train)
print(f"Akkuratlik Darajasi: {model.score(X_test_scaled, y_test):.4f}")
```
