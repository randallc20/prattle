puts "🌱 Seeding..."

user_one = User.create(username: "xpersonx", password: "123", logged_in: false)
user_two =
  User.create(username: "harriet_tubman", password: "123", logged_in: false)
user_three =
  User.create(username: "MaxPain2375", password: "123", logged_in: false)
user_four = User.create(username: "Enora", password: "123", logged_in: false)

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

channel1 = Channel.create(channel_name: "channel 1")
channel2 = Channel.create(channel_name: "channel 2")

channel1_user1 = ChannelUser.create(channel_id: 1, user_id: 1)
channel1_user2 = ChannelUser.create(channel_id: 1, user_id: 2)
channel1_user3 = ChannelUser.create(channel_id: 1, user_id: 3)
channel1_user4 = ChannelUser.create(channel_id: 1, user_id: 4)
channel2_user5 = ChannelUser.create(channel_id: 2, user_id: 4)
channel2_user6 = ChannelUser.create(channel_id: 2, user_id: 2)

channel1_message1 =
  ChannelMessage.create(channel_id: 1, user_id: 1, body: "hello, everyone!")
channel1_message2 = ChannelMessage.create(channel_id: 1, user_id: 3, body: "yo")
channel1_message3 =
  ChannelMessage.create(channel_id: 1, user_id: 4, body: "hiya!")
channel1_message4 =
  ChannelMessage.create(
    channel_id: 1,
    user_id: 1,
    body: "anything interesting?"
  )

channel2_message1 =
  ChannelMessage.create(channel_id: 2, user_id: 4, body: "anyone here?")
channel2_message2 =
  ChannelMessage.create(channel_id: 2, user_id: 2, body: "just me")

puts "✅ Done seeding!"
