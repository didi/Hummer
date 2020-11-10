
Pod::Spec.new do |s|
  s.name             = 'Hummer'
  s.version          = '0.2.0'
  s.summary          = 'Hummer'

  s.description      = <<-DESC
                        Hummer is a dynamic solution
                        for client. 
                       DESC

  s.homepage         = 'https://github.com/didi/hummer'
  s.license          = { :type => 'MIT', :file => 'LICENSE' }
  s.author           = { 'Hummer' => 'hummer@didiglobal.com' }
  s.source           = { :git => 'git@github.com:didi/hummer.git', :tag => s.version.to_s }

  # 为了支持 xcassets data set
  s.ios.deployment_target = '9.0'
  s.pod_target_xcconfig = {
    'DEFINES_MODULE' => 'YES'
  }

  # s.public_header_files = 'Pod/Classes/**/*.h'
  # s.frameworks = 'UIKit', 'MapKit'

  s.dependency 'SocketRocket'

  s.default_subspec        = "Core"

  s.subspec "Core" do |ss|
    ss.source_files = 'Hummer/Classes/**/*.{h,m,mm,cpp}'
    ss.exclude_files = 'Hummer/Classes/Engine/Hermes/*.{h,mm,m}', 'Hummer/Classes/Interceptor/HMSDWebImageInterceptor.{h,m}'
    ss.resource_bundles = {
      'Hummer' => ['Hummer/Assets/*.{xcassets}']
    }
    ss.frameworks = 'JavaScriptCore'
  end
  
  # 主要用于访问 RN 版本 Yoga private/public 头文件
  s.subspec "YogaKit" do |ss|
    ss.dependency 'YogaKit'
    ss.dependency 'Yoga'
  end

  s.subspec "Hermes" do |ss|
    ss.dependency 'Hummer/Core'
    ss.dependency 'React-jsinspector', '~> 0.5.1'
    ss.dependency 'React-jsi', '~> 0.5.1'
    ss.dependency 'hermes', '~> 0.5.1'
    ss.dependency 'llvm', '~> 0.5.1'
    ss.dependency 'llvm-c', '~> 0.5.1'

    ss.source_files = 'Hummer/Classes/Engine/Hermes/*.{h,mm,m}'

    ss.private_header_files = 'Hummer/Classes/Engine/Hermes/{HMHermesValue,HMHermesStrongValue,HMHermesWeakValue,HMHermesExecutor+Private,MessageQueueThread,RCTDefines,RCTInspector,RCTInspectorPackagerConnection,RCTMessageThread}.h'
  end
  
  s.subspec "SDWebImageInterceptor" do |ss|
    ss.dependency 'Hummer/Core'
    ss.dependency 'SDWebImage', '~> 5.0'

    ss.source_files = 'Hummer/Classes/Interceptor/HMSDWebImageInterceptor.{h,m}'
  end
end
