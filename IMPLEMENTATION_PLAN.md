# Implementation Plan - Hello World MCP Server

**Project:** Slice 2 - Hello World MCP Server  
**Estimated Time:** 2-3 hours  
**Status:** Planning Complete

## Overview
This plan outlines the step-by-step implementation of a minimal MCP server that connects to Claude Desktop and provides a simple `echo` tool.

## Phase 1: Project Setup (30 minutes)

### 1.1 Initialize Node.js Project
- [ ] Create `package.json` with project metadata
- [ ] Set up npm scripts for build, start, and development
- [ ] Configure package type as "module" for ES modules support

### 1.2 Install Dependencies
- [ ] Install `@modelcontextprotocol/sdk` (latest version)
- [ ] Install TypeScript and type definitions (`typescript`, `@types/node`)
- [ ] Install build tooling (`tsx` or `ts-node` for development, or use `tsc`)

### 1.3 Configure TypeScript
- [ ] Create `tsconfig.json` with appropriate compiler options
- [ ] Configure for ES modules (target: ES2020 or later, module: ES2020/ESNext)
- [ ] Set up output directory (`build/` or `dist/`)
- [ ] Enable strict mode and proper module resolution

### 1.4 Create Project Structure
- [ ] Create `src/` directory
- [ ] Create `src/index.ts` as entry point
- [ ] Create `.gitignore` file (exclude `node_modules/`, `build/`, etc.)

## Phase 2: Core Server Implementation (45 minutes)

### 2.1 Set Up MCP Server Foundation
- [ ] Import required MCP SDK modules:
  - `Server` from `@modelcontextprotocol/sdk/server/index.js`
  - `StdioServerTransport` from `@modelcontextprotocol/sdk/server/stdio.js`
  - Request schemas: `ListToolsRequestSchema`, `CallToolRequestSchema`
- [ ] Initialize Server instance with:
  - Name: "hello-world-server"
  - Version: "1.0.0"
  - Capabilities: `{ tools: {} }`

### 2.2 Implement Tool Definition
- [ ] Define `echo` tool schema:
  - Name: "echo"
  - Description: "Returns the input text exactly as provided"
  - Input schema with `message` property (string, required)
- [ ] Create tool list handler for `ListToolsRequestSchema`
- [ ] Return array containing the echo tool definition

### 2.3 Implement Tool Handler
- [ ] Create handler for `CallToolRequestSchema`
- [ ] Extract tool name from request
- [ ] Validate tool name is "echo"
- [ ] Extract `message` parameter from request arguments
- [ ] Return response with:
  - `content` array containing text result
  - `isError: false` for success cases
- [ ] Handle error cases:
  - Unknown tool name → return error response
  - Missing `message` parameter → return error response
  - Log errors to stderr (not stdout)

### 2.4 Set Up Transport and Connection
- [ ] Create `StdioServerTransport` instance
- [ ] Connect server to transport using `await server.connect(transport)`
- [ ] Add error handling for connection failures
- [ ] Ensure server stays alive and waits for requests

## Phase 3: Logging and Error Handling (20 minutes)

### 3.1 Implement Proper Logging
- [ ] Replace all `console.log()` calls with `console.error()` (stderr only)
- [ ] Add startup log message when server initializes
- [ ] Add log message when tool is called (for debugging)
- [ ] Add log message for errors

### 3.2 Error Handling
- [ ] Wrap server initialization in try-catch
- [ ] Handle tool call errors gracefully
- [ ] Return proper error responses in MCP format
- [ ] Ensure errors don't crash the server

## Phase 4: Build Configuration (15 minutes)

### 4.1 Configure Build Scripts
- [ ] Add `build` script to `package.json` (e.g., `tsc`)
- [ ] Add `start` script to run built server (optional, for testing)
- [ ] Ensure build outputs to `build/index.js`

### 4.2 Test Build Process
- [ ] Run `npm install` to verify dependencies
- [ ] Run `npm run build` to verify compilation
- [ ] Verify `build/index.js` exists and is valid JavaScript
- [ ] Check for any TypeScript compilation errors

## Phase 5: Documentation (20 minutes)

### 5.1 Update README.md
- [ ] Add project description
- [ ] Add installation instructions
- [ ] Add build instructions
- [ ] Add Claude Desktop configuration instructions
- [ ] Add usage examples
- [ ] Add troubleshooting section

### 5.2 Code Comments
- [ ] Add JSDoc comments to main functions
- [ ] Add inline comments explaining MCP protocol concepts
- [ ] Document tool schema structure
- [ ] Document error handling approach

## Phase 6: Testing and Validation (30 minutes)

### 6.1 Local Testing
- [ ] Build the server: `npm run build`
- [ ] Verify build output exists at `build/index.js`
- [ ] Test server can start without errors
- [ ] Verify server waits for input (doesn't exit immediately)

### 6.2 Claude Desktop Integration
- [ ] Create/update Claude Desktop config file:
  - Location: `~/Library/Application Support/Claude/claude_desktop_config.json`
  - Add server configuration with absolute path to `build/index.js`
- [ ] Restart Claude Desktop completely (quit and reopen)
- [ ] Verify server appears in Claude Desktop (check logs if available)

### 6.3 Functional Testing
- [ ] Test tool discovery: Ask Claude to list available tools
- [ ] Test echo tool: "Use the echo tool to say hello"
- [ ] Verify correct output is returned
- [ ] Test with different messages
- [ ] Test error handling: Try calling with invalid input
- [ ] Test multiple sequential tool calls

### 6.4 Validation Checklist
- [ ] Server builds without errors
- [ ] Server starts and waits for input via stdio
- [ ] Claude Desktop recognizes the server after restart
- [ ] `echo` tool appears in Claude's tool list
- [ ] Calling echo tool returns the correct output
- [ ] Server handles multiple tool calls
- [ ] Errors are logged appropriately (to stderr)
- [ ] Code is clean and well-commented

## Phase 7: Final Polish (10 minutes)

### 7.1 Code Quality
- [ ] Review code for consistency
- [ ] Ensure proper TypeScript types throughout
- [ ] Remove any debug code or console.log statements
- [ ] Verify all imports use `.js` extensions

### 7.2 Final Verification
- [ ] Run final build
- [ ] Verify all success criteria are met
- [ ] Test one more time with Claude Desktop
- [ ] Document any known issues or limitations

## Technical Considerations

### Key Implementation Details
1. **Module System**: Use ES modules (`.js` extensions in imports)
2. **Transport**: stdio transport for communication with Claude Desktop
3. **Logging**: All logs must go to stderr, stdout is reserved for MCP protocol
4. **Error Handling**: Return proper MCP error responses, don't throw unhandled exceptions
5. **Tool Schema**: Follow JSON Schema specification for tool input validation

### Dependencies
- `@modelcontextprotocol/sdk`: MCP SDK for TypeScript
- `typescript`: TypeScript compiler
- `@types/node`: Node.js type definitions

### File Structure
```
mcp-hello-world-server/
├── .gitignore
├── LICENSE
├── package.json
├── tsconfig.json
├── REQUIREMENTS.md
├── README.md
├── IMPLEMENTATION_PLAN.md (this file)
└── src/
    └── index.ts
```

## Success Criteria
All items from REQUIREMENTS.md must be met:
- [x] Server builds without errors
- [ ] Server starts and waits for input via stdio
- [ ] Claude Desktop recognizes the server after restart
- [ ] `echo` tool appears in Claude's tool list
- [ ] Calling echo tool returns the correct output
- [ ] Server handles multiple tool calls
- [ ] Errors are logged appropriately (to stderr)
- [ ] Code is clean and well-commented

## Next Steps After Completion
1. Sync learnings back to main project documentation in Obsidian
2. Write blog post: "Getting Started with Model Context Protocol (MCP)"
3. Move to Slice 3: File Watcher Plugin

## Notes
- Use absolute paths in Claude Desktop configuration
- Remember to fully quit and restart Claude Desktop after config changes
- All logging must use `console.error()`, never `console.log()`
- Tool names must be alphanumeric with underscores/hyphens only


