# Proof of Concept: Deno HTTP Server with Router

This project is a proof of concept demonstrating how to create a simple HTTP server using Deno and a custom router. The server is designed to handle basic routing for different endpoints.

## Overview

The main file, `main.ts`, sets up a Deno HTTP server and defines a router with a single route. The route is designed to handle GET requests for book details based on the book ID provided in the URL.

## File Structure

- `main.ts`: The main entry point of the application. It initializes the router and starts the server.
- `router.ts`: Contains the router class and its methods.
- `types.ts`: Defines the types used in the application.

## How to Run

1. Ensure you have Deno installed on your machine. You can download it from [deno.land](https://deno.land/).
2. Clone this repository.
3. Navigate to the project directory.
4. Run the server using the following command:
   ```sh
   deno run --allow-net main.ts
   ```
5. Open your browser and navigate to `http://localhost:3000/books/1` to see the server in action.

## Example

When you navigate to `http://localhost:3000/books/1`, the server will respond with:
