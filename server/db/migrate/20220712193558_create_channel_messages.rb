class CreateChannelMessages < ActiveRecord::Migration[6.1]
  def change
    create_table :channel_messages do |t|
      t.integer :user_id
      t.integer :channel_id
      t.text :body
    end
  end
end
