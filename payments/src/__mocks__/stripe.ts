export const stripe = {
    charges: {
      create: jest.fn().mockResolvedValue({}),
    },
  };
  //Whevever we call the create function, we will get a promise 
  //that automatically resolve itself with an empty object.


  