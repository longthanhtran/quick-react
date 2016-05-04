require './configure'
require './check_tt1'
require 'inifile'

use Rack::Deflater
run App
