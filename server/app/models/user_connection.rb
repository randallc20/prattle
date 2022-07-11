class UserConnection < ActiveRecord::Base
  belongs_to :user
  belongs_to :user_pair
end
