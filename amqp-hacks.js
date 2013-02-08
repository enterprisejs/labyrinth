
exports.safeEndConnection = function(connection) {

    // `connection.end` doesn't flush outgoing buffers, run a
    // synchronous command to comprehend

    connection.queue('tmp-EXCLUSIVE-END',{exclusive: true}, function(){
        connection.end();

        // `connection.end` in 0.1.3 raises a ECONNRESET error, silence it:
        connection.once('error', function(e){
            if (e.code !== 'ECONNRESET' || e.syscall !== 'write')
                throw e;
        });
    });

};

