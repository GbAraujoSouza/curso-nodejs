import { sum } from "./sum"

describe("File Jest - Test", () => {
  test("test", () => {
    expect(sum()).toBe(2)
  })
})