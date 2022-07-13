# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2022_07_12_193611) do

  create_table "channel_messages", force: :cascade do |t|
    t.integer "user_id"
    t.integer "channel_id"
    t.text "body"
  end

  create_table "channel_users", force: :cascade do |t|
    t.integer "user_id"
    t.integer "channel_id"
  end

  create_table "channels", force: :cascade do |t|
    t.string "channel_name"
  end

  create_table "pair_messages", force: :cascade do |t|
    t.integer "user_id"
    t.integer "user_pair_id"
    t.text "body"
  end

  create_table "sub_channel_messages", force: :cascade do |t|
    t.integer "user_id"
    t.integer "sub_channel_id"
    t.text "body"
  end

  create_table "sub_channels", force: :cascade do |t|
    t.string "sub_channel_name"
    t.integer "channel_id"
  end

  create_table "user_connections", force: :cascade do |t|
    t.integer "user_id"
    t.integer "user_pair_id"
  end

  create_table "user_pairs", force: :cascade do |t|
    t.boolean "friend"
    t.integer "user1_id"
    t.integer "user2_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.boolean "logged_in"
    t.string "password_digest"
  end

end
