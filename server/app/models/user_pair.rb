class UserPair < ActiveRecord::Base
  has_many :pair_messages
  has_many :user_connections
  has_many :users, through: :user_connections
end
