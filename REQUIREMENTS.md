# Slice 2 - Hello World MCP Server

**Status:** In Progress
**Estimated Time:** 2-3 hours

## Overview
Create a minimal MCP server that connects to Claude Desktop and responds to tool calls. This slice establishes understanding of the Model Context Protocol and validates the Claude Desktop integration workflow using Cursor and AI-assisted development.

## Goals
- Learn MCP protocol basics and architecture
- Understand stdio transport mechanism
- Validate Claude Desktop configuration workflow
- Create a public learning resource for MCP development

## Requirements

### Functionality
- Implements one simple tool: `echo` - returns the input text as output
- Successfully connects to Claude Desktop via stdio transport
- Responds correctly to tool invocation from Claude
- Handles errors gracefully
- Logs appropriately (to stderr, not stdout)

### Technical Stack
- TypeScript/Node.js
- @modelcontextprotocol/sdk
- stdio transport (standard input/output)

### Project Structure
```
mcp-hello-world-server/
├── .gitignore
├── LICENSE
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── REQUIREMENTS.md        # This file
├── README.md              # Documentation
└── src/
    └── index.ts           # MCP server entry point
```

### Key Implementation

**Tool Definition**
```typescript
{
  name: "echo",
  description: "Returns the input text exactly as provided",
  inputSchema: {
    type: "object",
    properties: {
      message: {
        type: "string",
        description: "Text to echo back"
      }
    },
    required: ["message"]
  }
}
```

**Server Structure**
```typescript
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

const server = new Server({
  name: "hello-world-server",
  version: "1.0.0"
}, {
  capabilities: {
    tools: {}
  }
});

// Register tool handlers
server.setRequestHandler(ListToolsRequestSchema, async () => { /* ... */ });
server.setRequestHandler(CallToolRequestSchema, async (request) => { /* ... */ });

// Start server with stdio transport
const transport = new StdioServerTransport();
await server.connect(transport);
```

### Success Criteria
- [ ] Server builds without errors
- [ ] Server starts and waits for input via stdio
- [ ] Claude Desktop recognizes the server after restart
- [ ] `echo` tool appears in Claude's tool list
- [ ] Calling echo tool returns the correct output
- [ ] Server handles multiple tool calls
- [ ] Errors are logged appropriately (to stderr)
- [ ] Code is clean and well-commented

## Development Workflow

### Building
```bash
npm install
npm run build
```

### Claude Desktop Configuration

**Config File Location:**
macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`

**Configuration:**
```json
{
  "mcpServers": {
    "hello-world": {
      "command": "node",
      "args": ["/Users/jamesreed/Documents/GitHub/mcp-hello-world-server/build/index.js"]
    }
  }
}
```

**Important:** Use absolute path to the built `index.js` file.

### Testing Steps
1. Build the server: `npm run build`
2. Update Claude Desktop config with server path (use absolute path)
3. Restart Claude Desktop completely (Quit and reopen)
4. Open Claude Desktop and verify server connects (check logs if available)
5. Type: "Use the echo tool to say hello"
6. Verify Claude calls the echo tool and returns the message
7. Test with different messages
8. Test error handling by passing invalid input

## Common Issues & Solutions

### Server doesn't appear in Claude
- **Solution:** Restart Claude Desktop after config changes (full quit and reopen)
- **Solution:** Check absolute path in config is correct
- **Solution:** Verify build output exists at specified path: `ls -la build/index.js`

### stdio errors
- **Solution:** Ensure console.log only goes to stderr, not stdout
- **Solution:** Use `console.error()` for logging, not `console.log()`
- **Solution:** stdout is reserved for MCP protocol messages

### Tools don't appear
- **Solution:** Tool names must be alphanumeric + underscore/hyphen only
- **Solution:** Verify tool schema is valid JSON Schema
- **Solution:** Check server logs for schema validation errors

### Build errors
- **Solution:** Ensure TypeScript compiles: `npm run build`
- **Solution:** Check for import path issues (use `.js` extensions in imports)
- **Solution:** Verify all dependencies are installed

## Reference Resources
- [MCP Specification](https://modelcontextprotocol.io/)
- [MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)
- [Example MCP Servers](https://github.com/modelcontextprotocol/servers)
- [Claude Desktop MCP Documentation](https://docs.anthropic.com/claude/docs/model-context-protocol)

## Next Steps
After completing this slice:
- Sync learnings back to main project documentation in Obsidian
- Write blog post: "Getting Started with Model Context Protocol (MCP)"
- Move to Slice 3: File Watcher Plugin
