# Yarışma Arenası — Ortak soru havuzu V1

Hedef: 10.000 **özgün, açıklamalı, kalite kontrolünden geçmiş** soru. Bu ilk aşamada yalnızca **20 taslak soru** vardır; 10.000 soru hazır değildir.

- `questions.json`: şema, soru, dört şık, doğru cevap indeksi, açıklama, zorluk (1/2/3), kategori, inceleme durumu.
- `engine.js`: şema doğrulama, tekrar etmeyen seçim, şık karıştırma, Milyoner zorluk dağılımı, görülen soru kaydı.
- `status: draft` sorular henüz editör onayından geçmediği için `approvedOnly: true` ile oyuncuya sunulmaz.
- Soru havuzu mevcut oyunlara henüz bağlanmadı. Önce test ve içerik doğrulaması yapılmalı.
- Ortak bankayı oyunlara bağlarken oyunun kendi tur sayısı, kategori ve zorluk kuralları kullanılmalı.
- Zamanla değişebilen sorular tarih ve kaynak ile ayrı doğrulanmalı; telifli yarışma soruları kopyalanmamalı.

Örnek kullanım:
```js
import {validateBank,selectQuestions} from './engine.js';
const bank=await fetch('./questions.json').then(r=>r.json());
console.log(validateBank(bank));
const preview=selectQuestions(bank,{count:5,approvedOnly:false});
```
