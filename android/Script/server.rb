require 'rack'
require 'all_files'
require 'get_file'
require 'response'

app = proc do |env|
    case env['REQUEST_PATH']
    when '/all_files'
        AllFiles.new.execute(env);
    when /.*\.js$/
        GetFile.new.execute(env);
    else
        Response.new.execute(env);
    end
end

# Process.kill('TERM',Process.pid)
Rack::Handler::WEBrick.run(app, :Port => 9292, :Host => '0.0.0.0')
