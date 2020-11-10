class Response
    def status(env)
        return 200
    end

    def headers(env)
        return {'Content-Type'=>'application/json'}
    end

    def body(env)
        return ['Hello, Wold!']
    end

    def execute(env)
        return [status(env), headers(env), body(env)]
    end
end