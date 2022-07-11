puts "🌱 Seeding..."

user_one = User.create(username: "xpersonx", logged_in: false)
user_two = User.create(username: "harriet_tubman", logged_in: false)
user_three = User.create(username: "MaxPain2375", logged_in: false)
user_four = User.create(username: "Enora", logged_in: false)

pair_one =
  UserPair.create(friend: false, user1_id: user_one.id, user2_id: user_two.id)
pair_two =
  UserPair.create(friend: false, user1_id: user_one.id, user2_id: user_three.id)

connection_one = UserConnection.create(user: user_one, user_pair: pair_one)
connection_two = UserConnection.create(user: user_two, user_pair: pair_one)
connection_three = UserConnection.create(user: user_one, user_pair: pair_two)
connection_four = UserConnection.create(user: user_three, user_pair: pair_two)

message_one =
  PairMessage.create(
    user: user_one,
    user_pair: pair_one,
    body: "Hey, what's up?"
  )
message_two =
  PairMessage.create(user: user_two, user_pair: pair_one, body: "nm, you?")
message_three =
  PairMessage.create(user: user_one, user_pair: pair_one, body: "nm")
message_four =
  PairMessage.create(user: user_two, user_pair: pair_one, body: "cool")

message_five =
  PairMessage.create(
    user: user_one,
    user_pair: pair_two,
    body: "Hey, what's up?"
  )
message_six =
  PairMessage.create(
    user: user_three,
    user_pair: pair_two,
    body: "who are you?"
  )
message_seven =
  PairMessage.create(user: user_one, user_pair: pair_two, body: "me")
message_eight =
  PairMessage.create(user: user_three, user_pair: pair_two, body: "oh! gotcha.")

puts "✅ Done seeding!"
