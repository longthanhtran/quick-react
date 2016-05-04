require 'sinatra'
require 'json'
require 'twitter'
require 'sinatra/reloader' if development?

class App < Sinatra::Base
  include Configure

  def self.run!
    puts "Sinatra start"
    super
  end

  get '/' do
    content_type :json
    config = Configure::get_ini INI_FILE
    ( config['vsource']['app_id'] ).to_json
  end

  get '/tweet' do
    tweets = get_20_tweets

    response.headers['Access-Control-Allow-Origin'] = '*'
    content_type :json
    tweets.to_json
  end

  before do
    puts ">>> Before block"
  end

  after do
    puts "<<< After block"
  end

  def get_20_tweets
    ini_config = Configure::get_ini INI_FILE
    client = Twitter::REST::Client.new do |config|
      config.consumer_key        = ini_config['twitter']['consumer_key']
      config.consumer_secret     = ini_config['twitter']['consumer_secret']
      config.access_token        = ini_config['twitter']['access_token']
      config.access_token_secret = ini_config['twitter']['access_token_secret']
    end

    status = client.user_timeline("TechCrunch") rescue "Something wrong"

    response = []

    status.each do |line|
      response.push(line.full_text)
    end

    response
  end

end
