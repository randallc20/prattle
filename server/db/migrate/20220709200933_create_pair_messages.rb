class CreatePairMessages < ActiveRecord::Migration[6.1]
  def change
    create_table :pair_messages do |t|
      t.integer :user_id
      t.integer :user_pair_id
      t.text :body
    end
  end
end
