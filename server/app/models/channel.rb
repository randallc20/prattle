class Channel < ActiveRecord::Base
  has_many :channel_users
  has_many :users, through: :channel_users
  has_many :sub_channels
  has_many :channel_messages
end
