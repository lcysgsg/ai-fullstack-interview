// Tests the running baseline API without implementing the interview task.
import assert from 'node:assert/strict'
const base=process.env.API_BASE_URL??'http://127.0.0.1:8080'
async function req(path,method='GET',body){
 const response=await fetch(base+path,{method,headers:body?{'Content-Type':'application/json'}:undefined,body:body?JSON.stringify(body):undefined})
 return {status:response.status,body:await response.json()}
}
let ready=false
for(let i=0;i<90;i++){
 try {const h=await req('/api/health');if(h.status===200&&h.body.status==='UP'){ready=true;break}}catch{}
 await new Promise(r=>setTimeout(r,1000))
}
assert.ok(ready,'backend did not become ready')
const seeded=await req('/api/devices')
assert.equal(seeded.status,200)
assert.equal(seeded.body.length,3)
const created=await req('/api/devices','POST',{code:'DEV-SMOKE-999',name:'集成测试设备'})
assert.equal(created.status,200)
assert.equal(created.body.code,'DEV-SMOKE-999')
assert.equal(created.body.status,'NORMAL')
const duplicate=await req('/api/devices','POST',{code:'DEV-SMOKE-999',name:'重复'})
assert.equal(duplicate.status,400)
assert.equal(duplicate.body.code,'BUSINESS_ERROR')
const invalid=await req('/api/devices','POST',{code:'INVALID',name:'   '})
assert.equal(invalid.status,400)
assert.equal(invalid.body.code,'VALIDATION_ERROR')
const changed=await req('/api/devices/'+created.body.id,'PUT',{code:'DEV-SMOKE-999',name:'设备已更新'})
assert.equal(changed.status,200)
assert.equal(changed.body.name,'设备已更新')
const readBack=await req('/api/devices')
assert.equal(readBack.body.find(d=>d.id===created.body.id)?.name,'设备已更新')
console.log('PASS: health, list, create, validation, duplicate code, edit and persistence over HTTP')
