#!/usr/bin/env node

/**
 * Hello World MCP Server
 * 
 * A minimal MCP server that implements a simple echo tool.
 * This server connects to Claude Desktop via stdio transport.
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  type CallToolRequest,
  type ListToolsRequest,
} from '@modelcontextprotocol/sdk/types.js';

/**
 * Echo tool definition
 * Returns the input text exactly as provided
 */
const ECHO_TOOL = {
  name: 'echo',
  description: 'Returns the input text exactly as provided',
  inputSchema: {
    type: 'object',
    properties: {
      message: {
        type: 'string',
        description: 'Text to echo back',
      },
    },
    required: ['message'],
  },
} as const;

/**
 * Initialize the MCP server
 */
const server = new Server(
  {
    name: 'hello-world-server',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

/**
 * Handle list tools request
 * Returns the available tools (just echo in this case)
 */
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [ECHO_TOOL],
  };
});

/**
 * Handle tool call requests
 * Processes the echo tool call and returns the message
 */
server.setRequestHandler(CallToolRequestSchema, async (request: CallToolRequest) => {
  const { name, arguments: args } = request.params;

  // Validate tool name
  if (name !== 'echo') {
    return {
      content: [
        {
          type: 'text',
          text: `Unknown tool: ${name}. Available tools: echo`,
        },
      ],
      isError: true,
    };
  }

  // Validate arguments
  if (!args || typeof args !== 'object') {
    return {
      content: [
        {
          type: 'text',
          text: 'Invalid arguments: expected an object with a "message" property',
        },
      ],
      isError: true,
    };
  }

  // Extract and validate message parameter
  const message = args.message;
  if (typeof message !== 'string') {
    return {
      content: [
        {
          type: 'text',
          text: 'Invalid argument: "message" must be a string',
        },
      ],
      isError: true,
    };
  }

  // Log the tool call (to stderr, not stdout)
  console.error(`[hello-world-server] Echo tool called with message: "${message}"`);

  // Return the echoed message
  return {
    content: [
      {
        type: 'text',
        text: message,
      },
    ],
    isError: false,
  };
});

/**
 * Start the server
 * Connects to stdio transport and waits for requests
 */
async function main() {
  const transport = new StdioServerTransport();
  
  try {
    await server.connect(transport);
    console.error('[hello-world-server] Server started and waiting for requests...');
  } catch (error) {
    console.error('[hello-world-server] Failed to start server:', error);
    process.exit(1);
  }
}

// Start the server
main().catch((error) => {
  console.error('[hello-world-server] Fatal error:', error);
  process.exit(1);
});


