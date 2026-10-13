package com.lcysgsg.interview.device;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class DeviceService {
    public static final String STATUS_NORMAL = "NORMAL";

    private final DeviceMapper deviceMapper;

    public DeviceService(DeviceMapper deviceMapper) {
        this.deviceMapper = deviceMapper;
    }

    public List<Device> list() {
        return deviceMapper.selectList(
                new LambdaQueryWrapper<Device>().orderByDesc(Device::getId)
        );
    }

    public Device create(DeviceRequest request) {
        ensureCodeAvailable(request.code(), null);

        Device device = new Device();
        device.setCode(request.code().trim());
        device.setName(request.name().trim());
        device.setStatus(STATUS_NORMAL);
        device.setCreatedAt(LocalDateTime.now());
        deviceMapper.insert(device);
        return device;
    }

    public Device update(Long id, DeviceRequest request) {
        Device device = requireDevice(id);
        ensureCodeAvailable(request.code(), id);

        device.setCode(request.code().trim());
        device.setName(request.name().trim());
        deviceMapper.updateById(device);
        return device;
    }

    private Device requireDevice(Long id) {
        Device device = deviceMapper.selectById(id);
        if (device == null) {
            throw new IllegalArgumentException("设备不存在");
        }
        return device;
    }

    private void ensureCodeAvailable(String code, Long excludeId) {
        LambdaQueryWrapper<Device> wrapper = new LambdaQueryWrapper<Device>()
                .eq(Device::getCode, code.trim());
        if (excludeId != null) {
            wrapper.ne(Device::getId, excludeId);
        }
        if (deviceMapper.selectCount(wrapper) > 0) {
            throw new IllegalArgumentException("设备编号已存在");
        }
    }
}
