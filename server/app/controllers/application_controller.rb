require "pry"

class ApplicationController < Sinatra::Base
  set :default_content_type, "application/json"

  configure do
    enable :sessions
    set :session_secret, "secret"
  end

  post "/login" do
    user = User.find_by(username: params[:username])
    if user && user.authenticate(params[:password])
      session[:user_id] = user.id
      return { success: true }.to_json
    else
      return { success: false }.to_json
    end
  end

  get "/users" do
    User.all.to_json
  end

  get "/users/:id" do
    user = User.find_by(id: params[:id])
    user.to_json
  end

  get "/users/:id/messages" do
    user = User.find_by(id: params[:id])
    user.pair_messages.to_json
  end

  get "/users/:id/messages/:pair_username" do
    user = User.find_by(id: params[:id])
    pair = User.find_by(username: params[:pair_username])
    user.current_pair_messages(pair).to_json
  end

  get "/" do
    "Hello World"
  end

  #   User.all.to_json(include: {self.friends})
  # end

  # Faye::WebSocket.load_adapter("thin")

  # get "/connection" do
  #   if Faye::WebSocket.websocket?(request.env)
  #     ws = Faye::WebSocket.new(request.env)

  #     ws.on(:open) { |event| puts "On Open" }

  #     ws.on(:message) do |msg|
  #       ws.send(msg.data.reverse) # Reverse and reply
  #     end

  #     ws.on(:close) { |event| puts "On Close" }

  #     ws.rack_response
  #   else
  #   end
  # end

  # get "/" do
  #   { thing: "thing1", thing2: "item" }.to_json
  # end

  # get "/messages" do
  #   Message.all.order(:created_at).to_json
  # end

  # post "/messages" do
  #   Message.create(body: params[:body], username: params[:username]).to_json
  # end

  # patch "/messages/:id" do
  #   message = Message.find(params[:id])
  #   message.update(body: params[:body])
  #   message.to_json
  # end

  # delete "/messages/:id" do
  #   message = Message.find(params[:id])
  #   message.destroy
  #   message.to_json
  # end
end
