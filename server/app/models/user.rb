class User < ActiveRecord::Base
  has_many :user_connections
  has_many :user_pairs, through: :user_connections
  has_many :pair_messages

  # helper methods
  def pairs
    self.user_connections.map { |user_connection| user_connection.user_pair }
  end

  def pair?(user)
    pair =
      self.pairs.find do |pair|
        (pair.user1_id == self.id || pair.user2_id == self.id) &&
          (pair.user1_id == user.id || pair.user2_id == user.id)
      end
    if pair
      return pair
    else
      return false
    end
  end

  def connections
    self
      .pairs
      .map { |pair| pair.users.all.where("user_id != #{self.id}") }
      .flatten
  end

  def connection?(user)
    connection = self.connections.find { |connection| connection.id == user.id }
    if connection
      return connection
    else
      return false
    end
  end

  def friends
    self
      .pairs
      .map do |pair|
        pair.users.all.where("user_id != #{self.id}") if (pair.friend == true)
      end
      .compact
      .flatten
  end

  def friends?(user)
    friend = self.friends.find { |friend| friend.id == user.id }
    if friend
      return true
    else
      return false
    end
  end

  def create_connection(user)
    if (!connection?(user))
      pair =
        UserPair.create(friend: false, user1_id: self.id, user2_id: user.id)
      UserConnection.create(user: self, user_pair: pair)
      UserConnection.create(user: user, user_pair: pair)
    else
      "You already have a connection with this person!"
    end
  end

  # methods meant to be used to communicate with front end
  def become_friends(user)
    create_connection(user) if (!connection?(user))
    if (!friends?(user))
      self.pair?(user).update(friend: true)
    else
      "You are already friends with this person!"
    end
  end

  def send_pair_message(user, message)
    create_connection(user) if (!connection?(user))
    pair = self.pair?(user)
    PairMessage.create(user: self, user_pair: pair, body: message)
  end

  def current_pair_messages(user)
    messages = self.pair?(user).pair_messages
    if messages
      messages
    else
      "You haven't started a conversation with this person yet"
    end
  end
end
