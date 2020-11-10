require 'response'
require 'json'
require 'configure'

class AllFiles < Response
    def body(env)
        path = Configure.jsPath
        files = Dir.entries(path).select {
            |f| !File.directory?(f) && !f.start_with?('.')
        }
        return [files.to_json]
    end
end