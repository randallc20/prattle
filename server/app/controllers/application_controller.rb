class ApplicationController < Sinatra::Base
  set :default_content_type, "application/json"

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
