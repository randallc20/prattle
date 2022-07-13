class Channel < ActiveRecord::Base
  has_many :channel_users
  has_many :users, through: :channel_users
  has_many :sub_channels
  has_many :channel_messages

  def self.sort_channels
    self.order("channel_name")
  end

  def serialize_channel_messages
    channel_hash = {
      "channel_name" => self.attributes["channel_name"],
      "channel_id" => self.attributes["id"]
    }
    messages_hash =
      self.channel_messages.map do |channel_message|
        username = User.find_by(id: channel_message["user_id"]).username
        {
          "username" => username,
          "user_id" => channel_message.attributes["user_id"],
          "body" => channel_message.attributes["body"],
          "message_id" => channel_message.attributes["id"]
        }
      end
    channel_hash.merge!("messages" => messages_hash)
  end
end
