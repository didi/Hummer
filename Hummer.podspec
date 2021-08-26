#
# Be sure to run `pod lib lint Hummer.podspec' to ensure this is a
# valid spec before submitting.
#
# Any lines starting with a # are optional, but their use is encouraged
# To learn more about a Podspec see https://guides.cocoapods.org/syntax/podspec.html
#

Pod::Spec.new do |s|
  s.name             = 'Hummer'
  s.version          = '0.2.8'
  s.summary          = 'Hummer'
  
  # This description is used to generate tags and improve search results.
  #   * Think: What does it do? Why did you write it? What is the focus?
  #   * Try to keep it short, snappy and to the point.
  #   * Write the description between the DESC delimiters below.
  #   * Finally, don't worry about the indent, CocoaPods strips it!
  
  s.description      = <<-DESC
Hummer is a dynamic solution for client.
                       DESC
  
  s.homepage         = 'https://github.com/didi/Hummer'
  # s.screenshots     = 'www.example.com/screenshots_1', 'www.example.com/screenshots_2'
  s.license          = { :type => 'Apache-2.0', :file => 'LICENSE' }
  s.author           = { 'ChasonTang' => 'tangjiacheng@didiglobal.com' }
  s.source           = { :git => 'https://github.com/didi/Hummer.git', :tag => s.version.to_s }
  s.prepare_command = <<-CMD
    curl -o napi_ios_hermes.tar.gz -L https://github.com/OrangeLab/N-API/releases/download/2.0.3/napi_ios_hermes.tar.gz
    tar zxf napi_ios_hermes.tar.gz
    rm -f napi_ios_hermes.tar.gz
  CMD
  # s.social_media_url = 'https://twitter.com/<TWITTER_USERNAME>'
  
  s.ios.deployment_target = '9.0'
  
  s.default_subspec        = "Core"

  s.subspec "N-API" do |ss|
    ss.pod_target_xcconfig = {
      'HEADER_SEARCH_PATHS' => "$(PODS_TARGET_SRCROOT)/include"
    }
    ss.source_files = 'iOS/Hummer/Classes/Engine/N-API/*.{h,m}'
    ss.private_header_files = 'iOS/Hummer/Classes/Engine/N-API/HMJSExecutor+Private.h', 'iOS/Hummer/Classes/Engine/N-API/HMJS{Weak,Strong}Value.h', 'iOS/Hummer/Classes/Engine/N-API/HMJSValue.h'
  end

  s.subspec "Hermes" do |ss|
    ss.dependency 'Hummer/Core'
    ss.dependency 'Hummer/N-API'
    ss.pod_target_xcconfig = {
      'HEADER_SEARCH_PATHS' => "$(PODS_TARGET_SRCROOT)/iOS",
      'GCC_ENABLE_CPP_EXCEPTIONS' => 'NO',
      'GCC_ENABLE_CPP_RTTI' => 'NO'
    }
    ss.vendored_library = 'libhermes.a'
    ss.library = 'c++'
    ss.framework = 'CoreFoundation'
    ss.source_files = 'iOS/Hermes/*.{h,m,mm}'
    ss.dependency 'SocketRocket', '~> 0.1'
  end

  # s.subspec "JavaScriptCore" do |ss|
  #   ss.dependency 'Hummer/Core'
  #   ss.dependency 'Hummer/N-API'
  #   ss.vendored_library = 'libjsc.a'
  #   ss.framework = "JavaScriptCore"
  # end

  # s.subspec "QuickJS" do |ss|
  #   ss.dependency 'Hummer/Core'
  #   ss.dependency 'Hummer/N-API'
  #   ss.vendored_library = 'libquickjs.a'
  # end

  s.subspec "Core" do |ss|
    ss.source_files = 'iOS/Hummer/Classes/**/*.{h,m,cpp}'
    ss.exclude_files = 'iOS/Hummer/Classes/Engine/N-API/*.{h,m}'
    ss.resource_bundles = {
      'Hummer' => ['iOS/Hummer/Assets/Assets.xcassets']
    }
    ss.framework = 'JavaScriptCore'
    ss.dependency 'Yoga', '~> 1.14'
    ss.dependency 'SocketRocket', '~> 0.1'
  end
  
  # s.public_header_files = 'Pod/Classes/**/*.h'
  # s.frameworks = 'UIKit', 'MapKit'
  # s.dependency 'AFNetworking', '~> 2.3'

  s.pod_target_xcconfig = {
    'DEFINES_MODULE' => 'YES',
    'WARNING_CFLAGS' => [
      '-Werror=undeclared-selector',
      '-Werror=incomplete-implementation'
    ]
  }
  s.libraries = 'c++'
end
