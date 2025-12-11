# mcp-hello-world-server

A minimal Model Context Protocol (MCP) server that implements a simple `echo` tool. This server connects to Claude Desktop via stdio transport and demonstrates the basic MCP server implementation pattern.

## Overview

This is a "Hello World" example of an MCP server that:
- Implements one simple tool: `echo` - returns the input text as output
- Connects to Claude Desktop via stdio transport
- Handles tool calls and errors gracefully
- Logs appropriately (to stderr, not stdout)

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Claude Desktop application

## Installation

1. Clone or download this repository
2. Install dependencies:
   ```bash
   npm install
   ```

## Building

Build the TypeScript source to JavaScript:
```bash
npm run build
```

The compiled output will be in the `build/` directory.

## Configuration

### Claude Desktop Configuration

To use this server with Claude Desktop, you need to add it to your Claude Desktop configuration file.

**Config File Location:**
- macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`
- Linux: `~/.config/Claude/claude_desktop_config.json`

**Configuration:**
```json
{
  "mcpServers": {
    "hello-world": {
      "command": "node",
      "args": ["/absolute/path/to/mcp-hello-world-server/build/index.js"]
    }
  }
}
```

**Important:** 
- Use an absolute path to the built `index.js` file
- Replace `/absolute/path/to/mcp-hello-world-server` with your actual path
- After making changes, fully quit and restart Claude Desktop (don't just close the window)

## Usage

1. Build the server: `npm run build`
2. Update Claude Desktop config with the server path (use absolute path)
3. Restart Claude Desktop completely (Quit and reopen)
4. Open Claude Desktop and verify the server connects
5. Ask Claude to use the echo tool:
   - "Use the echo tool to say hello"
   - "Call the echo tool with the message 'Hello, MCP!'"

The echo tool will return whatever message you provide to it.

## Tool: echo

The server provides a single tool:

- **Name:** `echo`
- **Description:** Returns the input text exactly as provided
- **Parameters:**
  - `message` (string, required): Text to echo back

## Development

### Project Structure
```
mcp-hello-world-server/
├── .gitignore
├── LICENSE
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── REQUIREMENTS.md        # Detailed requirements
├── README.md              # This file
└── src/
    └── index.ts           # MCP server entry point
```

### Scripts

- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Run the built server (for testing)

### Code Structure

The server implementation:
- Uses `@modelcontextprotocol/sdk` for MCP protocol support
- Implements `ListToolsRequestSchema` handler to expose available tools
- Implements `CallToolRequestSchema` handler to process tool calls
- Uses `StdioServerTransport` for communication with Claude Desktop
- All logging goes to stderr (stdout is reserved for MCP protocol messages)

## Troubleshooting

### Server doesn't appear in Claude Desktop
- **Solution:** Restart Claude Desktop after config changes (full quit and reopen)
- **Solution:** Check absolute path in config is correct
- **Solution:** Verify build output exists: `ls -la build/index.js`

### stdio errors
- **Solution:** Ensure all logging uses `console.error()`, not `console.log()`
- **Solution:** stdout is reserved for MCP protocol messages only

### Tools don't appear
- **Solution:** Tool names must be alphanumeric + underscore/hyphen only
- **Solution:** Verify tool schema is valid JSON Schema
- **Solution:** Check server logs for schema validation errors

### Build errors
- **Solution:** Ensure TypeScript compiles: `npm run build`
- **Solution:** Check for import path issues (use `.js` extensions in imports)
- **Solution:** Verify all dependencies are installed: `npm install`

## Resources

- [MCP Specification](https://modelcontextprotocol.io/)
- [MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)
- [Example MCP Servers](https://github.com/modelcontextprotocol/servers)
- [Claude Desktop MCP Documentation](https://docs.anthropic.com/claude/docs/model-context-protocol)

## License

MIT
