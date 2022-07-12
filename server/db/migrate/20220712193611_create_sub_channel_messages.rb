class CreateSubChannelMessages < ActiveRecord::Migration[6.1]
  def change
    create_table :sub_channel_messages do |t|
      t.integer :user_id
      t.integer :sub_channel_id
      t.text :body
    end
  end
end
