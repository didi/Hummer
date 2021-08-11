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
  # s.social_media_url = 'https://twitter.com/<TWITTER_USERNAME>'
  
  s.ios.deployment_target = '9.0'
  
  s.default_subspec        = "Core"

  s.subspec "Hermes" do |ss|
    ss.pod_target_xcconfig = {
      'HEADER_SEARCH_PATHS' => "$(PODS_TARGET_SRCROOT)/iOS/N-API/include $(PODS_TARGET_SRCROOT)/iOS/N-API/third_party/react-native/ReactCommon",
      'GCC_ENABLE_CPP_EXCEPTIONS' => 'NO',
      'GCC_ENABLE_CPP_RTTI' => 'NO'
    }
    ss.vendored_library = 'iOS/N-API/napi/libhermes.a'
    ss.library = 'c++'
    ss.framework = 'CoreFoundation'
    ss.source_files = 'iOS/Hermes/*.{h,m,mm}'
    ss.dependency 'SocketRocket', '~> 0.1'
  end

  s.subspec "Core" do |ss|
    ss.source_files = 'iOS/Hummer/Classes/**/*.{h,m,cpp}'
    ss.private_header_files = 'iOS/Hummer/Classes/Engine/N-API/*+Private.h', 'iOS/Hummer/Classes/Engine/N-API/HMJSWeakValue.h'
    ss.resource_bundles = {
      'Hummer' => ['iOS/Hummer/Assets/Assets.xcassets']
    }
    ss.frameworks = 'JavaScriptCore'
    ss.dependency 'Hummer/Hermes'
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
