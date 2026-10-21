import assert from 'node:assert/strict'
import { chromium } from 'playwright'
import { mkdir } from 'node:fs/promises'
let backendReady=false
for(let attempt=0;attempt<100;attempt++){
  try {
    const response=await fetch('http://127.0.0.1:8080/api/health')
    if(response.ok && (await response.json()).status==='UP'){backendReady=true;break}
  }catch{}
  await new Promise(resolve=>setTimeout(resolve,1000))
}
assert.ok(backendReady,'Backend did not become healthy before browser test')
const browser=await chromium.launch({headless:true,args:['--no-sandbox']})
try {
 const page=await browser.newPage({viewport:{width:1440,height:900}})
 await page.goto('http://127.0.0.1:5173/',{waitUntil:'networkidle'})
 await page.getByText('API 已连接').waitFor({timeout:20000})
 await page.getByText('设备资产台账',{exact:true}).waitFor()
 assert.equal(await page.locator('.el-table__row').count(),3)
 await page.getByRole('button',{name:'新增设备'}).click()
 const fields=page.locator('.el-dialog:visible input')
 await fields.nth(0).fill('DEV-AUDIT-999')
 await fields.nth(1).fill('浏览器验收设备')
 await page.locator('.el-dialog:visible').getByRole('button',{name:'保存'}).click()
 await page.getByText('DEV-AUDIT-999',{exact:true}).waitFor()
 await page.locator('.el-table__row').filter({hasText:'DEV-AUDIT-999'}).getByRole('button',{name:'编辑'}).click()
 const edits=page.locator('.el-dialog:visible input')
 await edits.nth(1).fill('浏览器验收设备已更新')
 await page.locator('.el-dialog:visible').getByRole('button',{name:'保存'}).click()
 await page.getByText('浏览器验收设备已更新',{exact:true}).waitFor()
 await mkdir('artifacts',{recursive:true})
 await page.screenshot({path:'artifacts/basic-browser.png',fullPage:true})
 console.log('PASS browser: loaded device list, created and edited device with live API')
} finally {await browser.close()}
