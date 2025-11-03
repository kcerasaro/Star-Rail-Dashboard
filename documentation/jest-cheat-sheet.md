# Mocking Functions
| Function                   | Use When...                        | Example |
|----------------------------|------------------------------------|---------|
| `jest.fn()`                | Create a mock function             | `const mockSave = jest.fn()` |
| `mockReturnValue(value)`   | Function returns a plain value     | `mockRepo.create.mockReturnValue(entity)` |
| `mockResolvedValue(value)` | Function returns a Promise         | `mockRepo.save.mockResolvedValue(savedEntity)` |
| `mockRejectedValue(error)` | Function throws a rejected Promise | `mockRepo.save.mockRejectedValue(new Error('fail'))` |
| `mockImplementation(fn)`   | Full control over behavior         | `mockRepo.save.mockImplementation(() => throw new Error())` |

# Assertion Functions
| Matcher                      | Use When...                       | Example |
|------------------------------|-----------------------------------|---------|
| `toHaveBeenCalled()`         | Check if a function was called    | `expect(mockSave).toHaveBeenCalled()` |
| `toHaveBeenCalledWith(args)` | Check what it was called with     | `expect(mockSave).toHaveBeenCalledWith(entity)` |
| `toEqual(value)`             | Deep equality                     | `expect(result).toEqual(expected)` |
| `toBe(value)`                | Primitive/reference equality      | `expect(flag).toBe(true)` |
| `rejects.toThrow()`          | Async function throws             | `await expect(service.save()).rejects.toThrow()` |
| `toMatchObject(obj)`         | Partial match on object structure | `expect(result).toMatchObject({ name: 'User' })` |

# Unit Test Flow
1. Define input parameters
2. Define expected out
3. Mock dependencies
4. Call the function
5. Assert that mocks were called correctly
6. Assert the final result
