# Скриншоты результатов

## Как заменить на оригиналы (рекомендуется)

Текущие файлы ~**577×1024 px** — для премиум-вида лучше загрузить **оригиналы с телефона**:

1. Сделайте скриншот статистики на iPhone/Android (без сжатия в Telegram).
2. Переименуйте и положите сюда (имена **без** двойного `.png.PNG`):
   - `case-elite.png` — кейс #01 (самый большой net)
   - `case-pro.png` — кейс #02
   - `case-prime.png` — кейс #03
3. Откройте `lib/results/cases.ts` и обновите `imageWidth` / `imageHeight` под новые размеры файла.

**Рекомендуемый размер:** от **1170 px** по ширине (Retina), формат **PNG**.

## Проверка размера (PowerShell)

```powershell
Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Image]::FromFile("public\results\case-elite.png")
"$($img.Width)x$($img.Height)"
$img.Dispose()
```
