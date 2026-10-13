package com.lcysgsg.interview.device;

import jakarta.validation.constraints.NotBlank;

public record DeviceRequest(
        @NotBlank(message = "设备编号不能为空") String code,
        @NotBlank(message = "设备名称不能为空") String name
) {
}
