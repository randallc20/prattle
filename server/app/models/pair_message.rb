class PairMessage < ActiveRecord::Base
  belongs_to :user_pair
  belongs_to :user
end
