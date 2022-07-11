class AddUser1AndUser2ToUserPairs < ActiveRecord::Migration[6.1]
  def change
    add_column :user_pairs, :user1_id, :integer
    add_column :user_pairs, :user2_id, :integer
  end
end
