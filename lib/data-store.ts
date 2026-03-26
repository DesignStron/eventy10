import { promises as fs } from "fs";
import path from "path";

export function getDataDir() {
  return path.join(process.cwd(), "data");
}

async function ensureDirExists(dirPath: string) {
  await fs.mkdir(dirPath, { recursive: true });
}

export async function readJsonFile<T>(relativeFilePath: string, fallback: T): Promise<T> {
  const fullPath = path.join(getDataDir(), relativeFilePath);

  try {
    const raw = await fs.readFile(fullPath, "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export async function writeJsonFile<T>(relativeFilePath: string, data: T): Promise<void> {
  const dir = getDataDir();
  await ensureDirExists(dir);

  const fullPath = path.join(dir, relativeFilePath);
  const payload = JSON.stringify(data, null, 2);
  await fs.writeFile(fullPath, payload, "utf-8");
}

export function nowIso() {
  return new Date().toISOString();
}

export function randomId(prefix: string) {
  return `${prefix}_${Math.random().toString(16).slice(2)}_${Date.now().toString(16)}`;
}
