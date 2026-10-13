<template>
  <main class="page">
    <header class="page-header">
      <div>
        <h1>设备管理</h1>
        <p>AI 全栈开发实操测试基础项目</p>
      </div>
      <el-button type="primary" @click="openCreate">新增设备</el-button>
    </header>

    <el-card shadow="never">
      <el-table v-loading="loading" :data="devices" stripe>
        <el-table-column prop="code" label="设备编号" min-width="160" />
        <el-table-column prop="name" label="设备名称" min-width="240" />
        <el-table-column label="状态" width="120">
          <template #default="{ row }">
            <el-tag :type="row.status === 'NORMAL' ? 'success' : 'info'">
              {{ statusText(row.status) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" min-width="190">
          <template #default="{ row }">{{ formatTime(row.createdAt) }}</template>
        </el-table-column>
        <el-table-column label="操作" width="120" fixed="right">
          <template #default="{ row }">
            <el-button link type="primary" @click="openEdit(row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog v-model="dialogVisible" :title="editingId ? '编辑设备' : '新增设备'" width="460px">
      <el-form label-width="90px" @submit.prevent>
        <el-form-item label="设备编号" required>
          <el-input v-model="form.code" maxlength="50" />
        </el-form-item>
        <el-form-item label="设备名称" required>
          <el-input v-model="form.name" maxlength="100" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" :loading="saving" @click="save">保存</el-button>
      </template>
    </el-dialog>
  </main>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { createDevice, getDevices, updateDevice } from '../api/device'
import type { Device, DeviceForm } from '../types/device'

const devices = ref<Device[]>([])
const loading = ref(false)
const saving = ref(false)
const dialogVisible = ref(false)
const editingId = ref<number | null>(null)
const form = reactive<DeviceForm>({ code: '', name: '' })

async function loadDevices() {
  loading.value = true
  try {
    devices.value = await getDevices()
  } catch (error) {
    ElMessage.error(getErrorMessage(error))
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
    const payload: DeviceForm = { code: form.code.trim(), name: form.name.trim() }
    if (editingId.value) {
      await updateDevice(editingId.value, payload)
      ElMessage.success('编辑成功')
    } else {
      await createDevice(payload)
      ElMessage.success('新增成功')
    }
    dialogVisible.value = false
    await loadDevices()
  } catch (error) {
    ElMessage.error(getErrorMessage(error))
  } finally {
    saving.value = false
  }
}

function statusText(status: string) {
  if (status === 'NORMAL') return '正常'
  return status
}

function formatTime(value: string) {
  return value ? value.replace('T', ' ').slice(0, 19) : '-'
}

function getErrorMessage(error: unknown) {
  const responseMessage = (error as any)?.response?.data?.message
  return responseMessage || '操作失败，请检查服务是否正常运行'
}

onMounted(loadDevices)
</script>

<style scoped>
.page {
  width: min(1180px, calc(100% - 48px));
  margin: 36px auto;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

h1 {
  margin: 0 0 8px;
  font-size: 26px;
}

p {
  margin: 0;
  color: #909399;
}
</style>
