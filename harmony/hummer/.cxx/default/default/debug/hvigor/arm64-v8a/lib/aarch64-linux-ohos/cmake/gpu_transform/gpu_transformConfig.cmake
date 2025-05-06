if(NOT TARGET gpu_transform::nativeGpu)
    add_library(gpu_transform::nativeGpu SHARED IMPORTED)
    set_target_properties(gpu_transform::nativeGpu PROPERTIES
        IMPORTED_LOCATION "/Users/didi/opensource/orangeLab/Hummer/harmony/oh_modules/.ohpm/@ohos+gpu_transform@1.0.1/oh_modules/@ohos/gpu_transform/libs/arm64-v8a/libnativeGpu.so")
endif()
