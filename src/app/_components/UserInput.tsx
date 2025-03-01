interface UserInputProps {
    username: string
    setUsername: (username: string) => void
  }
  
  export default function UserInput({ username, setUsername }: UserInputProps) {
    return (
      <div className="mb-4">
        <label htmlFor="username" className="block mb-2">
          Your Name:
        </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 w-full max-w-xs"
          placeholder="Enter your name"
        />
      </div>
    )
  }
  
  