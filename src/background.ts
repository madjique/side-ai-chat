export {}

chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true })

// Set up header stripping rules for iframe embedding
async function setupRules() {
  await chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: [1],
    addRules: [{
      id: 1,
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
        resourceTypes: [chrome.declarativeNetRequest.ResourceType.SUB_FRAME]
      }
    }]
  })
}

// Run on install and startup
chrome.runtime.onInstalled.addListener(setupRules)
chrome.runtime.onStartup.addListener(setupRules)

// Also run immediately in case of hot reload during dev
setupRules()
