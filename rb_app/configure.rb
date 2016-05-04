require 'inifile'

INI_FILE = '../social_creds.ini'

module Configure
  def Configure.get_ini filename
    IniFile.load(filename)
  end
end

