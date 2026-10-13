<template>
  <div class="app-shell">
    <header class="topbar">
      <div class="brand">
        <div class="brand-mark">AI</div>
        <div>
          <strong>Engineering Interview Lab</strong>
          <span>Full-stack sandbox</span>
        </div>
      </div>

      <div class="service-status" :class="`is-${apiState}`">
        <span class="status-dot" />
        {{ apiStateText }}
      </div>
    </header>

    <main class="workspace">
      <section class="hero-panel">
        <div>
          <div class="eyebrow">INDUSTRIAL SOFTWARE · INTERVIEW SANDBOX</div>
          <h1>设备资产台账</h1>
          <p>一个刻意缩小的工业软件场景：代码不多，但保留真实的前后端调用、业务规则与数据持久化。</p>
        </div>
        <el-button type="primary" size="large" @click="openCreate">新增设备</el-button>
      </section>

      <section class="metrics-grid">
        <div class="metric-card">
          <span>设备总数</span>
          <strong>{{ devices.length }}</strong>
          <small>当前台账记录</small>
        </div>
        <div class="metric-card">
          <span>正常设备</span>
          <strong>{{ normalCount }}</strong>
          <small>状态为 NORMAL</small>
        </div>
        <div class="metric-card metric-card--meta">
          <span>运行环境</span>
          <strong>H2</strong>
          <small>应用重启后恢复种子数据</small>
        </div>
      </section>

      <el-card class="table-card" shadow="never">
        <template #header>
          <div class="card-header">
            <div>
              <strong>设备列表</strong>
              <span>基础项目已实现查询、新增和编辑</span>
            </div>
            <el-button :loading="loading" @click="loadDevices">刷新</el-button>
          </div>
        </template>

        <el-table
          v-loading="loading"
          :data="devices"
          empty-text="暂无设备数据"
          stripe
        >
          <el-table-column prop="code" label="设备编号" min-width="160" />
          <el-table-column prop="name" label="设备名称" min-width="260" />
          <el-table-column label="状态" width="130">
            <template #default="{ row }">
              <el-tag :type="row.status === 'NORMAL' ? 'success' : 'info'" effect="light">
                {{ statusText(row.status) }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="创建时间" min-width="190">
            <template #default="{ row }">{{ formatTime(row.createdAt) }}</template>
          </el-table-column>
          <el-table-column label="操作" width="140" fixed="right">
            <template #default="{ row }">
              <el-button link type="primary" @click="openEdit(row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>

      <footer class="page-footer">
        <span>Java 17 · Spring Boot 4 · MyBatis-Plus</span>
        <span>Vue 3 · TypeScript · Vite 8</span>
      </footer>
    </main>

    <el-dialog
      v-model="dialogVisible"
      :title="editingId ? '编辑设备' : '新增设备'"
      width="460px"
      destroy-on-close
    >
      <el-form label-position="top" @submit.prevent>
        <el-form-item label="设备编号" required>
          <el-input v-model="form.code" maxlength="50" placeholder="例如 DEV-004" />
        </el-form-item>
        <el-form-item label="设备名称" required>
          <el-input v-model="form.name" maxlength="100" placeholder="请输入设备名称" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" :loading="saving" @click="save">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { createDevice, getDevices, updateDevice } from '../api/device'
import { getApiErrorMessage } from '../api/http'
import { getHealth } from '../api/system'
import type { Device, DeviceForm } from '../types/device'

const devices = ref<Device[]>([])
const loading = ref(false)
const saving = ref(false)
const dialogVisible = ref(false)
const editingId = ref<number | null>(null)
const apiState = ref<'checking' | 'online' | 'offline'>('checking')
const form = reactive<DeviceForm>({ code: '', name: '' })

const normalCount = computed(() => devices.value.filter((item) => item.status === 'NORMAL').length)
const apiStateText = computed(() => {
  if (apiState.value === 'online') return 'API 已连接'
  if (apiState.value === 'offline') return 'API 未连接'
  return '正在检查 API'
})

async function checkApi() {
  apiState.value = 'checking'
  try {
    const health = await getHealth()
    apiState.value = health.status === 'UP' ? 'online' : 'offline'
  } catch {
    apiState.value = 'offline'
  }
}

async function loadDevices() {
  loading.value = true
  try {
    devices.value = await getDevices()
  } catch (error) {
    ElMessage.error(getApiErrorMessage(error, '设备列表加载失败'))
  } finally {
    loading.value = false
  }
}

function openCreate() {
  editingId.value = null
  form.code = ''
  form.name = ''
  dialogVisible.value = true
}

function openEdit(device: Device) {
  editingId.value = device.id
  form.code = device.code
  form.name = device.name
  dialogVisible.value = true
}

async function save() {
  if (!form.code.trim() || !form.name.trim()) {
    ElMessage.warning('请填写设备编号和设备名称')
    return
  }

  saving.value = true
  try {
    const payload: DeviceForm = {
      code: form.code.trim(),
      name: form.name.trim(),
    }

    if (editingId.value !== null) {
      await updateDevice(editingId.value, payload)
      ElMessage.success('设备已更新')
    } else {
      await createDevice(payload)
      ElMessage.success('设备已创建')
    }

    dialogVisible.value = false
    await loadDevices()
  } catch (error) {
    ElMessage.error(getApiErrorMessage(error))
  } finally {
    saving.value = false
  }
}

function statusText(status: string) {
  return status === 'NORMAL' ? '正常' : status
}

function formatTime(value: string) {
  return value ? value.replace('T', ' ').slice(0, 19) : '-'
}

onMounted(async () => {
  await Promise.all([checkApi(), loadDevices()])
})
</script>
