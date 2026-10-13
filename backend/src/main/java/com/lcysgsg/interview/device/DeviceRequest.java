package com.lcysgsg.interview.device;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record DeviceRequest(
        @NotBlank(message = "设备编号不能为空")
        @Size(max = 50, message = "设备编号不能超过 50 个字符")
        String code,

        @NotBlank(message = "设备名称不能为空")
        @Size(max = 100, message = "设备名称不能超过 100 个字符")
        String name
) {
}
