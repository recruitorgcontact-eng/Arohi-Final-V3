# Arohi AI Project Guidelines & Locked Configurations

## Locked Gemini Model Aliases
To prevent 404 model deprecation errors, all server-side Gemini API calls MUST use the following supported model aliases in order of fallback preference:
1. `gemini-3.6-flash`
2. `gemini-3.1-flash-lite`
3. `gemini-flash-latest`

> **STRICT RULE**: Do NOT revert or modify these model names to legacy/deprecated models such as `gemini-2.5-flash`, `gemini-2.0-flash`, or `gemini-1.5-flash`.

## Multi-Engine Search & Fallback Architecture
- **Resilient Multi-Engine Search**: `fetchGoogleNewsLive()` in `server.ts` combines Google News RSS streams, DuckDuckGo Instant Answer API, and Wikipedia REST API summaries.
- **Fail-Safe Response Delivery**: When Gemini API quota limits (HTTP 429) or connection timeouts occur, `getArohiFallbackResponse()` synthesizes search findings directly so that Arohi AI **never fails to deliver an answer**.
- Do NOT remove or bypass `getArohiFallbackResponse()` or the multi-engine live search streams.

## System Architecture
- Full-stack Express backend (`server.ts`) running on port 3000.
- React Vite frontend served via Express in production and Vite middleware in development.
