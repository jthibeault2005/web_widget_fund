#!/usr/bin/python

import cgi

params = cgi.FieldStorage()

print "Content-Type: text/javascript\n"

if not 'callback' in params:
    print "ERROR: you must pass a callback parameter"
else:
    jsonp = "%s ( {'html': '<strong>Hello World!</strong>' } )"
    print jsonp % params['callback'].value
