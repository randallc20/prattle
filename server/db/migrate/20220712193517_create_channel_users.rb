class CreateChannelUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :channel_users do |t|
      t.integer :user_id
      t.integer :channel_id
    end
  end
end
