class ApplicationController < Sinatra::Base
  set :default_content_type, "application/json"

  Faye::WebSocket.load_adapter("thin")

  get "/connection" do
    if Faye::WebSocket.websocket?(request.env)
      ws = Faye::WebSocket.new(request.env)

      ws.on(:open) { |event| puts "On Open" }

      ws.on(:message) do |msg|
        ws.send(msg.data.reverse) # Reverse and reply
      end

      ws.on(:close) { |event| puts "On Close" }

      ws.rack_response
    else
    end
  end

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
