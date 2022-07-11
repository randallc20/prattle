class CreateUserPairs < ActiveRecord::Migration[6.1]
  def change
    create_table :user_pairs do |t|
      t.boolean :friend
    end
  end
end
