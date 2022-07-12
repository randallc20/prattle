class CreateSubChannels < ActiveRecord::Migration[6.1]
  def change
    create_table :sub_channels do |t|
      t.string :sub_channel_name
      t.integer :channel_id
    end
  end
end
