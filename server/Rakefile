require_relative "./config/environment"
require "sinatra/activerecord/rake"
require "faye/websocket"
require "eventmachine"
require "rack"
require "thin"

########################################################################################## Normal server
desc "Start the server"
task :server do
  if ActiveRecord::Base.connection.migration_context.needs_migration?
    puts "Migrations are pending. Make sure to run `rake db:migrate` first."
    return
  end

  # rackup -p PORT will run on the port specified (9292 by default)
  ENV["PORT"] ||= "9292"
  # thin = "thin start -R config.ru -p #{ENV["PORT"]}"
  rackup = "rackup -p #{ENV["PORT"]}"

  # rerun allows auto-reloading of server when files are updated
  # -b runs in the background (include it or binding.pry won't work)
  exec "bundle exec rerun -b '#{rackup}'"
end

######################################################################################## websocket server
desc "Start the WebSocket server"
task :wsserver do
  if ActiveRecord::Base.connection.migration_context.needs_migration?
    puts "Migrations are pending. Make sure to run `rake db:migrate` first."
    return
  end

  Faye::WebSocket.load_adapter("thin")

  # rackup -p PORT will run on the port specified (9292 by default)
  ENV["PORT"] ||= "3001"
  thin = "thin start -R config.ru -p #{ENV["PORT"]}"

  # rerun allows auto-reloading of server when files are updated
  # -b runs in the background (include it or binding.pry won't work)
  exec "bundle exec rerun -b '#{thin}'"
end

########################################################################################## Starting the console
desc "Start the console"
task :console do
  # ActiveRecord::Base.logger = Logger.new(STDOUT)
  Pry.start
end
