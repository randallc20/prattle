class CreateUserConnections < ActiveRecord::Migration[6.1]
  def change
    create_table :user_connections do |t|
      t.integer :user_id
      t.integer :user_pair_id
    end
  end
end
