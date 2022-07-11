class RemovePasswordsAddPasswordDigestToUsers < ActiveRecord::Migration[6.1]
  def change
    # BCrypt requires the password column to be refered to as "password_digest". HOWEVER! this column is refered to as just "password" everywhere else.
    remove_column :users, :password
    add_column :users, :password_digest, :string
  end
end
