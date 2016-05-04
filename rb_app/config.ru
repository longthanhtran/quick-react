require './configure'
require './app'
require 'inifile'

use Rack::Deflater
run App
