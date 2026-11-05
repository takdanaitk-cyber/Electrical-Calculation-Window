const { app, BrowserWindow, Menu, shell, dialog } = require('electron');
const path = require('path');

if (!app.requestSingleInstanceLock()) { app.quit(); }

let win;
function createWindow() {
  win = new BrowserWindow({
    width: 1360, height: 860, minWidth: 900, minHeight: 600,
    title: 'Electrical Calculator',
    icon: path.join(__dirname, 'build', 'icon.png'),
    backgroundColor: '#ECEEF0',
    show: false,
    webPreferences: { contextIsolation: true, nodeIntegration: false, sandbox: true, spellcheck: false }
  });
  win.once('ready-to-show', () => win.show());
  win.loadFile(path.join(__dirname, 'www', 'index.html'));

  // external links open in the default browser
  win.webContents.setWindowOpenHandler(({ url }) => { if (/^https?:/i.test(url)) shell.openExternal(url); return { action: 'deny' }; });
  win.webContents.on('will-navigate', (e, url) => { if (!url.startsWith('file:')) { e.preventDefault(); if (/^https?:/i.test(url)) shell.openExternal(url); } });

  // files exported by the app (PDF / XLSX / JPG) ask where to save, then offer to open
  win.webContents.session.on('will-download', (e, item) => {
    item.once('done', (_e, state) => {
      if (state !== 'completed') return;
      const p = item.getSavePath();
      if (!p) return;
      dialog.showMessageBox(win, { type: 'info', message: 'บันทึกไฟล์แล้ว', detail: p, buttons: ['เปิดไฟล์', 'เปิดโฟลเดอร์', 'ปิด'], defaultId: 2, cancelId: 2, noLink: true })
        .then(r => { if (r.response === 0) shell.openPath(p); else if (r.response === 1) shell.showItemInFolder(p); });
    });
  });
  win.on('closed', () => { win = null; });
}

function buildMenu() {
  Menu.setApplicationMenu(Menu.buildFromTemplate([
    { label: 'ไฟล์', submenu: [{ role: 'quit', label: 'ออกจากโปรแกรม' }] },
    { label: 'มุมมอง', submenu: [
      { role: 'reload', label: 'โหลดหน้าใหม่' },
      { type: 'separator' },
      { role: 'zoomIn', label: 'ขยาย' }, { role: 'zoomOut', label: 'ย่อ' }, { role: 'resetZoom', label: 'ขนาดปกติ' },
      { type: 'separator' },
      { role: 'togglefullscreen', label: 'เต็มจอ' }
    ] }
  ]));
}

app.on('second-instance', () => { if (win) { if (win.isMinimized()) win.restore(); win.focus(); } });
app.whenReady().then(() => { buildMenu(); createWindow(); });
app.on('window-all-closed', () => app.quit());
