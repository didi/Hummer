require 'pathname'

class Configure
    @@jsPath = Pathname.new(__FILE__) + '../../Files'
    def self.jsPath
        @@jsPath.to_s
    end
end