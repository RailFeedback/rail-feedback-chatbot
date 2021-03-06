import Profile from './profile';
import { User, Message } from '../models';

class Receiver {
  async receive(psid,message){
    // Create a profile object to get FB data if needed
    const profile = new Profile(psid);
    // Attempt to get the user from the database
    let user = await User.findOne({ psid }).exec();
    // if the user does not exist get profile information
    if (!user){
      let details = await profile.get();
      user = new User({ psid, ...details });
      await user.save();
    }
    // Now we have an existing user get the most recent message
    let messages = await Message.find({ user }).sort({ date: 1 }).limit(1).exec();
    // If we have processed this message then return with nothing
    if (messages.length && messages[0].mid == message.mid) return;
    // Otherwise we will store the message
    message = new Message({ ...message });
    await message.save();
    // Return the message and state
    console.log(user);
    return { user, message };
  }
}

export default Receiver;
