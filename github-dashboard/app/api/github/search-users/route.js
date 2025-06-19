// app/api/github/search-users/route.js

import { NextResponse } from "next/server";

export async function GET(request) {
  // Extract the 'q' (query) parameter from the request URL
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q");

  // Basic validation: Ensure a query parameter is provided
  if (!q) {
    return NextResponse.json(
      { message: "Query parameter 'q' is required." },
      { status: 400 }
    );
  }

  try {
    // Construct the URL for GitHub's Search Users API
    // We're searching for users ('type:user') and limiting results to 7
    const githubApiUrl = `https://api.github.com/search/users?q=${q}+type:user&per_page=7`;

    // Make the request to the GitHub API
    const githubResponse = await fetch(githubApiUrl, {
      headers: {
        // --- IMPORTANT: GitHub API Headers ---
        // 'Accept' header is recommended by GitHub API documentation
        Accept: "application/vnd.github.v3+json",
        //
        // If you have a GitHub Personal Access Token (PAT) for higher rate limits,
        // use it here. Store it securely in an environment variable (e.g., process.env.GITHUB_PAT).
        // DO NOT hardcode your PAT directly in this file!
        // Example:
        // 'Authorization': `Bearer ${process.env.GITHUB_PAT}`,
      },
      // You might also add revalidate options if using Next.js caching
      // next: { revalidate: 60 } // Revalidate every 60 seconds
    });

    // Check if the GitHub API response was successful
    if (!githubResponse.ok) {
      const errorData = await githubResponse.json();
      console.error("GitHub API Error for search-users:", errorData);
      return NextResponse.json(
        {
          message: "Failed to fetch GitHub users from search.",
          details: errorData,
        },
        { status: githubResponse.status }
      );
    }

    // Parse the JSON response from GitHub
    const data = await githubResponse.json();

    // Return the data received from GitHub directly to the frontend
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    // Catch any unexpected errors during the fetch operation
    console.error("Server error during GitHub user search:", error);
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }
}
