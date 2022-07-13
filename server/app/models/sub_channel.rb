class ChannelUser < ActiveRecord::Base
  belongs_to :channel
  has_many :sub_channel_messages
end
