import { spawnSync } from "node:child_process";
import { setTimeout as delay } from "node:timers/promises";

const repository = process.env.GITHUB_REPOSITORY ?? "ksloenglish/ai-showcase";
const branch = process.env.GITHUB_BRANCH ?? "main";
const basePath = process.env.VITE_BASE_PATH ?? "/ai-showcase/";
const siteUrl = (process.env.SITE_URL ?? "https://ksloenglish.github.io/ai-showcase").replace(/\/$/, "");
const commitMessage = process.env.GITHUB_RELEASE_MESSAGE ?? "chore: update public showcase";

if (process.argv.includes("--help")) {
  console.log("Usage: GITHUB_RELEASE_MESSAGE='chore: describe update' pnpm release:github");
  console.log("Runs static checks, commits and pushes public changes, waits for deploy-pages.yml, then verifies the live GitHub Pages site.");
  process.exit(0);
}

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: process.cwd(),
    encoding: "utf8",
    stdio: options.capture ? ["ignore", "pipe", "pipe"] : "inherit",
    env: { ...process.env, ...options.env },
  });
  if (result.error) throw result.error;
  if (result.status !== 0) {
    const detail = options.capture ? `\n${result.stderr}` : "";
    throw new Error(`${command} ${args.join(" ")} failed with exit code ${result.status}.${detail}`);
  }
  return options.capture ? result.stdout.trim() : "";
}

function gitOutput(...args) {
  return run("git", args, { capture: true });
}

async function findCurrentRun(headSha) {
  for (let attempt = 0; attempt < 12; attempt += 1) {
    const output = run("gh", [
      "run", "list", "--repo", repository, "--workflow", "deploy-pages.yml", "--branch", branch,
      "--event", "push", "--limit", "10", "--json", "databaseId,headSha",
    ], { capture: true });
    const workflowRun = JSON.parse(output).find(candidate => candidate.headSha === headSha);
    if (workflowRun) return String(workflowRun.databaseId);
    await delay(3_000);
  }
  throw new Error(`No GitHub Pages workflow run was found for ${headSha}.`);
}

try {
  if (!gitOutput("status", "--porcelain").trim()) {
    console.log("No public GitHub Pages changes to release.");
    process.exit(0);
  }

  run("pnpm", ["test"]);
  run("pnpm", ["check"]);
  run("pnpm", ["verify:assets"]);
  run("pnpm", ["build"], { env: { VITE_BASE_PATH: basePath } });

  run("git", ["add", "-A"]);
  if (!gitOutput("diff", "--cached", "--name-only").trim()) {
    console.log("Only ignored files changed; no public GitHub Pages release is required.");
    process.exit(0);
  }

  run("git", ["diff", "--cached", "--check"]);
  run("git", ["commit", "-m", commitMessage]);
  run("git", ["push", "origin", branch]);

  const headSha = gitOutput("rev-parse", "HEAD");
  const runId = await findCurrentRun(headSha);
  console.log(`Waiting for GitHub Pages deployment ${runId}.`);
  run("gh", ["run", "watch", runId, "--repo", repository, "--exit-status"]);

  run("pnpm", ["verify:browser"], { env: { STATIC_BASE_URL: siteUrl } });
  console.log(`Paired GitHub Pages release verified: ${siteUrl}/`);
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}
