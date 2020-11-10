require 'response'
require 'configure'

class GetFile < Response
    def body(env)
        path = Configure.jsPath + env['REQUEST_PATH']
        puts 'hello' + path
        if File.exists?(path)
            return [File.read(path)]
        end
        return []
    end
    def headers(env)
        return {'Content-Type'=>'application/x-javascript'}
    end
end