class SubChannelMessage < ActiveRecord::Base
  belongs_to :sub_channel
  belongs_to :user
end
