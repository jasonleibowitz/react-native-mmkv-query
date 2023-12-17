import { toCamelCase } from "../utils";

describe("Utils", () => {
  describe("toCamelCase", () => {
    it("converts a dict of snake_case keys to camelCase", () => {
      const result = toCamelCase({
        user_id: 1,
        first_name: "jason",
      });
      expect(result).toEqual({
        userId: 1,
        firstName: "jason",
      });
    });

    it("converts nested objects of snake_case keys to camelCase", () => {
      const result = toCamelCase({
        user_id: 1,
        user_hobbies: ["swing_dancing", "pumpkin_patching"],
        user_attributes: {
          user_age: 36,
          user_height: 70,
        },
      });

      expect(result).toEqual({
        userId: 1,
        userHobbies: ["swing_dancing", "pumpkin_patching"],
        userAttributes: {
          userAge: 36,
          userHeight: 70,
        },
      });
    });
  });
});
