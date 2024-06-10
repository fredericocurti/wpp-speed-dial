chrome.contextMenus.create({
  id: 'speed-dial-whatsapp',
  title: 'Speed dial WhatsApp',
  contexts: ['selection'],
})

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'speed-dial-whatsapp') {
    chrome.sidePanel.open({ windowId: tab.windowId });
    chrome.storage.sync.set({
      phone: info.selectionText
    })
  }
})