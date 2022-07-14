require "pry"
require "faye/websocket"

class ApplicationController < Sinatra::Base
  set :default_content_type, "application/json"

  ###################### below is my attempt to create user-auth with sessions.
  # configure do
  #   enable :sessions
  #   set :session_secret, "secret"
  # end

  # post "/login" do
  #   user = User.find_by(username: params[:username])
  #   if user && user.authenticate(params[:password])
  #     session[:user_id] = user.id
  #     # binding.pry
  #     return { :success => true, "x-access-token" => session }.to_json
  #   else
  #     return { success: false }.to_json
  #   end
  # end
  #################### below is the login without using sessions/cookies
  post "/login" do
    user = User.find_by(username: params[:username])
    if user && user.authenticate(params[:password])
      return { success: true, user_id: user.id, message: "success" }.to_json
    else
      return { success: false, user_id: 0, message: "please try again" }.to_json
    end
  end

  # post "/logout" do
  #   user = User.find_by(id: params[:id])
  #   user.update(logged_in: false)
  # end

  ###### signup
  post "/signup" do
    user = User.find_by(username: params[:username])
    if user
      return(
        {
          success: false,
          user_id: 0,
          message: "this username is taken"
        }.to_json
      )
    else
      user =
        User.create(
          username: params[:username],
          password: params[:password],
          logged_in: true
        )
      return { success: true, user_id: user.id, message: "success" }.to_json
    end
  end

  ## returns a list of all of the users with the names of their subscribed channels included
  get "/users" do
    User.all.to_json(only: %i[username id], include: :channels)
  end

  ## find users using a search term
  get "/users/search/:username" do
    matches =
      User.all.filter { |user| user["username"].include?(params["username"]) }
    matches
      .map do |match|
        { "user_id" => match["id"], "username" => match["username"] }
      end
      .to_json
  end

  ## find channels using a search term
  get "/channels/search/:channel_name" do
    matches =
      Channel.all.filter do |channel|
        channel["channel_name"].include?(params["channel_name"])
      end
    matches
      .map do |match|
        { "channel_id" => match["id"], "channel_name" => match["channel_name"] }
      end
      .to_json
  end

  ## returns the same user data as /users, but for a single person
  get "/users/:id" do
    user = User.find_by(id: params[:id])
    user.serialize_user.to_json
  end

  ## returns all of the messages sent by this particular user. Not sure how helpful this will be.
  get "/users/:id/messages" do
    user = User.find_by(id: params[:id])
    user.pair_messages.to_json
  end

  ## returns all the messages between the current user (:id) and another user (:username)
  get "/users/:id/messages/:username" do
    user = User.find_by(id: params[:id])
    connection = User.find_by(username: params[:username])
    user.current_pair_messages(connection).to_json
  end

  ## returns a list of all of the channel names
  get "/channels" do
    Channel.all.to_json(include: :channel_messages)
  end

  ## creates a new channel
  post "/channels" do
    channel_exists = Channel.find_by(channel_name: params[:channelName])
    if (!channel_exists)
      new_channel = Channel.create(channel_name: params[:channelName])
      created_by = User.find_by(id: params[:userId])
      ChannelUser.create(user: created_by, channel: new_channel)
      new_channel.to_json
    else
      { error: "channel already exists" }.to_json
    end
  end

  ## join a new channel
  post "/channels/join" do
    channel_exists = Channel.find_by(channel_name: params[:channelName])
    if (channel_exists)
      joined_by = User.find_by(id: params[:userId])
      ChannelUser.create(user: joined_by, channel: channel_exists)
      channel_exists.to_json
    else
      { error: "channel does not exist" }.to_json
    end
  end

  ## returns all the messages for a particular channel
  get "/channels/:channelName/messages" do
    channel = Channel.find_by(channel_name: params[:channelName])
    channel.serialize_channel_messages.to_json
  end

  ## gives a list of available endpoints for this API
  get "/" do
    {
      "base address" => "http://localhost:9292/",
      "possible end points" => %w[
        /login
        /signup
        /users
        /users/:id
        /users/:id/messages
        /users/:id/messages/:username
        /channels
        /channels/:channel_name/messages
      ]
    }.to_json
  end

  wss =
    lambda do |env|
      if Faye::WebSocket.websocket?(env)
        ws = Faye::WebSocket.new(env)

        ws.on :message do |event|
          ws.send(event.data)
        end

        ws.on :close do |event|
          p [:close, event.code, event.reason]
          ws = nil
        end

        # Return async Rack response
        ws.rack_response
      end
    end

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
