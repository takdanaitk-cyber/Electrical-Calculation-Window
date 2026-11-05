# Electrical Calculator (Windows)

โปรแกรมเดสก์ท็อป Windows ของ Electrical Calculator (Electron) ใช้ไฟล์เว็บชุดเดียวกับเวอร์ชัน Android

## สร้างไฟล์ .exe ผ่าน GitHub
1. อัปโหลดไฟล์ทั้งหมดในโฟลเดอร์นี้ขึ้น repo (ต้องมี `.github/workflows/build-windows.yml`)
2. แท็บ Actions → "Build Windows App" → Run workflow (หรือ commit เข้า main)
3. เมื่อเสร็จ ดาวน์โหลด Artifact `Electrical-Calculator-Windows` จะได้
   - `Electrical-Calculator-Setup-1.0.0.exe` ตัวติดตั้ง
   - `Electrical-Calculator-Portable-1.0.0.exe` แบบพกพา ไม่ต้องติดตั้ง

Windows SmartScreen อาจเตือนเพราะไฟล์ไม่มีลายเซ็นดิจิทัล เลือก "More info" แล้ว "Run anyway"

## ทดลองบนเครื่อง
```
npm install
npm start
```
ข้อมูลโครงการเก็บในโปรแกรมบนเครื่อง ควรกด "บันทึก xlsx" สำรองเป็นไฟล์เป็นระยะ

## อัปเดตหน้าตาโปรแกรม
แทนที่ `www/index.html` ด้วยไฟล์ใหม่ แล้วรัน workflow อีกครั้ง
