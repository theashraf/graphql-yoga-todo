const userCreated = {
  subscribe: (parent, args, { pubSub }) => {
    return pubSub.asyncIterator("userCreated");
  }
};
const todoCreated = {
  subscribe: (parent, args, { pubSub }) => {
    const userId = args.userId;
    return pubSub.asyncIterator(`todoCreated ${userId}`);
  }
};

export default { Subscription: { todoCreated, userCreated } };
