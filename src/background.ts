export {}

chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true })

// Comprehensive header modification rules for iframe embedding
async function setupRules() {
  await chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: [1, 2, 3],
    addRules: [
      // Rule 1: Remove response headers that block iframe embedding
      {
        id: 1,
        priority: 1,
        action: {
          type: chrome.declarativeNetRequest.RuleActionType.MODIFY_HEADERS,
          responseHeaders: [
            { header: 'X-Frame-Options', operation: chrome.declarativeNetRequest.HeaderOperation.REMOVE },
            { header: 'Content-Security-Policy', operation: chrome.declarativeNetRequest.HeaderOperation.REMOVE },
            { header: 'Content-Security-Policy-Report-Only', operation: chrome.declarativeNetRequest.HeaderOperation.REMOVE },
            { header: 'Cross-Origin-Embedder-Policy', operation: chrome.declarativeNetRequest.HeaderOperation.REMOVE },
            { header: 'Cross-Origin-Opener-Policy', operation: chrome.declarativeNetRequest.HeaderOperation.REMOVE },
            { header: 'Cross-Origin-Resource-Policy', operation: chrome.declarativeNetRequest.HeaderOperation.REMOVE }
          ]
        },
        condition: {
          urlFilter: '*',
          resourceTypes: [chrome.declarativeNetRequest.ResourceType.SUB_FRAME]
        }
      },
      // Rule 2: Spoof Sec-Fetch headers to make iframe requests look like top-level navigation
      {
        id: 2,
        priority: 1,
        action: {
          type: chrome.declarativeNetRequest.RuleActionType.MODIFY_HEADERS,
          requestHeaders: [
            { header: 'Sec-Fetch-Dest', operation: chrome.declarativeNetRequest.HeaderOperation.SET, value: 'document' },
            { header: 'Sec-Fetch-Mode', operation: chrome.declarativeNetRequest.HeaderOperation.SET, value: 'navigate' },
            { header: 'Sec-Fetch-Site', operation: chrome.declarativeNetRequest.HeaderOperation.SET, value: 'none' },
            { header: 'Sec-Fetch-User', operation: chrome.declarativeNetRequest.HeaderOperation.SET, value: '?1' }
          ]
        },
        condition: {
          urlFilter: '*',
          resourceTypes: [chrome.declarativeNetRequest.ResourceType.SUB_FRAME]
        }
      },
      // Rule 3: Also strip these headers from main_frame resources loaded within sub_frames
      {
        id: 3,
        priority: 1,
        action: {
          type: chrome.declarativeNetRequest.RuleActionType.MODIFY_HEADERS,
          responseHeaders: [
            { header: 'X-Frame-Options', operation: chrome.declarativeNetRequest.HeaderOperation.REMOVE },
            { header: 'Content-Security-Policy', operation: chrome.declarativeNetRequest.HeaderOperation.REMOVE }
          ]
        },
        condition: {
          urlFilter: '*',
          resourceTypes: [
            chrome.declarativeNetRequest.ResourceType.MAIN_FRAME,
            chrome.declarativeNetRequest.ResourceType.XMLHTTPREQUEST,
            chrome.declarativeNetRequest.ResourceType.SCRIPT
          ]
        }
      }
    ]
  })
}

// Run on install and startup
chrome.runtime.onInstalled.addListener(setupRules)
chrome.runtime.onStartup.addListener(setupRules)

// Also run immediately in case of hot reload during dev
setupRules()
