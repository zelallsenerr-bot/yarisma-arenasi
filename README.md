# Yarışma Atölyesi — güncel oyun sitesi

Yayımlanan güncel dosyalar **site104/** klasöründedir. Kökteki eski oyun dosyaları korunmuş arşiv niteliğindedir; GitHub Pages bunları yayımlamaz.

Bu kopya, ChatGPT Sites'ta yayımlanan **104. sürümün** 3.097 dosyasını birebir içerir. Kaynak commit: `49173fd96553bc231b76efc15e128d0be35c3364`. 76 oyun, son oyuncu seçenekleri, Milyoner Aile'nin 100 yeni videosu ve 300 yeni sorusu dahil edilmiştir.

GitHub Pages, `.github/workflows/publish104.yml` üzerinden yalnızca `site104/` klasörünü yayımlar. `migration104/snapshot.json` dosya bütünlüğü kaydıdır; `verify_snapshot.py` yayın öncesinde tüm dosyaları doğrular. Yayında ChatGPT Sites'tan dosya çekilmez; bütün dosyalar bu depoda bulunur.

Güncellemede oyun dosyalarıyla birlikte snapshot kaydı da yenilenmelidir. Natro alan adı bağlantısı, GitHub Pages'in Custom domain ayarı ve alan adının DNS kayıtları üzerinden yapılır; Natro hosting paketi gerekmez.
